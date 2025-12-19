<script lang="ts">
	import { type Profile, type ProfileEdit } from "./profile"
	import { m } from "$lib/paraglide/messages"
	import UserAvatar from "../UserAvatar.svelte"
	import { type SuperForm } from "sveltekit-superforms/client"
	import ProfileEditC from "./ProfileEdit.svelte"
	import { Pencil } from "lucide-svelte"

	let {
		profile,
		editMode = $bindable(),
		readonly = true,
		form
	}: {
		profile: Profile
		editMode: boolean
		readonly?: boolean
		form: SuperForm<ProfileEdit>
	} = $props()
	const totalRating = $derived(profile.wikiRating + profile.forumRating)

	const pronouns = $derived(profile.pronouns.trim())
</script>

{#snippet ratingTable()}
	<table>
		<thead>
			<tr>
				<th>{m.profile_forumRating()}</th>
				<th>{m.profile_wikiRating()}</th>
				<th>{m.profile_totalRating()}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{profile.forumRating}</td>
				<td>{profile.wikiRating}</td>
				<td>{totalRating}</td>
			</tr>
		</tbody>
	</table>
{/snippet}

<div
	class="prose max-w-[unset] prose-h2:my-0 prose-h3:mt-4 prose-table:my-4 prose-table:text-base prose-table:text-base-content prose-img:my-0"
>
	{#if !editMode}
		<div class="flex items-center gap-4">
			<div class="tooltip tooltip-info" data-tip={m.profile_avatar()}>
				<UserAvatar user={profile} size="lg" style="box" />
			</div>
			<div class="tooltip cursor-default tooltip-info" data-tip={m.profile_username()}>
				<h2 data-testid="profile-username">{profile.username}</h2>
			</div>
			{#if pronouns.length !== 0}
				<div class="tooltip cursor-default tooltip-info" data-tip={m.profile_pronouns()}>
					<span data-testid="profile-pronouns">{pronouns}</span>
				</div>
			{/if}
			<div class="tooltip cursor-default tooltip-info" data-tip={m.profile_joined()}>
				{profile.createdAt.toLocaleDateString()}
			</div>
		</div>
		{@render ratingTable()}
		<div>
			<h3>{m.profile_biography()}</h3>
			<p data-testid="profile-biography">
				{profile.biography}
			</p>
		</div>
		{#if !readonly}
			<div class="my-6 flex gap-2">
				<button
					type="button"
					class="btn btn-outline btn-sm"
					onclick={() => {
						editMode = true
					}}
					data-testid="profile-edit"
				>
					<Pencil class="w-[1em]" />
					{m.profile_editProfile()}
				</button>
			</div>
		{/if}
	{:else}
		<ProfileEditC
			{profile}
			onDiscard={() => {
				editMode = false
			}}
			{form}
			{ratingTable}
		/>
	{/if}
</div>
