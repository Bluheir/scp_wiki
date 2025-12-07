<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte"
	import type { string } from "zod"

	const props: {
		id: string
		avatarUrl?: string,
		username: string
	} | {
		id: undefined
	} = $props()
</script>

<div class="w-[1000px]">
	{#if props.id}
		<Navbar user={props} />
	{:else}
		<Navbar />
	{/if}
</div>
