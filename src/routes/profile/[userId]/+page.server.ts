import { profileSchema } from "$lib/components/profile/profile"
import { error, type Actions } from "@sveltejs/kit"
import sharp, { type Sharp } from "sharp"
import { Readable } from "node:stream"
import { ReadableStream } from "node:stream/web"
import { fail, message, superValidate } from "sveltekit-superforms"
import { zod4 } from "sveltekit-superforms/adapters"
import { v7 } from "uuid"

function relativePositions(
	meta: {
		width: number
		height: number
		naturalWidth: number
		naturalHeight: number
	},
	zoom: number,
	crop: { x: number; y: number },
	cropSize: { width: number, height: number }
) {
	const width = Math.round(cropSize.width / meta.width / zoom * meta.naturalWidth)
	const height = Math.round(cropSize.height / meta.height / zoom * meta.naturalHeight)
	const x = Math.round(
		(((meta.width - cropSize.width / zoom) / 2 - crop.x / zoom) / meta.width) * meta.naturalWidth
	)
	const y = Math.round(
		(((meta.height - cropSize.height / zoom) / 2 - crop.y / zoom) / meta.height) * meta.naturalHeight
	)

	let m = { width, height }

	return {
		...m,
		x,
		y
	}
}

function imageEdit(
	meta: sharp.Metadata,
	crop: { x: number; y: number },
	zoom: number,
	size: number
): Sharp | undefined {
	const { x, y, width, height } = relativePositions({
		width: size,
		height: size,
		naturalWidth: meta.width,
		naturalHeight: meta.height
	}, zoom, crop, { width: size, height: size })

	if (x + width > meta.width || y + height > meta.height || x < 0 || y < 0) {
		return
	}

	return sharp()
		.extract({
			top: y,
			left: x,
			height,
			width
		})
		.resize({
			width: size,
			height: size
		})
		.avif({
			lossless: true,
			quality: 100
		})
}

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		if(!params.userId) {
			error(400)
		}
		const userId = params.userId
		const profileSchemaServer = profileSchema.check(async ({ value, issues }) => {
			const result = await locals.supabaseUser
				.from("profile")
				.update({
					biography: value.biography,
					username: value.username,
					pronouns: value.pronouns
				})
				.eq("id", userId)
				.select("id")
				.single()

			if (!result.data) {
				issues.push({
					code: "custom",
					message: "Failed to update profile, most likely because permissions were changed",
					path: ["username"],
					input: userId
				})
				return
			}

			if (!value.imageData) {
				return
			}

			const listed = await locals.supabaseAdmin.storage.from("avatar").list(`${userId}`)
			if(!listed.data) {
				return
			}

			if(listed.data.length >= 3) {
				const idsToDelete = listed.data.filter(value => value.name !== ".emptyFolderPlaceholder").map(value => value.name).sort((a, b) => b.localeCompare(a)).slice(1)
				await locals.supabaseAdmin.storage.from("avatar").remove(idsToDelete.map(name => `${userId}/${name}`))
			}

			const { imageData } = value
			const imageStream = imageData.image.stream()
			const [imageMetadataStream, mainStream] = imageStream.tee()
			const metadata = await Readable.fromWeb(imageMetadataStream as ReadableStream).pipe(sharp()).metadata();
			const pipeline = imageEdit(metadata, imageData.crop, imageData.zoom, 256)
			if(!pipeline) {
				issues.push({
					code: "custom",
					message: "Crop position invalid",
					input: imageData.crop,
					path: ["imageData.crop"]
				})
				return
			}
			const avifStream = Readable.fromWeb(mainStream as ReadableStream).pipe(pipeline)
			const generatedUuid = v7()

			const newAvatarPath = `${params.userId}/${generatedUuid}.avif`
			await locals.supabaseAdmin.storage.from("avatar").upload(newAvatarPath, avifStream, { contentType: "image/avif" })
			const newAvatarUrl = locals.supabaseAdmin.storage.from("avatar").getPublicUrl(newAvatarPath).data.publicUrl
			
			await locals.supabaseAdmin.from("profile").update({ avatar_url: newAvatarUrl }).eq("id", userId)
		})

		const form = await superValidate(request, zod4(profileSchemaServer))
		if (!form.valid) {
			return fail(400, { form })
		}

		return message(form, "success")
	}
}
