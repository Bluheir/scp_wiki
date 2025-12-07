<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import Navbar from "./Navbar.svelte"

	const { Story } = defineMeta({
		title: "Base/Navbar",
		component: Navbar,
		tags: ["autodocs"],
		argTypes: {
			id: { table: { disable: true } },
			avatarUrl: { control: "text" },
			username: { control: "text" }
		}
	})
</script>

<Story name="Signed out Navbar" args={{}} />

<Story
	name="Signed in Navbar"
	args={{
		id: "1",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "HumanBeing123"
	}}
/>
