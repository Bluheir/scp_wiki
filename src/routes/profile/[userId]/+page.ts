import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import type { Profile } from "$lib/components/profile/profile"

export const load: PageLoad = async ({ parent, params }) => {
	const { supabase } = await parent()

	const { data } = await supabase
		.from("profile")
		.select("id,username,avatar_url,pronouns,biography,forum_rating,wiki_rating")
		.eq("id", params.userId)
		.single()

	if (!data) {
		error(404)
	}

	const profile: Profile = {
		id: data.id,
		username: data.username,
		avatarUrl: data.avatar_url ?? undefined,
		pronouns: data.pronouns,
		biography: data.biography,
		forumRating: data.forum_rating,
		wikiRating: data.wiki_rating,
		createdAt: new Date()
	}

	return { supabase, profile }
}
