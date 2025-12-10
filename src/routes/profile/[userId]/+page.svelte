<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte"
	import Profile from "$lib/components/profile/Profile.svelte"
	import type { PageProps } from "./$types"

	const { data }: PageProps = $props()
</script>

<Navbar />

<div class="mx-20 my-10 border border-base-content/10 p-8 rounded-box shadow-xl">
	<Profile
		profile={data.profile}
	/>
</div>