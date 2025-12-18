begin;

insert into storage.buckets (id, name, allowed_mime_types, public, file_size_limit) values
	('avatar', 'avatar', array['image/avif'], true, 1024 * 1024);

commit;
