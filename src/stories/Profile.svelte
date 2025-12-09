<script lang="ts">
	import type { Profile } from "$lib/components/profile/profile"
	import ProfileC from "$lib/components/profile/Profile.svelte"

	const profile: {
		id: Profile["id"]
		username: Profile["username"]
		avatarUrl: Profile["avatarUrl"]
		biography: Profile["biography"]
		pronouns: Profile["pronouns"]
		createdAt: number
	} = $props()
</script>

<ProfileC
	profile={{
		...profile,
		createdAt: new Date(profile.createdAt)
	}}
/>
