import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { profileSchema, type Profile } from "$lib/components/profile/profile"
import { superValidate } from "sveltekit-superforms"
import { zod4 } from "sveltekit-superforms/adapters"

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

	const { data: role_data } = await supabase 
		.from("urole_profile")
		.select("profile_id, urole_id, urole_custom(is_hidden, role_color, role_name)")
		.eq("profile_id", params.userId)

	if (!role_data) {
		error(500)
	}

	const { data: userData } = await supabase.auth.getUser()
	let readonly = true
	if (userData.user) {
		const { data: permissionData } = await supabase
			.schema("permission")
			.from("user_user_action")
			.select("user_id")
			.eq("user_id", userData.user.id)
			.eq("victim_user_id", params.userId)
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
		createdAt: new Date(data.created_at),
		roles: role_data.map(value => ({
			isHidden: value.urole_custom.is_hidden,
			roleId: value.urole_id,
			roleName: value.urole_custom.role_name,
			roleColor: value.urole_custom.role_color
		}))
	}


	const form = await superValidate(zod4(profileSchema), {
		defaults: {
			username: profile.username,
			pronouns: profile.pronouns,
			biography: profile.biography
		}
	})

	return { supabase, profile, readonly, form }
}
