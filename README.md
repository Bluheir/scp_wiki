# `scp_wiki`

Currently, the SCP wiki is hosted on wikidot which uses legacy software and tools, is barely maintained and glitchy. This project aims to modernize the SCP wiki by using modern software tools such as
- SvelteKit
- Supabase
- PostgreSQL
- TailwindCSS
- DaisyUI
- BitsUI
- Storybook
- Vitest
- Paraglide

The project is split into two sections: one for the forums and one for the wiki. As of right now, development is focused on the forums.

Features on the wiki include/will include:
- [ ] Ability to request feedback directly from page drafts
- [ ] Ability to publish page drafts straight from the draft page
- [ ] Ability to branch drafts off of other page drafts (kind of like Git)
- [ ] Interactive page draft editor using TipTap
- [ ] Custom CSS embeddings in pages, for custom or very specific themes
- [ ] Pre-built themes for pages using DaisyUI
- [ ] Allowing published pages to be upvoted and downvoted
	- [ ] Scheduling for deletion when a page reaches below 0 rating
- [ ] Allowing the community to make translations for a page/article
	- [ ] Having a separate rating for a translation of a page
- [ ] Ability for users to make page drafts based on others' page drafts for collaboration OR to make their own fan version of an article

Features on the forums include/will include:
- [ ] Ability to create "topics" and "posts" (think of topics like folders and posts like files)
- [ ] Custom reactions to posts and replies (like Discord)
- [ ] Ability to downvote/upvote posts
- [ ] Ability to create multiple translations for topic descriptions and topic titles
- [ ] Ability for moderators to pin posts in topics

Features shared by the forum and wiki include/will include:
- [ ] Robust and flexible permissions system, with roles
- [ ] "Reactive" updates in the UI (e.g. a user changes their username, reflecting the change immediately in the UI)
- [x] Profile system, where users can set their profile picture, username, pronouns, and description
- [ ] User rating system: the sum of their post ratings + their wiki page ratings
- [ ] Localizations by default using Paraglide

## Setting up development environment
To setup this project, you will need [bun](https://bun.sh), [docker](https://docker.com) and Git installed.

Run the following commands:
```bash
git clone https://github.com/Bluheir/scp_wiki
cd scp_wiki
bun install
bunx supabase start
```

Create a file in the root of the project called `.env.local`. Paste this into it:
```
PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
PUBLIC_SUPABASE_ANON_KEY=
PRIVATE_SUPABASE_KEY=
PRIVATE_DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

Run `bunx supabase status` and set the environment variable values to the corresponding row in the status output:

 Environment Variable       | Supabase Status Row   
----------------------------|------------------------
 `PUBLIC_SUPABASE_URL`      | API URL                
 `PUBLIC_SUPABASE_ANON_KEY` | Publishable key        
 `PRIVATE_SUPABASE_KEY`     | Secret key             
 `PRIVATE_DATABASE_URL`     | Database URL           

Now you can run `bun run dev` to start the dev server!

## License
This project is licensed under the terms of the GPL v3.0 license. Refer to [LICENSE.md](LICENSE.md).
