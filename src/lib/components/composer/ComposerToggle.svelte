<script lang="ts">
	import type { Snippet } from "svelte"

	const {
		isActive,
		label,
		onclick,
		children
	}: {
		isActive: boolean,
		label: string,
		onclick: () => any,
		children?: Snippet<[]>
	} = $props()
</script>

<div class="flex items-center">
	<button
		class="btn btn-ghost btn-square btn-xs"
		aria-label={label}
		class:btn-active={isActive}
		title={label}
		onclick={onclick}
	>
		{@render children?.()}
	</button>
</div>