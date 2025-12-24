<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte"
	import { createSimpleEditor } from "./editor"
	import type { Editor } from "@tiptap/core"

	const {
		editor = createSimpleEditor(),
		children
	}: {
		editor?: Editor
		children: Snippet<[{ editor: Editor; contents: Snippet<[]> }]>
	} = $props()

	let element: Element | undefined = $state()
	let editorState: { editor: Editor } = $state({ editor })

	onMount(() => {
		editor.commands.clearContent()
		editorState.editor.on("transaction", ({ editor }) => {
			editorState = { editor }
		})
		editorState.editor.mount(element!)
	})

	onDestroy(() => {
		if (editorState.editor) {
			editorState.editor.destroy()
		}
	})
</script>

{#snippet editContents()}
	<div class="h-[calc(100%-16px)]" bind:this={element}></div>
{/snippet}

{@render children({ editor: editorState.editor, contents: editContents })}

<style>
	:global(.tiptap):focus {
		outline: none;
	}
	:global(.tiptap) {
		height: 100%;
		box-sizing: border-box;
	}
	:global(.tiptap p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}

	:global(.tiptap *) {
		all: revert;
	}
	:global(.tiptap a) {
		cursor: pointer;
	}
</style>
