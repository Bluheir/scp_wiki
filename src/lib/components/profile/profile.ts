import * as z from "zod"
import { username } from "$lib/schema/auth"
import { m } from "$lib/paraglide/messages"

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

export type AvatarImageData = {
	image: string
	crop: { x: number, y: number }
	zoom: number
}

export const profileSchema = z.object({
	username,
	pronouns: z.string().max(32, { error: () => m.profile_maxPronounsLen({ max: 32 }) }),
	biography: z.string().max(1024, { error: () => m.profile_maxBiographyLen({ max: 1024 }) })
})

export type ProfileEdit = z.infer<typeof profileSchema>
