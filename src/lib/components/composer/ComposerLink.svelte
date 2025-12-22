<script lang="ts">
	import { m } from "$lib/paraglide/messages"
	import type { Editor } from "@tiptap/core"
	import { Check, Link2, X } from "lucide-svelte"

	const { editor }: { editor: Editor } = $props()
	let element: HTMLElement | undefined = $state()
	let linkText = $derived(editor.getAttributes("link").href ?? "")
	const unsetDisabled = $derived(editor.getAttributes("link").href == null)
	const submitDisabled = $derived(linkText === (editor.getAttributes("link").href ?? ""))
</script>

<div class="flex items-center">
	<button
		class="btn btn-ghost btn-square btn-xs"
		class:text-primary={editor.isActive("link")}
		style="anchor-name:--composer-link-{editor.instanceId}-anchor"
		popovertarget="composer-link-{editor.instanceId}-popover"
		title={m.composer_link()}
	>
		<Link2 class="w-4" />
	</button>
	<div
		class="dropdown dropdown-bottom rounded-box border border-base-content/10 bg-base-200 p-2 flex gap-2 items-center"
		id="composer-link-{editor.instanceId}-popover"
		style="position-anchor:--composer-link-{editor.instanceId}-anchor"
		bind:this={element}
		popover
	>
		<input
			type="text"
			class="input input-sm"
			placeholder={m.composer_enterLink()}
			bind:value={linkText}
		/>
		<button
			class="btn btn-square btn-xs btn-error"
			class:btn-disabled={unsetDisabled}
			title={m.composer_unsetLink()}
			onclick={() => {
				editor.chain().unsetLink().focus().run()
			}}
		>
			<X class="w-4"/>
		</button>
		<button
			class="btn btn-xs btn-success"
			class:btn-disabled={submitDisabled}
			title={m.composer_setLink()}
			onclick={() => {
				editor.chain().setLink({ href: linkText }).focus().run()
			}}
		>
			{m.composer_setLink()}
			<Check class="w-4"/>
		</button>
	</div>
</div>
