begin;
alter table public.profile
add column created_at timestamp not null default (now() at time zone 'utc');

revoke update (created_at) on table public.profile from authenticated;
commit;