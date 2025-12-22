<script lang="ts">
	import type { Editor } from "@tiptap/core"
	import { m } from "$lib/paraglide/messages"
	import * as Icon from "lucide-svelte"

	const { editor }: { editor: Editor } = $props()
</script>

<div class="flex flex-wrap gap-1.5 rounded border border-base-content/10 items-center px-2 py-1">
	<button
		class="btn btn-ghost px-1 py-0.5"
		title={m.composer_undo()}
		onclick={() => editor.commands.undo()}
	>
		<Icon.RotateCcw class="w-[1em]" />
	</button>
	<button
		class="btn btn-ghost px-1 py-0.5"
		title={m.composer_redo()}
		onclick={() => editor.commands.redo()}
	>
		<Icon.RotateCw class="w-[1em]" />
	</button>
</div>
