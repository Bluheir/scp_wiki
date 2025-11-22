BEGIN;

CREATE TABLE public.profile(
	id UUID PRIMARY KEY,
	FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE,

	username VARCHAR(32) NOT NULL
);
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
	INSERT INTO public.profile (id, username)
	VALUES (new.id, new.raw_user_meta_data ->> 'username');
	RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
	AFTER INSERT ON auth.users
	FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE TABLE public.urole_or_utag(
	id UUID PRIMARY KEY,

	creator_profile_id UUID,
	FOREIGN KEY (creator_profile_id) REFERENCES public.profile (id)
);
ALTER TABLE public.urole_or_utag ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.urole(
	id UUID PRIMARY KEY,
	FOREIGN KEY (id) REFERENCES public.urole_or_utag (id),

	role_name VARCHAR(32) NOT NULL UNIQUE
);
ALTER TABLE public.urole ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.urole_profile(
	profile_id UUID NOT NULL,
	FOREIGN KEY (profile_id) REFERENCES public.profile (id) ON DELETE CASCADE,

	urole_id UUID NOT NULL,
	FOREIGN KEY (urole_id) REFERENCES public.urole (id) ON DELETE CASCADE,

	PRIMARY KEY (profile_id, urole_id)
);
ALTER TABLE public.urole_profile ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.utag(
	id UUID PRIMARY KEY,
	FOREIGN KEY (id) REFERENCES public.urole_or_utag (id),

	tag_name VARCHAR(32) NOT NULL UNIQUE
);
ALTER TABLE public.utag ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.utag_urole(
	utag_id UUID NOT NULL,
	FOREIGN KEY (utag_id) REFERENCES public.utag (id) ON DELETE CASCADE,

	urole_id UUID NOT NULL,
	FOREIGN KEY (urole_id) REFERENCES public.urole (id) ON DELETE CASCADE,

	PRIMARY KEY (utag_id, urole_id)
);
ALTER TABLE public.utag_urole ENABLE ROW LEVEL SECURITY;

COMMIT;