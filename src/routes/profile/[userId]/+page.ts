import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import type { Profile } from "$lib/components/profile/profile"

export const load: PageLoad = async ({ parent, params }) => {
	const { supabase } = await parent()

	const { data } = await supabase
		.from("profile")
		.select("id,username,avatar_url,pronouns,biography,forum_rating,wiki_rating,created_at")
		.eq("id", params.userId)
		.single()

	if (!data) {
		error(404)
	}

	const { data: userData } = await supabase.auth.getUser();
	let readonly = true
	if(userData.user) {
		const { data: permissionData } = await supabase
			.from("user_victim_single_action")
			.select("profile_id")
			.eq("profile_id", userData.user.id)
			.eq("victim_profile_id", params.userId)
			.eq("action_type", "edit_profile")
			.limit(1)
			.single()

		readonly = permissionData === null
	}

	const profile: Profile = {
		id: data.id,
		username: data.username,
		avatarUrl: data.avatar_url ?? undefined,
		pronouns: data.pronouns,
		biography: data.biography,
		forumRating: data.forum_rating,
		wikiRating: data.wiki_rating,
		createdAt: new Date(data.created_at)
	}

	return { supabase, profile, readonly }
}
