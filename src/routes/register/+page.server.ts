import { registerSchema } from "$lib/schema/auth.js"
import { superValidate } from "sveltekit-superforms"
import { zod4 } from "sveltekit-superforms/adapters"

export const load = async ({ locals }) => {
	const form = await superValidate(zod4(registerSchema))
	return { form }
}
