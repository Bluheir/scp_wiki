<script lang="ts">
	import type { Snippet } from "svelte"

	const {
		isActive,
		isDisabled = false,
		label,
		onclick,
		children
	}: {
		isActive: boolean
		isDisabled?: boolean
		label: string
		onclick: () => any
		children?: Snippet<[]>
	} = $props()
</script>

<div class="flex items-center">
	<button
		class="btn btn-square btn-xs {isActive ? 'btn-soft btn-primary' : 'btn-ghost'}"
		aria-label={label}
		class:btn-disabled={isDisabled}
		title={label}
		{onclick}
	>
		{@render children?.()}
	</button>
</div>
