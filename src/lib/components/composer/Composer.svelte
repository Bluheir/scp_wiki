<script lang="ts">
	import { Editor } from "@tiptap/core"
	import Superscript from "@tiptap/extension-superscript"
	import History from "@tiptap/extension-history"
	import Subscript from "@tiptap/extension-subscript"
	import BulletList from "@tiptap/extension-bullet-list"
	import OrderedListExt from "@tiptap/extension-ordered-list"
	import ListItem from "@tiptap/extension-list-item"
	import Link from "@tiptap/extension-link"
	import FontFamily from "@tiptap/extension-font-family"
	import { TextStyle } from "@tiptap/extension-text-style"
	import Placeholder from "@tiptap/extension-placeholder"
	import { Italic as ItalicExt } from "@tiptap/extension-italic"
	import { Bold as BoldExt } from "@tiptap/extension-bold"
	import Underline from "@tiptap/extension-underline"
	import TextAlign from "@tiptap/extension-text-align"
	import Document from "@tiptap/extension-document"
	import Heading from "@tiptap/extension-heading"
	import Paragraph from "@tiptap/extension-paragraph"
	import Text from "@tiptap/extension-text"
	import { onDestroy, onMount, type Snippet } from "svelte"
	import { m } from "$lib/paraglide/messages"

	const { toolbar }: { toolbar: Snippet<[{ editor: Editor }]> } = $props()

	let element: Element | undefined = $state()
	let editorState: { editor: Editor | null } = $state({ editor: null })

	onMount(() => {
		editorState.editor = new Editor({
			element,
			extensions: [
				ItalicExt,
				BoldExt,
				Link,
				Underline,
				Paragraph,
				Heading,
				Text,
				TextAlign.configure({
					alignments: ["left", "center", "right", "justify"],
					types: ["heading", "paragraph"]
				}),
				Placeholder.configure({
					placeholder: m.composer_placeholder()
				}),
				TextStyle,
				FontFamily,
				ListItem,
				Document,
				BulletList,
				OrderedListExt,
				Superscript,
				Subscript,
				History
			],
			autofocus: true,
			onTransaction: ({ editor }) => {
				editorState = { editor }
			}
		})
	})
	onDestroy(() => {
		if (editorState.editor) {
			editorState.editor.destroy()
		}
	})
</script>

{#if editorState.editor}
	{@render toolbar({ editor: editorState.editor })}
{/if}
<div
	class="border-base-content/10 border-y px-2 transition focus-within:border-primary hover:cursor-text"
	bind:this={element}
></div>

<style>
	:global(.tiptap):focus {
		outline: none;
	}
	:global(.tiptap) {
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
