import { signInSchema } from "$lib/schema/auth.js"
import { superValidate } from "sveltekit-superforms"
import { zod4 } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types.js"

export const load = async ({ locals }) => {
	const form = await superValidate(zod4(signInSchema))
	return { form }
}

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const signInSchemaServer = signInSchema.check(async ({ value, issues }) => {
			const { email, password } = value
			const signIn = await locals.supabase.auth.signInWithPassword({
				email,
				password
			})

			if (signIn.error) {
				issues.push({
					code: "custom",
					message: "The provided email and password combination is invalid",
					path: ["password"],
					input: password
				})
			}
		})

		const form = await superValidate(request, zod4(signInSchemaServer))

		if (!form.valid) {
			return fail(400, { form })
		}

		redirect(303, "/")
	}
}
