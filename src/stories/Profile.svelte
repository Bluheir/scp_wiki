<script lang="ts">
	import type { Profile } from "$lib/components/profile/profile"
	import ProfileC from "$lib/components/profile/Profile.svelte"

	const props: {
		id: Profile["id"]
		username: Profile["username"]
		avatarUrl: Profile["avatarUrl"]
		biography: Profile["biography"]
		pronouns: Profile["pronouns"]
		forumRating: Profile["forumRating"]
		wikiRating: Profile["wikiRating"]
		createdAt: number
		readonly: boolean
	} = $props()
</script>

<ProfileC
	profile={{
		...props,
		createdAt: new Date(props.createdAt)
	}}
	readonly={props.readonly}
/>
