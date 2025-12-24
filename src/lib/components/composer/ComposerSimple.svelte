<script lang="ts">
	import type { Snippet } from "svelte"
	import Composer from "./Composer.svelte"
	import ComposerToolbar from "./ComposerToolbar.svelte"
	import type { Editor } from "@tiptap/core"

	const { children: children2 }: { children?: Snippet<[{ editor: Editor }]> } = $props()
</script>

<Composer>
	{#snippet children({ editor, contents })}
		<div class="flex h-full flex-col rounded-[inherit]">
			<div
				class="z-10 m-2 rounded-[inherit] rounded-box border border-base-content/10 bg-base-200 p-1.5"
			>
				<ComposerToolbar {editor} />
			</div>
			<div
				class="flex-1 overflow-auto border-y border-base-content/10 px-2 transition focus-within:border-primary hover:cursor-text"
			>
				{@render contents()}
			</div>
			<div class="p-2">
				{@render children2?.({ editor })}
			</div>
		</div>
	{/snippet}
</Composer>
