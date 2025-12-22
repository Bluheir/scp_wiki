<script lang="ts">
	import type { Snippet } from "svelte"
	import Composer from "./Composer.svelte"
	import ComposerToolbar from "./ComposerToolbar.svelte"

	const { children }: { children?: Snippet<[]> } = $props()
</script>

<div class="h-full rounded-[inherit] flex flex-col">
	<Composer>
		{#snippet toolbar({ editor })}
			<div class="m-2 z-10 rounded-[inherit] border border-base-content/10 rounded-box p-1.5 bg-base-200">
				<ComposerToolbar {editor} />
			</div>
		{/snippet}
		{#snippet contents({ contents })}
			<div
				class="border-base-content/10 border-y px-2 transition focus-within:border-primary hover:cursor-text flex-1 overflow-auto"
			>
				{@render contents()}
			</div>
		{/snippet}
	</Composer>
	<div class="p-2">
		{@render children?.()}
	</div>
</div>
