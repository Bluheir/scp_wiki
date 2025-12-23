begin;

create table public.post(
	id uuid primary key default public.uuidv7(),
	creator_id uuid not null,
	foreign key (creator_id) references public.profile (id),
	rating integer not null default 0
);
alter table public.post enable row level security;
alter publication supabase_realtime add table public.post;

create table public.post_revision(
	id uuid primary key default public.uuidv7(),
	post_id uuid not null,
	foreign key (post_id) references public.post (id),

	content text not null
);
create index post_revision_post_id_idx on public.post_revision (post_id);
alter table public.post_revision enable row level security;
alter publication supabase_realtime add table public.post_revision;

create domain public.vote as smallint check (value in (-1, 0, 1));

create table public.post_vote(
	post_id uuid not null,
	foreign key (post_id) references public.post (id),
	profile_id uuid not null,
	foreign key (profile_id) references public.profile (id),

	primary key (post_id, profile_id),

	vote_value public.vote not null default 0
);
alter table public.post_vote enable row level security;
alter publication supabase_realtime add table public.post_vote;

create table public.thread(
	id uuid not null primary key,
	foreign key (id) references public.post (id),
	topic_id uuid not null,
	foreign key (topic_id) references public.immediate_parent_topic (id),

	title varchar(64) not null default ''
);
create index thread_topic_id_idx on public.thread (topic_id);
alter table public.thread enable row level security;
alter publication supabase_realtime add table public.thread;

create table public.reply(
	id uuid primary key,
	foreign key (id) references public.post (id) on delete cascade,

	replying_to_post_id uuid not null,
	foreign key (replying_to_post_id) references public.post_revision (id)
);
create index reply_in_reply_to_idx on public.reply (replying_to_post_id);
alter table public.reply enable row level security;
alter publication supabase_realtime add table public.reply;

create type public.ratable_entity as enum(
	'post'
);

create or replace function public.set_vote_for(
	voter_id uuid,
	entity_type public.ratable_entity,
	entity_id uuid,
	new_vote public.vote
)
returns table(
	old_vote public.vote,
	new_rating integer,
	author_rating integer
)
language sql
security definer
set search_path = ''
set row_security = off
volatile
as $$
with
existing_vote as (
	select coalesce(
	  (select vote_value from public.post_vote where post_id = entity_id and profile_id = voter_id),
	  0
	) as vote_value
),
upsert_vote_value as (
	insert into public.post_vote (post_id, profile_id, vote_value)
	values (entity_id, voter_id, new_vote)
	on conflict (post_id, profile_id)
	do update set vote_value = new_vote
	returning (select vote_value from existing_vote)
),
updated_votes as (
	update public.post
	set rating = (select post.rating - vote_value + new_vote from upsert_vote_value)
	where post.id = entity_id
	returning creator_id, rating
),
updated_profile as (
	update public.profile
	set forum_rating = (select forum_rating - vote_value + new_vote from existing_vote)
	where id = (select creator_id from updated_votes)
	returning forum_rating
)
select
	upsert_vote_value.vote_value as old_vote,
	updated_votes.rating as new_rating,
	updated_profile.forum_rating as author_rating
from
	upsert_vote_value,
	updated_votes,
	updated_profile
$$;

revoke all on function public.set_vote_for(uuid, public.ratable_entity, uuid, public.vote)
from authenticated, anon;

commit;
