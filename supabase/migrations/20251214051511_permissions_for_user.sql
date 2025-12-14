begin;

drop view if exists public.single_action;
create or replace view public.single_action
with(security_invoker = true)
as select pa.*
from (
		select
			id,
			role_id,
			action_type,
			action_data,
			try_uuid(action_data#>>'{victim,id}') as victim_id,
			action_data#>>'{victim,type}' as victim_type
		from public.permission_action
	) pa
	left join public.utag utag1 on pa.victim_id = utag1.id
	left join public.urole urole1 on pa.victim_id = urole1.id
where
	pa.victim_type = 'self'
	or (
		pa.victim_type = 'tag'
		and utag1.id is not null
	)
	or (
		pa.victim_type = 'role'
		and urole1.id is not null
	)
;

-- shows all the roles that a profile has
create or replace view public.profiles_for_urole
with(security_invoker = true)
as select
	profile.id as profile_id,
	roles.role_id as role_id,
	roles.role_name,
	roles.is_hidden
from
	(select id from profile union all select null) profile
	join lateral roles_for_uid(profile.id) roles on true
;

-- shows all the utags that a profile has
create or replace view public.profiles_for_utag
with(security_invoker = true)
as select
	utag_urole.utag_id,
	profiles_for_urole.profile_id
from
	public.utag_urole
	join public.profiles_for_urole on utag_urole.urole_id = profiles_for_urole.role_id
group by
	utag_id, profile_id
;

-- all the actions that a user can do to another user victim
create or replace view public.user_single_action
with(security_invoker = true)
as select distinct on (profiles_for_urole.profile_id, victim_profile_id, single_action.id)
	profiles_for_urole.profile_id as profile_id,
	(
		case
			when single_action.victim_type = 'self' then profiles_for_urole.profile_id
			when for_role.role_id is null then for_tag.profile_id
			else for_role.profile_id
		end
	) as victim_profile_id,
	single_action.action_type,
	single_action.action_data,
	single_action.id as id
from
	profiles_for_urole
	join public.single_action on single_action.role_id = profiles_for_urole.role_id
	left join public.profiles_for_urole for_role on single_action.victim_type = 'role' and single_action.victim_id = for_role.role_id
	left join public.profiles_for_utag for_tag on single_action.victim_type = 'tag' and single_action.victim_id = for_tag.utag_id
where
	for_role.role_id is not null or for_tag.utag_id is not null or single_action.victim_type = 'self'
;

drop policy "users can update their own profile" on public.profile;

create policy "user can update profile if they have permission" on public.profile
for update to anon, authenticated using (
	id in (
		select
			victim_profile_id
		from
			public.user_single_action
		where
			profile_id is not distinct from (select auth.uid()) and
			action_type = 'edit_profile'
	)
) with check (true);

revoke update (id, avatar_url, forum_rating, wiki_rating, created_at) on table public.profile from anon, authenticated;

commit;