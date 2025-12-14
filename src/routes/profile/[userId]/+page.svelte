<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte"
	import Profile from "$lib/components/profile/Profile.svelte"
	import { onDestroy, onMount } from "svelte"
	import type { PageProps } from "./$types"
	import type { RealtimeChannel } from "@supabase/supabase-js"

	const { data }: PageProps = $props()
	let { profile, supabase, readonly } = $derived(data)
	const profileEdit = $derived({ username: profile.username, biography: profile.biography, pronouns: profile.pronouns })
	let channel: RealtimeChannel | undefined

	onMount(() => {
		channel = supabase
			.channel("profile-changes")
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "profile",
					filter: `id=eq.${profile.id}`
				},
				(payload) => {
					const { new: data } = payload
					profile = {
						...profile,
						username: data.username,
						avatarUrl: data.avatar_url ?? undefined,
						pronouns: data.pronouns,
						biography: data.biography,
						forumRating: data.forum_rating,
						wikiRating: data.wiki_rating
					}
				}
			).subscribe()
	})
	onDestroy(async () => {
		await channel?.unsubscribe()
	})
</script>

<Navbar />

<div class="mx-20 my-10 rounded-box border border-base-content/10 p-8 shadow-xl">
	<Profile {profile} {readonly} onSubmit={async data => {
		if(!readonly) {
			const result = await supabase
				.from("profile")
				.update({
					biography: data.biography,
					username: data.username,
					pronouns: data.pronouns
				})
				.eq("id", profile.id)
				.select("*")
			
			if(!result.error) {
				return data
			}
		}

		return profileEdit
	}} />
</div>
