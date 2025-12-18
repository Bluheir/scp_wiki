<script lang="ts">
	import "./layout.css"
	import "$lib/fonts.css"
	import favicon from "$lib/assets/favicon.svg"
	import { Toaster } from "svelte-sonner"

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster toastOptions={{
	unstyled: true
}}/>

{@render children()}
