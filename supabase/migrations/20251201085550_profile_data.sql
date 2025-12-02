BEGIN;

ALTER TABLE public.profile
ADD COLUMN avatar_url TEXT,
	ADD COLUMN pronouns VARCHAR(32) NOT NULL DEFAULT '',
	ADD COLUMN biography VARCHAR(1024) NOT NULL DEFAULT '',
	ADD COLUMN forum_rating BIGINT NOT NULL DEFAULT 0,
	ADD COLUMN wiki_rating BIGINT NOT NULL DEFAULT 0,
	ADD CONSTRAINT username_length_check CHECK (
		char_length(username) BETWEEN 1 AND 32
	);

ALTER TABLE public.urole
ADD is_hidden BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE public.utag
ADD is_hidden BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE public.urole_permission(
	id UUID NOT NULL,
	FOREIGN KEY (id) REFERENCES public.urole (id) ON DELETE CASCADE,
	permission_name VARCHAR(32) NOT NULL,
	PRIMARY KEY (id, permission_name)
);
ALTER TABLE public.urole_permission ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can access profiles" ON public.profile FOR
SELECT TO anon, authenticated
USING (true);

CREATE POLICY "users can update their own profile" ON public.profile FOR
update TO authenticated USING (
		id = (
			SELECT auth.uid()
		)
	) WITH CHECK (
		id = (
			SELECT auth.uid()
		)
	);

REVOKE
UPDATE (forum_rating, wiki_rating) ON TABLE public.profile
FROM authenticated;

CREATE FUNCTION roles_for_uid(uid UUID) RETURNS TABLE (role_id UUID, role_name TEXT) LANGUAGE SQL SECURITY DEFINER
SET row_security = OFF AS $$
SELECT public.urole.id AS role_id,
	public.urole.role_name
FROM public.urole_profile
	JOIN public.urole on public.urole_profile.urole_id = public.urole.id
WHERE public.urole_profile.profile_id = uid
UNION
SELECT id AS role_id,
	role_name
FROM public.urole
WHERE role_name = 'everyone'
	OR (
		role_name = 'user'
		AND uid IS NOT NULL
	);
$$;

CREATE FUNCTION has_permission(uid uuid, permission_name TEXT) RETURNS BOOLEAN AS $$
SELECT EXISTS (
		SELECT 1
		FROM roles_for_uid(uid) available_role
			JOIN public.urole_permission ON available_role.role_id = public.urole_permission.id
		WHERE public.urole_permission.permission_name = permission_name
	);
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE POLICY "anon or auth can view roles"
ON public.urole
FOR SELECT TO authenticated, anon
USING (true);

CREATE POLICY "anon or auth can view role assignments"
ON public.urole_profile
FOR SELECT TO authenticated, anon
USING (true);

CREATE POLICY "anon or auth can view tags"
ON public.utag
FOR SELECT TO authenticated, anon
USING (true);

CREATE POLICY "anon or auth can view tag assignments"
ON public.utag_urole
FOR SELECT TO authenticated, anon
USING (true);

CREATE POLICY "anon or auth can view permission assignments"
ON public.urole_permission
FOR SELECT TO authenticated, anon
USING (true);

COMMIT;