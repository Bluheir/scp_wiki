<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import Profile from "./Profile.svelte"

	const { Story } = defineMeta({
		title: "Base/Profile",
		component: Profile,
		tags: ["autodocs"],
		argTypes: {
			createdAt: { control: "date" }
		}
	})
</script>

<Story
	name="Simple Profile"
	args={{
		id: "019b0225-0298-74c1-9f94-375d66e9a23d",
		pronouns: "she/her",
		createdAt: Date.now(),
		forumRating: 20,
		wikiRating: 5,
		biography:
			"In consequat sagittis diam, vitae suscipit ante feugiat sed. Phasellus consectetur magna non pretium ultrices. In hac habitasse platea dictumst. In elementum libero vel ante sagittis, et tincidunt urna ultricies. Curabitur eu nulla ut erat molestie mollis. In eu massa vitae lorem ultrices rutrum. Ut tristique ac ligula eu hendrerit. Praesent venenatis nunc quis lorem tempor, quis gravida neque porttitor. In hac habitasse platea dictumst. Donec semper magna lectus, nec blandit mi consequat ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur accumsan imperdiet scelerisque. Sed libero turpis, pulvinar vitae suscipit vel, iaculis ut massa. Proin at faucibus turpis, id laoreet dui. Proin posuere convallis neque pretium elementum. Aliquam nec orci erat.",
		avatarUrl: "https://avatars.githubusercontent.com/u/44828102?s=48&v=4",
		username: "TestUserThomas"
	}}
/>
