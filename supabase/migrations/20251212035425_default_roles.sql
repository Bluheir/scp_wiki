begin;

create or replace function public.uuidv7()
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
	unix_ts_ms bigint;
	rand_bytes bytea;
	b bytea;
begin
	unix_ts_ms := floor(
		extract(
			epoch
			from clock_timestamp()
		) * 1000
	);

	rand_bytes := gen_random_bytes(12);
	b := repeat(E'\\000', 16)::bytea;

	for i in 0..5 loop
		b := set_byte(b, i, (unix_ts_ms >> ((5 - i) * 8)) & 255);
	end loop;

	b := set_byte(
		b,
		6,
		(7 << 4) | ((get_byte(rand_bytes, 0) & 0x0F))
	);

	b := set_byte(b, 7, (0x80 | (get_byte(rand_bytes, 1) & 0x3F)));

	for i in 2..9 loop
		b := set_byte(b, 6 + i, get_byte(rand_bytes, i));
	end loop;
	return encode(b, 'hex')::uuid;
end;
$$;

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
		insert into public.urole (id) select public.uuidv7() returning *
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
		public.uuidv7(),
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
