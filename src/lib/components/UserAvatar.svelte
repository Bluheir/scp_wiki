<script lang="ts">
	import { Avatar } from "bits-ui"

	const {
		user,
		size = "base",
		style = "box",
		isLink = false
	}: {
		user: {
			id: string
			username: string
			avatarUrl?: string
		}
		size?: "sm" | "base" | "lg"
		style?: "circle" | "box"
		isLink?: boolean
	} = $props()

	const widthClass = $derived.by(() => {
		switch (size) {
			case "sm":
				return "w-8"
			case "base":
				return "w-12"
			case "lg":
				return "w-16"
		}
	})

	const radiusClass = $derived.by(() => {
		switch (style) {
			case "circle":
				return "rounded-full"
			case "box":
				return "rounded-field"
		}
	})
</script>

{#snippet things()}
	<Avatar.Root class="avatar">
		<div class="{widthClass} {radiusClass}">
			<Avatar.Image src={user.avatarUrl} />
			<Avatar.Fallback
				class="flex h-full items-center justify-center rounded-[inherit] border border-base-content/10 bg-base-200 select-none"
				>{user.username[0]}</Avatar.Fallback
			>
		</div>
	</Avatar.Root>
{/snippet}

{#if isLink}
	<a href="/profile/{user.id}">
		{@render things()}
	</a>
{:else}
	{@render things()}
{/if}
