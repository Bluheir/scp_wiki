import { registerSchema } from "$lib/schema/auth.js"
import { superValidate } from "sveltekit-superforms"
import { zod4 } from "sveltekit-superforms/adapters"
import type { Actions } from "./$types"
import { m } from "$lib/paraglide/messages.js"
import { fail } from "@sveltejs/kit"

export const load = async ({ locals }) => {
	const form = await superValidate(zod4(registerSchema))
	return { form }
}

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const registerSchemaServer = registerSchema.check(async ({ value, issues }) => {
			const { email, username, password } = value
			const signIn = await locals.supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						username
					}
				}
			})

			if (signIn.error) {
				issues.push({
					code: "custom",
					message: m.register_emailTaken(),
					path: ["email"],
					input: email
				})
			}
		})

		const form = await superValidate(request, zod4(registerSchemaServer))

		if (!form.valid) {
			return fail(400, { form })
		}
	}
}
