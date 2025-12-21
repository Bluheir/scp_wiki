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

commit;