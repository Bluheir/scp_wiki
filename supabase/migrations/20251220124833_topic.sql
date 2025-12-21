begin;

create table public.topic(
	id uuid primary key default uuidv7(),

	parent_id uuid,

	creator_id uuid,
	foreign key (creator_id) references public.profile (id)
);
alter table public.topic enable row level security;

create table public.parent_topic(
	id uuid primary key,
	foreign key (id) references public.topic (id) on delete cascade
);
alter table public.parent_topic enable row level security;

alter table public.topic add constraint
	topic_parent_id_fkey foreign key (parent_id) references public.parent_topic (id) on delete cascade;

create table public.topic_info(
	id uuid not null,
	foreign key (id) references public.topic (id) on delete cascade,
	locale_code varchar(8) not null,
	primary key (id, locale_code),

	topic_name varchar(64) not null,
	topic_description varchar(128) not null
);
alter table public.topic_info enable row level security;

create table public.immediate_parent_topic(
	id uuid primary key,
	foreign key (id) references public.topic (id) on delete cascade
);
alter table public.immediate_parent_topic enable row level security;

create or replace view public.single_action
with(security_invoker = true)
as
select
	id,
	role_id,
	action_type,
	action_data,
	try_uuid(action_data#>>'{victim,id}') as victim_id,
	action_data#>>'{victim,type}' as victim_type
from public.permission_action
;

create or replace function can_view_topic(topic_id UUID, parent_topic_id UUID)
returns boolean
language sql
security definer
set search_path = ''
set row_security = off
stable
as $$
	select not exists (
		with recursive ancestor as (
			select
				topic_id as id,
				parent_topic_id as parent_id

			union all

			select topic.id, topic.parent_id
			from public.topic join ancestor on topic.parent_id = ancestor.id
		)
		select 1
		from
			ancestor
			left join public.user_single_action on
				user_single_action.victim_type = 'topic'
				and user_single_action.victim_id = ancestor.id
				and user_single_action.action_type = 'view_topic'
				and user_single_action.profile_id is not distinct from auth.uid()
		where
			user_single_action.id is null
	)
end;
$$;

create or replace function can_create_topic(parent_topic_id UUID)
returns boolean
language sql
security definer
set search_path = ''
set row_security = off
stable
as $$
	select not exists (
		with recursive ancestor as (
			select
				parent_topic_id as id,
				topic.parent_id
			from
				(select parent_topic_id as id) d left join public.topic on d.id = topic.id

			union all

			select topic.id, topic.parent_id
			from public.topic join ancestor on topic.parent_id = ancestor.id
		)
		select 1
		from
			ancestor
			left join public.user_single_action on
				user_single_action.victim_type = 'topic'
				and user_single_action.victim_id is not distinct from ancestor.id
				and user_single_action.action_type = 'create_topic'
				and user_single_action.profile_id is not distinct from auth.uid()
		where
			user_single_action.id is null
	)
end;
$$;

create or replace function can_edit_topic(parent_topic_id UUID)
returns boolean
language sql
security definer
set search_path = ''
set row_security = off
stable
as $$
	select not exists (
		with recursive ancestor as (
			select
				topic.id,
				topic.parent_id
			from
				public.topic
			where
				topic.id = parent_topic_id

			union all

			select topic.id, topic.parent_id
			from public.topic join ancestor on topic.parent_id = ancestor.id
		)
		select 1
		from
			ancestor
			left join public.user_single_action on
				user_single_action.victim_type = 'topic'
				and user_single_action.victim_id = ancestor.id
				and user_single_action.action_type = 'edit_topic'
				and user_single_action.profile_id is not distinct from auth.uid()
		where
			user_single_action.id is null
	)
end;
$$;

create type public.topic_type as enum (
	'parent',
	'immediate_parent'
);

create or replace function public.create_topic_inner(
	t_type public.topic_type,
	t_parent_topic_id uuid,
	t_locale_code varchar(8),
	t_name text,
	t_description text
)
returns table (id uuid, parent_id uuid, creator_id uuid)
language plpgsql
security definer
set search_path = ''
set row_security = off
volatile
as $$
declare
	new_topic_id uuid;
begin
	insert into public.topic (parent_id, creator_id)
		values (t_parent_topic_id, auth.uid())
		returning topic.id into new_topic_id;

	if t_type = 'parent' then
		insert into public.parent_topic (id) values (new_topic_id);
	else
		insert into public.immediate_parent_topic (id) values (new_topic_id);
	end if;

	insert into public.topic_info (id, locale_code, topic_name, topic_description)
		values (new_topic_id, t_locale_code, t_name, t_description);

	return query
		select
			new_topic_id as id,
			t_parent_topic_id as parent_id,
			auth.uid() as creator_id
	;
end;
$$;

revoke all on function public.create_topic_inner(
	public.topic_type, uuid, varchar(8), text, text
) from authenticated, anon;

create or replace function public.create_topic(
	t_type public.topic_type,
	t_parent_topic_id uuid,
	t_locale_code varchar(8),
	t_name text,
	t_description text
)
returns table (id uuid, parent_id uuid, creator_id uuid)
language plpgsql
security definer
set search_path = ''
volatile
as $$
declare
	new_topic_id uuid;
begin
	if not public.can_create_topic(t_parent_topic_id) then
		raise exception 'permission denied to write under parent topic %', t_parent_topic_id
		using errcode = '42501';
	end if;

	return query
	select *
	from public.create_topic_inner(
		t_type,
		t_parent_topic_id,
		t_locale_code,
		t_name,
		t_description
	);
end;
$$;

grant execute on function public.create_topic(public.topic_type, uuid, varchar(8), text, text) to authenticated, anon;

create policy "anon or auth can view topics they have permission to view"
on public.topic
for select to authenticated, anon
using (
	can_view_topic(id, parent_id)
);

create policy "anon or auth can view info for topics they can view"
on public.topic_info
for select to authenticated, anon
using (id in (select id from topic));

create policy "anon or auth can view IP topics they can view"
on public.immediate_parent_topic
for select to authenticated, anon
using (id in (select id from topic));

create policy "anon or auth can view P topics they can view"
on public.parent_topic
for select to authenticated, anon
using (id in (select id from topic));

alter publication supabase_realtime
add table public.topic;

alter publication supabase_realtime
add table public.topic_info;

alter publication supabase_realtime
add table public.parent_topic;

alter publication supabase_realtime
add table public.immediate_parent_topic;

commit;