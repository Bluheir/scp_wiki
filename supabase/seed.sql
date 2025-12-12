begin;
with roles(id, role_name, is_hidden, is_default) as (values
	('019b114c-1a72-7be0-b14a-87d91f5c8c84'::uuid, 'everyone', false, false),
	('019b1157-f780-7353-a9d9-7a2979cae7f5'::uuid, 'user', false, false),
	('019b116c-b630-7442-8301-e4e6dd364c4a'::uuid, 'admin', false, false),
	('019b1135-18e2-77c5-8c40-d1ce58f0a1f1'::uuid, 'admin-b', true, true),
	('019b1136-8eec-78ce-8be4-6a61e4e361e8'::uuid, 'moderator', false, false),
	('019b112f-168e-7625-af29-f94583392c03'::uuid, 'moderator-b', true, true)
), inserted_uroles as (
	insert into public.urole (id) select id from roles
)
insert into public.urole_custom (id, role_name, is_hidden, is_default) select * from roles
;

insert into public.default_permission_action (id, action_type, action_data) values
	-- by default, a user can edit their own profile
	('019b113e-d7ee-788a-8f09-40b8f68703ab', 'edit_profile', '{ "victim": { "type": "self" } }'::jsonb)
;

insert into public.permission_action (id, role_id, action_type, action_data) values
	-- an admin can edit the profile of anybody
	('019b1147-a894-7a9e-ac2b-6ee9b5923547', '019b116c-b630-7442-8301-e4e6dd364c4a', 'edit_profile', '{ "victim": { "type": "role", "id": "019b1157-f780-7353-a9d9-7a2979cae7f5" } }'::jsonb)
;
commit;