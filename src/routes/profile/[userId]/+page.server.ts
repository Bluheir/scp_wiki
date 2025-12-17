import { profileSchema, type CropData } from "$lib/components/profile/profile"
import { error, type Actions } from "@sveltejs/kit"
import sharp, { type Sharp } from "sharp"
import { Readable } from "node:stream"
import { ReadableStream } from "node:stream/web"
import { setError, fail, message, superValidate } from "sveltekit-superforms"
import { zod4 } from "sveltekit-superforms/adapters"
import { v7 } from "uuid"

function imageEdit(meta: sharp.Metadata, crop: CropData, size: number): Sharp | undefined {
	const { x, y, width, height } = crop

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
		const form = await superValidate(request, zod4(profileSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		const value = form.data

		const userId = params.userId!
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
			error(403)
		}

		if (!value.imageData) {
			return { form }
		}

		const listed = await locals.supabaseAdmin.storage.from("avatar").list(`${userId}`)
		if (!listed.data) {
			error(500)
		}

		if (listed.data.length >= 3) {
			const idsToDelete = listed.data
				.filter((value) => value.name !== ".emptyFolderPlaceholder")
				.map((value) => value.name)
				.sort((a, b) => b.localeCompare(a))
				.slice(1)
			const deletionResult = await locals.supabaseAdmin.storage
				.from("avatar")
				.remove(idsToDelete.map((name) => `${userId}/${name}`))
			
			if(deletionResult.error) {
				error(500)
			}
		}

		const { imageData } = value
		const imageStream = imageData.image.stream()
		const [imageMetadataStream, mainStream] = imageStream.tee()
		const metadata = await Readable.fromWeb(imageMetadataStream as ReadableStream)
			.pipe(sharp())
			.metadata()
		const pipeline = imageEdit(metadata, imageData.crop, 256)
		if (!pipeline) {
			return setError(form, "imageData.crop")
		}
		const avifStream = Readable.fromWeb(mainStream as ReadableStream).pipe(pipeline)
		const generatedUuid = v7()

		const newAvatarPath = `${params.userId}/${generatedUuid}.avif`
		const uploadResult = await locals.supabaseAdmin.storage
			.from("avatar")
			.upload(newAvatarPath, avifStream, { contentType: "image/avif" })

		if(uploadResult.error) {
			error(500)
		}

		const newAvatarUrl = locals.supabaseAdmin.storage.from("avatar").getPublicUrl(newAvatarPath)
			.data.publicUrl

		const updateUrlResult = await locals.supabaseAdmin.from("profile").update({ avatar_url: newAvatarUrl }).eq("id", userId)

		if(updateUrlResult.error) {
			error(500)
		}

		return { form }
	}
}
