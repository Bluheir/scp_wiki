<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte"
	import Profile from "$lib/components/profile/Profile.svelte"
	import { onDestroy, onMount } from "svelte"
	import type { PageProps } from "./$types"
	import type { RealtimeChannel } from "@supabase/supabase-js"
	import { zod4Client } from "sveltekit-superforms/adapters"
	import { superForm } from "sveltekit-superforms"
	import { profileSchema } from "$lib/components/profile/profile"
	import { toast } from "svelte-sonner"
	import { m } from "$lib/paraglide/messages"

	const { data }: PageProps = $props()
	let { profile, supabase, readonly } = $derived(data)

	let editMode = $state(false)

	const form = $derived(
		superForm(data.form, {
			dataType: "json",
			validators: zod4Client(profileSchema),
			onUpdated: () => {
				editMode = false
			},
			onError({ result }) {
				if (!result.status) {
					return
				}

				switch (result.status) {
					case 400:
						if ("code" in result.error && result.error.code === "bad_crop") {
							toast.error(m.profile_avatar_badCrop(), { class: "alert alert-error" })
						}
						break
					case 403:
						toast.error(m.profile_noPermission(), { class: "alert alert-error" })
						break
					case 500:
						toast.error(m.generic_error500(), { class: "alert alert-error" })
						break
				}
			}
		})
	)

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
			)
			.subscribe()
	})
	onDestroy(async () => {
		await channel?.unsubscribe()
	})
</script>

<Navbar />

<div class="mx-20 my-10 rounded-box border border-base-content/10 p-8 shadow-xl">
	<Profile {profile} bind:editMode {readonly} {form} />
</div>
