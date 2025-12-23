<script lang="ts">
	import { m } from "$lib/paraglide/messages"
	import type { Editor } from "@tiptap/core"
	import * as Icon from "lucide-svelte"

	const { editor }: { editor: Editor } = $props()

	const textTypes = [
		{
			name: m.composer_paragraph(),
			icon: Icon.Pilcrow,
			onClick: () => {
				editor.chain().setParagraph().focus().run()
			}
		},
		{
			name: m.composer_orderedList(),
			icon: Icon.ListOrdered,
			onClick: () => {
				editor.chain().toggleOrderedList().focus().run()
			}
		},
		{
			name: m.composer_unorderedList(),
			icon: Icon.List,
			onClick: () => {
				editor.chain().toggleBulletList().focus().run()
			}
		},
		{
			name: m.composer_heading({ level: 1 }),
			icon: Icon.Heading1,
			onClick: () => {
				editor.chain().setHeading({ level: 1 }).focus().run()
			}
		},
		{
			name: m.composer_heading({ level: 2 }),
			icon: Icon.Heading2,
			onClick: () => {
				editor.chain().setHeading({ level: 2 }).focus().run()
			}
		},
		{
			name: m.composer_heading({ level: 3 }),
			icon: Icon.Heading3,
			onClick: () => {
				editor.chain().setHeading({ level: 3 }).focus().run()
			}
		},
		{
			name: m.composer_heading({ level: 4 }),
			icon: Icon.Heading4,
			onClick: () => {
				editor.chain().setHeading({ level: 4 }).focus().run()
			}
		},
		{
			name: m.composer_heading({ level: 5 }),
			icon: Icon.Heading5,
			onClick: () => {
				editor.chain().setHeading({ level: 5 }).focus().run()
			}
		},
		{
			name: m.composer_heading({ level: 6 }),
			icon: Icon.Heading6,
			onClick: () => {
				editor.chain().setHeading({ level: 6 }).focus().run()
			}
		}
	]

	const currentHeadingLevel = $derived.by(() => {
		const hattr = editor.getAttributes("heading")

		if (hattr.level) {
			return hattr.level + 2
		}

		if (editor.isActive("orderedList")) {
			return 1
		}
		if (editor.isActive("bulletList")) {
			return 2
		}

		return 0
	})
	const currentHeading = $derived(textTypes[currentHeadingLevel])
</script>

<button
	class="btn btn-ghost"
	style="anchor-name:--composer-{editor.instanceId}-anchor"
	popovertarget="composer-{editor.instanceId}-popover"
>
	<currentHeading.icon class="w-4" />
	<span>{currentHeading.name}</span>
	<Icon.ChevronDown class="w-4" />
</button>
<div
	class="menu dropdown dropdown-center w-40 rounded-box border border-base-content/10 bg-base-200"
	id="composer-{editor.instanceId}-popover"
	style="position-anchor:--composer-{editor.instanceId}-anchor"
	popover
>
	{#each textTypes as textVariant}
		<button
			onclick={textVariant.onClick}
			class="btn btn-block justify-start px-2 font-normal btn-ghost"
		>
			<textVariant.icon class="w-6" />
			<span>{textVariant.name}</span>
		</button>
	{/each}
</div>
