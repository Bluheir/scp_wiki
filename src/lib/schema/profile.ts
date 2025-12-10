import * as z from "zod"
import { username } from "./auth"

export const profileSchema = z.object({
	username,
	pronouns: z.string().max(32),
	biography: z.string().max(1024)
})
