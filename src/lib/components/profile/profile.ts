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
	image: File
	crop: { x: number; y: number }
	zoom: number
	fileUrl: string
}

export const cropData = z.object({
	x: z.number(),
	y: z.number(),
	width: z.number(),
	height: z.number()
})

export const imageData = z.object({
	image: z
		.file()
		.mime(["image/gif", "image/webp", "image/jpeg", "image/png", "image/avif"])
		.max(1024 * 1024, { error: m.profile_avatar_imageMax }),
	crop: cropData
})

export const profileSchema = z.object({
	username,
	pronouns: z.string().max(32, { error: () => m.profile_maxPronounsLen({ max: 32 }) }),
	biography: z.string().max(1024, { error: () => m.profile_maxBiographyLen({ max: 1024 }) }),
	imageData: imageData.optional()
})

export type CropData = z.infer<typeof cropData>
export type ProfileEdit = z.infer<typeof profileSchema>
