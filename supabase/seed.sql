begin;
insert into permission.urole (id, role_name, is_hidden, is_default) values
	('019b114c-1a72-7be0-b14a-87d91f5c8c84', 'everyone', false, false),
	('019b1157-f780-7353-a9d9-7a2979cae7f5', 'user', false, false),
	('019b116c-b630-7442-8301-e4e6dd364c4a', 'admin', false, false),
	('019b1135-18e2-77c5-8c40-d1ce58f0a1f1', 'admin-b', true, true),
	('019b1136-8eec-78ce-8be4-6a61e4e361e8', 'moderator', false, false),
	('019b112f-168e-7625-af29-f94583392c03', 'moderator-b', true, true)
;

insert into permission.default_action (info) values
	(('edit_profile', '{}'::jsonb, null, 'self')::permission.permission_info)
;

insert into permission.urole_action (urole_id, info) values
	(
		'019b116c-b630-7442-8301-e4e6dd364c4a',
		(
			'edit_profile',
			'{}'::jsonb,
			'019b1157-f780-7353-a9d9-7a2979cae7f5',
			'role'
		)::permission.permission_info
	)
;
commit;