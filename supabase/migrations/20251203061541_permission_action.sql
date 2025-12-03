begin;
alter table urole drop constraint urole_id_fkey;
alter table utag drop constraint utag_id_fkey;
drop table public.urole_or_utag;

create table public.permission_action(
	id uuid primary key,
	foreign key (id) references public.urole (id),
	action_type varchar(32) not null,
	action_data JSONB not null
);
alter table public.permission_action enable row level security;

create or replace view public.single_action as
select pa.*
from (
		select id,
			action_type,
			action_data#>>'{victim,id}' as victim_id,
			action_data#>>'{victim,type}' as victim_type
		from public.permission_action
	) pa
	left join public.utag utag1 on pa.victim_id = utag1.id
	left join public.urole urole1 on pa.victim_id = urole1.id
where (
		pa.victim_type = 'tag'
		and utag1.id is not null
	)
	or (
		pa.victim_type = 'role'
		and urole1.id is not null
	);

-- a view returning all the simple permissions for a user
create or replace view public.user_simple_permission as
select profile.id,
	perm.permission_name
from (
		select id
		from public.profile
		union all
		select null
	) profile
	join lateral (
		select *
		from public.roles_for_uid(profile.id)
	) role on true
	join public.urole_permission perm on perm.id = role.role_id
group by profile.id, perm.permission_name;
commit;