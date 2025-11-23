import * as z from "zod"
import { m } from "$lib/paraglide/messages"

export const signInSchema = z.object({
	email: z.email({ error: m.auth_invalidEmail }),
	password: z.string().min(1, { error: m.auth_invalidPassword }).max(255, { error: m.auth_invalidPassword })
})
2