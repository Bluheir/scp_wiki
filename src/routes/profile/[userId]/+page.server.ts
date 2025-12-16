import { profileSchema } from "$lib/components/profile/profile"
import type { Actions } from "@sveltejs/kit"
import { fail, message, superValidate } from "sveltekit-superforms"
import { zod4 } from "sveltekit-superforms/adapters"

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const profileSchemaServer = profileSchema.check(async ({ value, issues }) => {
			const result = await locals.supabaseUser
				.from("profile")
				.update({
					biography: value.biography,
					username: value.username,
					pronouns: value.pronouns
				})
				.eq("id", params.userId!)
		})

		const form = await superValidate(request, zod4(profileSchemaServer))
		if (!form.valid) {
			return fail(400, { form })
		}

		return message(form, "success")
	}
}