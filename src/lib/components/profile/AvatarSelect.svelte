<script lang="ts">
	import { m } from "$lib/paraglide/messages"
	import Cropper from "svelte-easy-crop"
	import type { AvatarImageData } from "./profile"

	const { onsubmit }: {
		onsubmit?: (image: AvatarImageData) => Promise<void> | void
	} = $props()

	const minZoom = 1
	const maxZoom = 3
	let image: AvatarImageData | undefined = $state()

	function handleFile(event: Event) {
		const input = event.target as HTMLInputElement
		const file = input.files?.[0]
		if(!file) {
			return
		}

		image = {
			image: URL.createObjectURL(file),
			crop: { x: 0, y: 0 },
			zoom: 1
		}
	}
</script>

<form
	method="dialog"
	onsubmit={async () => {
		if(onsubmit) {
			await onsubmit(image!)
		}
	}}>
	<h3 class="text-2xl font-bold text-base-content">{m.profile_avatar_title()}</h3>
	{#if !image}
		<fieldset class="fieldset">
			<legend class="fieldset-legend">{m.profile_avatar_description()}</legend>
			<input
				type="file"
				class="file-input"
				accept="image/webp,image/jpeg,image/png"
				onchange={handleFile}
			/>
			<span class="label">{m.profile_avatar_sizeHint()}</span>
		</fieldset>
	{:else}
		<p class="text-base-content/50 text-sm my-2">{m.profile_avatar_selectionHint()}</p>
		<div class="flex justify-center my-6">
			<div class="h-[256px] w-[256px] relative">
				<Cropper
					image={image.image}
					{minZoom}
					{maxZoom}
					bind:zoom={image.zoom}
					bind:crop={image.crop}
					cropSize={{ width: 256, height: 256 }}
					aspect={1}
					showGrid={false}
					restrictPosition
					cropShape="round"
				/>
			</div>
		</div>
		<div class="flex gap-2">
			<input class="btn btn-sm btn-primary flex-1" type="submit" value={m.profile_avatar_submit()}/>
			<button class="btn btn-sm btn-error flex-1" onclick={() => {
				URL.revokeObjectURL(image!.image)
				image = undefined
			}}>{m.profile_avatar_back()}</button>
		</div>
	{/if}
</form>
