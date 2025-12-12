begin;

create extension if not exists pg_uuidv7;

alter table public.urole_custom
add column is_default bool not null default false;

alter table public.utag
add column is_default bool not null default false;

create table public.default_simple_permission(permission_name varchar(32) primary key);
alter table public.default_simple_permission enable row level security;

create table public.default_permission_action(
	id uuid primary key,
	action_type varchar(32) not null,
	action_data JSONB not null
);
alter table public.default_permission_action enable row level security;

create or replace function public.handle_new_uer()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
	insert into public.profile (id, username)
	values (new.id, new.raw_user_meta_data ->> 'username');
	insert into public.urole_profile (urole_id, profile_id)
	select
			urole_custom.id,
			new.id
	from
			public.urole_custom
	where
			urole_custom.is_default;

	with new_urole as (
		insert into public.urole (id) select uuid_generate_v7() returning *
	),
	new_urole_user as (
		insert into public.user_urole (id, profile_id)
		select
			new_urole.id,
			new.id
		from
			new_urole
	),
	inserted_utag_assignments as (
		insert into public.utag_urole (urole_id, utag_id)
		select
			new_urole.id,
			utag.id
		from
			new_urole, public.utag
		where
			utag.is_default
	),
	inserted_simple_permissions as (
		insert into public.urole_permission (id, permission_name)
		select
			new_urole.id,
			permission_name
		from
			new_urole, public.default_simple_permission
	)
	insert into public.permission_action (id, role_id, action_type, action_data)
	select
		uuid_generate_v7(),
		new_urole.id,
		default_permission_action.action_type,
		default_permission_action.action_data
	from
		public.default_permission_action, new_urole
	;

	return new;
end;
$$;

commit;
