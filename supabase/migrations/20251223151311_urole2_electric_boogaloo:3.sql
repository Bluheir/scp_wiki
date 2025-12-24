begin;

-- first, we create the permission schema
create schema permission;

-- schema access
grant usage on schema permission to anon, authenticated, service_role;

-- =========================
-- service_role: full control
-- =========================
grant all privileges on all tables in schema permission to service_role;
grant all privileges on all routines in schema permission to service_role;
grant all privileges on all sequences in schema permission to service_role;

-- =========================
-- anon + authenticated: read-only
-- =========================
grant select on all tables in schema permission to anon, authenticated;
grant execute on all routines in schema permission to anon, authenticated;
grant usage on all sequences in schema permission to anon, authenticated;

-- =========================
-- default privileges
-- =========================
alter default privileges for role postgres in schema permission
grant all privileges on tables to service_role;

alter default privileges for role postgres in schema permission
grant all privileges on routines to service_role;

alter default privileges for role postgres in schema permission
grant all privileges on sequences to service_role;

alter default privileges for role postgres in schema permission
grant select on tables to anon, authenticated;

alter default privileges for role postgres in schema permission
grant execute on routines to anon, authenticated;

alter default privileges for role postgres in schema permission
grant usage on sequences to anon, authenticated;

create type permission.permission_info_inner as (
	action_type varchar(32),
	action_data JSONB,
	victim_id uuid,
	victim_type text
);
create domain permission.permission_info as permission.permission_info_inner
check (
	(value).action_type is not null and
	(value).action_data is not null and
	jsonb_typeof((value).action_data) = 'object' and
	(value).victim_type in ('self', 'topic', 'user', 'role', 'tag')
);

create table permission.urole(
	id uuid primary key default public.uuidv7(),

	creator_id uuid,
	foreign key (creator_id) references public.profile (id),

	role_name varchar(32) not null unique,
	is_hidden boolean not null default false,
	is_default boolean not null default false
);
alter publication supabase_realtime add table permission.urole;

-- an associative entity representing an assignment of a role to a user
create table permission.urole_assignment(
	urole_id uuid not null,
	foreign key (urole_id) references permission.urole (id) on delete cascade,
	profile_id uuid not null,
	foreign key (profile_id) references public.profile (id) on delete cascade,
	primary key (urole_id, profile_id)
);
alter publication supabase_realtime add table permission.urole_assignment;

create table permission.utag(
	id uuid primary key default public.uuidv7(),

	creator_id uuid,
	foreign key (creator_id) references public.profile (id),

	tag_name varchar(32) not null unique,
	is_hidden boolean not null default false,
	is_default boolean not null default false
);
alter publication supabase_realtime add table permission.utag;

create table permission.utag_assignment(
	utag_id uuid not null,
	foreign key (utag_id) references permission.utag (id) on delete cascade,

	entity_id uuid,
	entity_type text not null,
	check (entity_type in ('role', 'user', 'topic')),

	primary key (utag_id, entity_id, entity_type)
);
alter publication supabase_realtime add table permission.utag_assignment;

-- a default permission represents a permission assigned directly to a user on signup
create table permission.default_action(
	id uuid primary key default public.uuidv7(),
	info permission.permission_info not null
);
alter publication supabase_realtime add table permission.default_action;

-- a urole permission represents an action that a role can do; a capability of a role :3
create table permission.urole_action(
	id uuid primary key default public.uuidv7(),
	urole_id uuid not null,
	foreign key (urole_id) references permission.urole (id) on delete cascade,

	info permission.permission_info not null
);
create index urole_action_victim_idx on permission.urole_action (((info).victim_id), ((info).victim_type));
alter publication supabase_realtime add table permission.urole_action;

-- a user_action represents an action that a user can do. this is similar to urole_action, but only for specific, individual users
create table permission.user_action(
	id uuid primary key default public.uuidv7(),
	profile_id uuid not null,
	foreign key (profile_id) references public.profile (id) on delete cascade,

	info permission.permission_info not null
);
create index user_action_victim_idx on permission.user_action (((info).victim_id), ((info).victim_type));
alter publication supabase_realtime add table permission.user_action;

create function permission.roles_for_user(u_profile_id uuid)
returns table (id uuid, creator_id uuid, role_name text, is_hidden boolean, is_default boolean)
language sql
security definer
set search_path = ''
set row_security = off
as $$
select
	urole.id,
	urole.creator_id,
	urole.role_name,
	urole.is_hidden,
	urole.is_default
from
	permission.urole
	left join permission.urole_assignment on
		urole_assignment.profile_id = u_profile_id
		and urole_assignment.urole_id = urole.id
where
	urole_assignment.profile_id is not null
	or urole.role_name = 'everyone'
	or (urole.role_name = 'user' and u_profile_id is not null)
$$;

-- all the actions that a user can do to another victim including actions granted by their roles
create or replace view permission.user_action_full
with(security_invoker = false)
as
with user_id as (
	select id from public.profile
	union all
	select null::uuid
)
select
	user_id.id as user_id,
	'role' as grant_type,
	urole_action.id as action_id,
	urole_action.info as action_info
from
	user_id
	join lateral permission.roles_for_user(user_id.id) user_role on true
	join permission.urole_action on urole_action.urole_id = user_role.id

union all

select
	profile.id as user_id,
	'user' as grant_type,
	user_action.id as action_id,
	user_action.info
from
	public.profile
	join permission.user_action on user_action.profile_id = profile.id
;

create or replace view permission.user_for_urole
with (security_invoker = false)
as
select
	profile.id as user_id,
	profile.username as user_username,
	profile.created_at as user_created_at,
	user_role.id as id,
	user_role.is_hidden,
	user_role.is_default
from
	public.profile
	join lateral permission.roles_for_user(profile.id) user_role on true
;

create or replace view permission.user_for_utag
with (security_invoker = false)
as
select
	profile.id as user_id,
	profile.username as user_username,
	profile.created_at as user_created_at,
	utag_assignment.utag_id as id,
	utag.creator_id,
	utag.tag_name,
	utag.is_default,
	utag.is_hidden
from
	public.profile
	join permission.utag_assignment on
		utag_assignment.entity_type = 'user'
		and profile.id = utag_assignment.entity_id
	join permission.utag on utag.id = utag_assignment.utag_id
;

create or replace view permission.topic_for_utag
with (security_invoker = false)
as
select
	topic.id as topic_id,
	topic.parent_id as topic_parent_id,
	topic.creator_id as topic_creator_id,
	utag_assignment.utag_id as id,
	utag.creator_id,
	utag.tag_name,
	utag.is_default,
	utag.is_hidden
from
	public.topic
	join permission.utag_assignment on
		utag_assignment.entity_type = 'topic'
		and topic.id = utag_assignment.entity_id
	join permission.utag on utag.id = utag_assignment.utag_id
;

create or replace view permission.user_user_action
with (security_invoker = false)
as
select distinct
	adata.user_id,
	(action_info).action_type,
	(action_info).action_data,
	victim_user.id as victim_user_id
from
	permission.user_action_full adata
	left join permission.user_for_utag on
		(action_info).victim_type = 'tag'
		and (action_info).victim_id = user_for_utag.id
	left join permission.user_for_urole on
		(action_info).victim_type = 'role'
		and (action_info).victim_id = user_for_urole.id
	left join public.profile on
		(action_info).victim_type = 'user'
		and (action_info).victim_id = profile.id
	cross join lateral (
		select case
			when (action_info).victim_type = 'tag' then user_for_utag.user_id
			when (action_info).victim_type = 'role' then user_for_urole.user_id
			when (action_info).victim_type = 'user' then profile.id
			when (action_info).victim_type = 'self' then adata.user_id
		end as id
	) victim_user
where
	victim_user.id is not null
;

create or replace view permission.user_topic_action
with (security_invoker = false)
as
select distinct
	adata.user_id,
	(action_info).action_type,
	(action_info).action_data,
	victim_topic.id as victim_topic_id
from
	permission.user_action_full adata
	left join permission.topic_for_utag on
		(action_info).victim_type = 'tag'
		and (action_info).victim_id = topic_for_utag.topic_id
	left join public.topic on
		(action_info).victim_type = 'topic'
		and (action_info).victim_id = topic.id
	cross join lateral (
		select case
			when (action_info).victim_type = 'tag' then topic_for_utag.topic_id
			when (action_info).victim_type = 'topic' then topic.id
		end as id
	) victim_topic
where
	victim_topic.id is not null
;

-- drop the old permission-related stuff :3
drop policy "anon or auth can view topics they have permission to view" on public.topic;
drop policy "user can update profile if they have permission" on public.profile;
drop function if exists public.create_topic(t_type topic_type, t_parent_topic_id uuid, t_locale_code varchar, t_name text, t_description text);
drop function if exists public.create_topic_inner(t_type topic_type, t_parent_topic_id uuid, t_locale_code varchar, t_name text, t_description text);
drop function if exists public.can_view_topic(topic_id uuid, parent_topic_id uuid);
drop function if exists public.can_edit_topic(parent_topic_id uuid);
drop function if exists public.can_create_topic(parent_topic_id uuid);
drop trigger if exists on_auth_user_created on auth.users cascade;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.roles_for_uid(uid uuid) cascade;
drop view if exists public.user_victim_single_action cascade;
drop view if exists public.user_single_action cascade;
drop view if exists public.profiles_for_utag cascade;
drop view if exists public.profiles_for_urole cascade;
drop view if exists public.single_action cascade;
drop table if exists public.utag cascade;
drop table if exists public.urole_profile cascade;
drop table if exists public.utag_urole cascade;
drop table if exists public.urole cascade;
drop table if exists public.urole_custom cascade;
drop table if exists public.default_simple_permission cascade;
drop table if exists public.urole_permission cascade;
drop table if exists public.user_urole cascade;
drop table if exists public.default_permission_action cascade;
drop table if exists public.permission_action cascade;

-- =========================
-- replacing old policies and functions with the new ones
-- =========================
create policy "anon or auth can view topics with permission" on public.topic
for select to anon, authenticated using (
	topic.id in (
		select
			victim_topic_id
		from
			permission.user_topic_action
		where
			user_topic_action.action_type = 'view_topic'
			and user_topic_action.user_id is not distinct from auth.uid()
	)
);

create policy "anon or auth can update profile with permission" on public.profile
for update to anon, authenticated using (
	profile.id in (
		select
			victim_user_id
		from
			permission.user_user_action
		where
			user_user_action.action_type = 'edit_profile'
			and user_user_action.user_id is not distinct from auth.uid()
	)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
	insert into public.profile (id, username)
	values (new.id, new.raw_user_meta_data ->> 'username');

	insert into permission.user_action(profile_id, info)
	select new.id, info from permission.default_action;

	insert into permission.urole_assignment(urole_id, profile_id)
	select urole.id, new.id from permission.urole where urole.is_default;

	insert into permission.utag_assignment(utag_id, entity_id, entity_type)
	select utag.id, new.id, 'user' from permission.utag where utag.is_default;
end;
$$;

create or replace trigger on_auth_user_created
	after insert on auth.users
	for each row execute procedure public.handle_new_user();

commit;
