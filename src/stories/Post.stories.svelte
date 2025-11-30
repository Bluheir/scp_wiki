<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import Post from "$lib/components/forum/Post.svelte"

	const { Story } = defineMeta({
		title: "Forum/Post",
		component: Post,
		tags: ["autodocs"],
		argTypes: {
			authorUsername: { control: "text" },
			authorProfileSrc: { control: "text" },
			created: { control: "date" },
			text: { control: "text" },
			id: { table: { disable: true } },
			authorId: { table: { disable: true } }
		}
	})
</script>

<Story
	name="Simple Post"
	args={{
		id: "1",
		text: "Hello, this is a post!",
		authorId: "2",
		authorProfileSrc: "https://placekitten.com/100/100",
		authorUsername: "TestUserThomas",
		created: new Date()
	}}
/>
