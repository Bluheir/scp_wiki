<script lang="ts">
	import { Combobox } from "bits-ui"
	import type { Editor } from "@tiptap/core"
	import * as Icon from "lucide-svelte"
	import { m } from "$lib/paraglide/messages"
	import { slide } from "svelte/transition"

	const {
		editor,
		fonts = [
			"DEFAULT",
			"Arial",
			"monospace",
			"ITC Bauhaus Demi",
			"Courier New",
			"sans-serif",
			"Trebuchet MS",
			"Times New Roman",
			"Garamond",
			"cursive",
			"Noto Sans"
		]
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
		switch (newFontI) {
			case undefined:
			case "":
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
		fontInfo
			.filter(
				(font) =>
					font.value.toLowerCase().includes(searchTextLower) ||
					font.label.toLowerCase().includes(searchTextLower)
			)
			.sort((a, b) => {
				if (a.label === searchValue) {
					return -1
				} else if (b.label === searchValue) {
					return 1
				} else if (searchValue !== "" && a.label.startsWith(searchValue)) {
					return -1
				} else if (searchValue !== "" && b.label.startsWith(searchValue)) {
					return 1
				}

				return a.label.localeCompare(b.label)
			})
	)
</script>

<Combobox.Root
	type="single"
	bind:open
	bind:value={() => currentFont, (newFont) => setFont(newFont)}
	inputValue={searchValue}
	onOpenChangeComplete={(o) => {
		if (filteredFonts.length === 0) {
			setFont(currentFont)
		} else {
			setFont(filteredFonts[0].value)
		}
	}}
>
	<div class="relative">
		<Combobox.Input
			style="font-family: {currentFont};"
			class="input min-w-30 px-9 placeholder:text-base-content"
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
			class="menu z-20 min-w-60 rounded-box border border-base-content/10 bg-base-200 p-1 shadow-lg transition-opacity"
		>
			<Combobox.Viewport>
				{#each filteredFonts as font (font.value)}
					<div transition:slide={{ duration: 300 }}>
						<Combobox.Item
							value={font.value}
							label={font.label}
							class="btn btn-block justify-between font-normal btn-ghost data-highlighted:bg-base-300"
						>
							{#snippet children({ selected })}
								{#if font.value !== "DEFAULT"}
									<span style={`font-family: ${font.value};`}>{font.label}</span>
								{:else}
									{font.label}
								{/if}
								{#if selected}
									<Icon.Check class="w-4" />
								{/if}
							{/snippet}
						</Combobox.Item>
					</div>
				{:else}
					<span class="p-2 h-4">{m.composer_noFontFound()}</span>
				{/each}
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
