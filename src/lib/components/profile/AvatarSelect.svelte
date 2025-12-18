<script lang="ts">
	import * as Form from "formsnap"
	import { m } from "$lib/paraglide/messages"
	import Cropper from "svelte-easy-crop"
	import type { AvatarImageData, ProfileEdit } from "./profile"
	import { Image, Info } from "lucide-svelte"
	import type { SuperForm } from "sveltekit-superforms"

	let {
		form,
		image = $bindable(),
		onsubmit
	}: {
		form: SuperForm<ProfileEdit>
		image: AvatarImageData | undefined
		onsubmit?: () => Promise<void> | void
	} = $props()

	const minZoom = 1
	const maxZoom = 3
	const formDataWritable = $derived(form.form)
	let crop = $state({ x: 0, y: 0, width: 0, height: 0 })

	function handleFile(event: Event) {
		const input = event.target as HTMLInputElement
		const file = input.files?.[0]
		if (!file) {
			return
		}

		$formDataWritable.imageData = {
			image: file,
			crop
		}
		if (file.size <= 1024 * 1024) {
			image = {
				image: file,
				fileUrl: URL.createObjectURL(file),
				crop: { x: 0, y: 0 },
				zoom: 1
			}
		}
	}
</script>

<div>
	<h3 class="text-2xl font-bold text-base-content">{m.profile_avatar_title()}</h3>
	<Form.Field {form} name="imageData.image">
		<div class="fieldset">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="fieldset-legend">{m.profile_avatar_description()}</Form.Label>
					<input
						type="file"
						class="file-input"
						accept="image/webp, image/jpeg, image/png, image/gif, image/avif"
						onchange={handleFile}
						data-testid="profile-edit-avatar-upload"
						{...props}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="label">{m.profile_avatar_sizeHint()}</Form.Description>
			<Form.FieldErrors class="label text-error" />
		</div>
	</Form.Field>
	{#if image}
		<p class="my-2 flex items-center gap-1.5 text-sm text-base-content/50">
			<Info class="w-[1em]" />{m.profile_avatar_selectionHint()}
		</p>
		<div class="my-6 flex justify-center">
			<div class="relative h-[256px] w-[256px]">
				<Cropper
					image={image.fileUrl}
					{minZoom}
					{maxZoom}
					bind:zoom={image.zoom}
					bind:crop={image.crop}
					cropSize={{ width: 256, height: 256 }}
					aspect={1}
					showGrid={false}
					restrictPosition
					cropShape="round"
					oncropcomplete={(e) => (crop = e.pixels)}
				/>
			</div>
		</div>
		<div class="my-6 flex items-center justify-center gap-3 text-xl">
			<Image class="w-4" />
			<input
				class="range"
				type="range"
				min={0}
				max={100}
				bind:value={
					() => ((image!.zoom - minZoom) / (maxZoom - minZoom)) * 100,
					(v) => (image!.zoom = (v / 100) * (maxZoom - minZoom) + minZoom)
				}
			/>
			<Image class="h-8 w-8" />
		</div>
		<button
			class="btn w-full btn-sm btn-primary"
			type="button"
			onclick={async () => {
				$formDataWritable.imageData = {
					image: image!.image,
					crop
				}
				if (onsubmit) {
					await onsubmit()
				}
			}}
			data-testid="profile-edit-avatar-submit"
		>
			{m.profile_avatar_submit()}
		</button>
	{/if}
</div>
