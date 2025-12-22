<script lang="ts">
	import type { Editor } from "@tiptap/core"
	import { m } from "$lib/paraglide/messages"
	import * as Icon from "lucide-svelte"
	import { Separator } from "bits-ui"
	import ComposerToggle from "./ComposerToggle.svelte"
	import ComposerTextVariant from "./ComposerTextVariant.svelte"
	import ComposerFont from "./ComposerFont.svelte"

	const { editor }: { editor: Editor } = $props()
</script>

<div
	class="flex flex-wrap items-stretch gap-2 rounded border border-base-content/10 px-2 py-[0.3rem]"
>
	<button
		class="btn px-1 py-0.5 btn-ghost"
		title={m.composer_undo()}
		onclick={() => editor.commands.undo()}
	>
		<Icon.RotateCcw class="w-4" />
	</button>
	<button
		class="btn px-1 py-0.5 btn-ghost"
		title={m.composer_redo()}
		onclick={() => editor.commands.redo()}
	>
		<Icon.RotateCw class="w-4" />
	</button>

	<Separator.Root class="w-[0.5px] bg-base-content/10" orientation="vertical" />

	<ComposerTextVariant {editor} />

	<Separator.Root class="w-[0.5px] bg-base-content/10" orientation="vertical" />

	<ComposerFont {editor} />

	<Separator.Root class="w-[0.5px] bg-base-content/10" orientation="vertical" />

	<ComposerToggle
		isActive={editor.isActive("bold")}
		label={m.composer_toggleBold()}
		onclick={() => editor.commands.toggleBold()}
	>
		<Icon.Bold class="w-4" />
	</ComposerToggle>
	<ComposerToggle
		isActive={editor.isActive("italic")}
		label={m.composer_toggleItalic()}
		onclick={() => editor.commands.toggleItalic()}
	>
		<Icon.Italic class="w-4" />
	</ComposerToggle>
	<ComposerToggle
		isActive={editor.isActive("underline")}
		label={m.composer_toggleUnderline()}
		onclick={() => editor.commands.toggleUnderline()}
	>
		<Icon.Underline class="h-4" />
	</ComposerToggle>
	<ComposerToggle
		isActive={editor.isActive("superscript")}
		label={m.composer_toggleSuperscript()}
		onclick={() => editor.commands.toggleSuperscript()}
	>
		<Icon.Superscript class="h-4" />
	</ComposerToggle>
	<ComposerToggle
		isActive={editor.isActive("subscript")}
		label={m.composer_toggleSubscript()}
		onclick={() => editor.commands.toggleSubscript()}
	>
		<Icon.Subscript class="h-4" />
	</ComposerToggle>

	<Separator.Root class="w-[0.5px] bg-base-content/10" orientation="vertical" />

	<ComposerToggle
		isActive={editor.isActive({ textAlign: "left" })}
		label={m.composer_alignLeft()}
		onclick={() => {
			if (editor.isActive({ textAlign: "left" })) {
				editor.chain().unsetTextAlign().focus().run()
			} else {
				editor.chain().setTextAlign("left").focus().run()
			}
		}}
	>
		<Icon.TextAlignStart class="w-4"/>
	</ComposerToggle>
	<ComposerToggle
		isActive={editor.isActive({ textAlign: "center" })}
		label={m.composer_alignCenter()}
		onclick={() => {
			if (editor.isActive({ textAlign: "center" })) {
				editor.chain().unsetTextAlign().focus().run()
			} else {
				editor.chain().setTextAlign("center").focus().run()
			}
		}}
	>
		<Icon.TextAlignCenter class="w-4"/>
	</ComposerToggle>
	<ComposerToggle
		isActive={editor.isActive({ textAlign: "right" })}
		label={m.composer_alignRight()}
		onclick={() => {
			if (editor.isActive({ textAlign: "right" })) {
				editor.chain().unsetTextAlign().focus().run()
			} else {
				editor.chain().setTextAlign("right").focus().run()
			}
		}}
	>
		<Icon.TextAlignEnd class="w-4"/>
	</ComposerToggle>
	<ComposerToggle
		isActive={editor.isActive({ textAlign: "justify" })}
		label={m.composer_alignJustify()}
		onclick={() => {
			if (editor.isActive({ textAlign: "justify" })) {
				editor.chain().unsetTextAlign().focus().run()
			} else {
				editor.chain().setTextAlign("justify").focus().run()
			}
		}}
	>
		<Icon.TextAlignJustify class="w-4"/>
	</ComposerToggle>
</div>
