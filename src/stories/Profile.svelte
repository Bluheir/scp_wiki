<script lang="ts">
	import type { Profile } from "$lib/components/profile/profile"
	import ProfileC from "$lib/components/profile/Profile.svelte"

	const profile: Profile = $props()
</script>

<ProfileC {profile} />
