import * as z from "zod"
import { username } from "$lib/schema/auth"

export type Profile = {
	readonly id: string
	readonly username: string
	readonly biography: string
	readonly pronouns: string
	readonly avatarUrl?: string
	readonly createdAt: Date
	readonly forumRating: number
	readonly wikiRating: number
}

export const profileSchema = z.object({
	username,
	pronouns: z.string().max(32),
	biography: z.string().max(1024)
})

export type ProfileEdit = z.infer<typeof profileSchema>
