<script lang="ts">
	import { Combobox } from "bits-ui"
	import type { Editor } from "@tiptap/core"
	import * as Icon from "lucide-svelte"
	import { m } from "$lib/paraglide/messages"

	const {
		editor,
		fonts = ["DEFAULT", "Arial", "monospace"]
	}: {
		editor: Editor
		fonts?: string[]
	} = $props()

	const fontInfo = $derived(
		fonts.map((family) => ({ value: family, label: m.composer_font({ family }) }))
	)

	let currentFont: string = $derived(editor.getAttributes("textStyle").fontFamily ?? "DEFAULT")
	let currentFontName: string = $derived(m.composer_font({ family: currentFont }))
	let searchValue: string = $derived(currentFontName)
	let open: boolean = $state(false)
	const searchTextLower: string = $derived(searchValue.toLowerCase())

	function setFont(newFontI: string | undefined) {
		open = false
		let newFont = newFontI
		switch(newFontI) {
			case(undefined):
			case(""):
				newFont = "DEFAULT"
				break
			default:
				newFont = newFontI
		}
		currentFont = newFont
		currentFontName = m.composer_font({ family: newFont })
		searchValue = currentFontName
		let chain = editor.chain().focus()
		if (newFont === "DEFAULT") {
			chain = chain.unsetFontFamily()
		} else {
			chain = chain.setFontFamily(newFont)
		}

		chain.run()
	}

	const filteredFonts = $derived(
		searchValue === ""
			? fontInfo
			: fontInfo.filter(
					(font) =>
						font.value.toLowerCase().includes(searchTextLower) ||
						font.label.toLowerCase().includes(searchTextLower)
				)
	)
</script>

<Combobox.Root
	type="single"
	bind:open
	bind:value={
		() => currentFont,
		(newFont) => setFont(newFont)
	}
	inputValue={searchValue}
	onOpenChangeComplete={(o) => {
		if(filteredFonts.length === 0) {
			setFont(currentFont)
		} else {
			setFont(filteredFonts[0].value)
		}
	}}
>
	<div class="relative">
		<Combobox.Input
			class="input px-9 placeholder:text-base-content"
			oninput={(e) => {
				searchValue = e.currentTarget.value
			}}
		></Combobox.Input>
		<Icon.Type class="absolute start-2 top-1/2 z-20 h-4 -translate-y-1/2" />
		<Combobox.Trigger class="absolute end-2 top-1/2 -translate-y-1/2 touch-none">
			<Icon.ChevronsUpDown class="h-4" />
		</Combobox.Trigger>
	</div>
	<Combobox.Portal>
		<Combobox.Content
			class="menu z-20 rounded-box border border-base-content/10 bg-base-200 p-1 shadow-lg"
		>
			<Combobox.Viewport>
				{#each filteredFonts as font (font.value)}
					<Combobox.Item value={font.value} label={font.label}>
						<div class="btn w-full min-w-50 justify-start btn-ghost data-highlighted:bg-base-300">
							{#if font.value !== "DEFAULT"}
								<span style={`font-family: ${font.value};`}>{font.label}</span>
							{:else}
								{font.label}
							{/if}
						</div>
					</Combobox.Item>
				{:else}
					<span class="p-2">{m.composer_noFontFound()}</span>
				{/each}
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
