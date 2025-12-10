<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import UserAvatar from "./UserAvatar.svelte"

	const { Story } = defineMeta({
		title: "Base/UserAvatar",
		component: UserAvatar,
		tags: ["autodocs"],
		argTypes: {
			
		}
	})
</script>

<Story
	name="Base UserAvatar"
	args={{
		id: "019b0225-0298-74c1-9f94-375d66e9a23d",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "TestUserThomas",

		size: "base",
		style: "box"
	}}
/>

<Story
	name="Small UserAvatar"
	args={{
		id: "019b0225-0298-74c1-9f94-375d66e9a23d",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "TestUserThomas",

		size: "sm",
		style: "box"
	}}
/>

<Story
	name="Large UserAvatar"
	args={{
		id: "019b0225-0298-74c1-9f94-375d66e9a23d",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "TestUserThomas",

		size: "lg",
		style: "box"
	}}
/>

<Story
	name="Base Circular UserAvatar"
	args={{
		id: "019b0225-0298-74c1-9f94-375d66e9a23d",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "TestUserThomas",

		size: "base",
		style: "circle"
	}}
/>

<Story
	name="Small Circular UserAvatar"
	args={{
		id: "019b0225-0298-74c1-9f94-375d66e9a23d",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "TestUserThomas",

		size: "sm",
		style: "circle"
	}}
/>

<Story
	name="Large Circular UserAvatar"
	args={{
		id: "019b0225-0298-74c1-9f94-375d66e9a23d",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "TestUserThomas",

		size: "lg",
		style: "circle"
	}}
/>