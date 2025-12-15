<script lang="ts">
	import Cropper from "svelte-easy-crop"

	type ImageData = {
		image: string
		crop: { x: number, y: number }
		zoom: number
	}

	const { onsubmit }: {
		onsubmit?: (image: ImageData) => Promise<void> | void
	} = $props()

	const minZoom = 1
	const maxZoom = 3
	let image: ImageData | undefined = $state()

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
	<h3 class="text-2xl font-bold text-base-content">Avatar Image</h3>
	{#if !image}
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Upload a profile picture</legend>
			<input
				type="file"
				class="file-input"
				accept="image/webp,image/jpeg,image/png"
				onchange={handleFile}
			/>
			<span class="label">Max size 0.5MB</span>
		</fieldset>
	{:else}
		<p class="text-base-content/50 text-sm my-2">Select the area of the image you want to display as your avatar</p>
		<div class="flex justify-center my-6">
			<div class="h-[256px] w-[256px] relative">
				<Cropper
					image={image.image}
					{minZoom}
					{maxZoom}
					bind:zoom={image.zoom}
					bind:crop={image.crop}
					aspect={1}
					showGrid={false}
					restrictPosition
					cropShape="round"
				/>
			</div>
		</div>
		<div class="flex gap-2">
			<input class="btn btn-sm btn-primary flex-1" type="submit" value="Submit"/>
			<button class="btn btn-sm btn-error flex-1" onclick={() => {
				URL.revokeObjectURL(image!.image)
				image = undefined
			}}>Choose another image</button>
		</div>
	{/if}
</form>
