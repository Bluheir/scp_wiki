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
			rating: { control: "number" },
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
		myRating: 0,
		rating: 2,
		authorProfileSrc: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		authorUsername: "TestUserThomas",
		setMyRating: async (r) => r,
		created: new Date()
	}}
/>
