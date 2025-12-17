<script lang="ts">
	import { Tooltip } from "bits-ui"
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
	let { pronouns, biography, username } = $derived(profile)
	const totalRating = $derived(profile.wikiRating + profile.forumRating)
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
			<UserAvatar user={profile} size="lg" style="box" />
			<Tooltip.Provider>
				<Tooltip.Root delayDuration={200}>
					<Tooltip.Trigger class="select-all">
						<h2>{username}</h2>
					</Tooltip.Trigger>
					<Tooltip.Content sideOffset={8}>
						<div
							class="shadow-popover z-0 flex items-center justify-center rounded-box border border-base-content/10 bg-base-200 p-2 text-sm font-medium outline-hidden"
						>
							{m.profile_username()}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root delayDuration={200}>
					<Tooltip.Trigger class="select-all">
						{pronouns}
					</Tooltip.Trigger>
					<Tooltip.Content sideOffset={8} class="">
						<div
							class="shadow-popover z-0 flex items-center justify-center rounded-box border border-base-content/10 bg-base-200 p-2 text-sm font-medium outline-hidden"
						>
							{m.profile_pronouns()}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root delayDuration={200}>
					<Tooltip.Trigger class="select-all">
						<div class="rounded-box bg-base-200 px-2">{profile.createdAt.toLocaleDateString()}</div>
					</Tooltip.Trigger>
					<Tooltip.Content sideOffset={8}>
						<div
							class="shadow-popover z-0 flex items-center justify-center rounded-box border border-base-content/10 bg-base-200 p-2 text-sm font-medium outline-hidden"
						>
							{m.profile_joined()}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
		{@render ratingTable()}
		<div>
			<h3>{m.profile_biography()}</h3>
			<p>
				{biography}
			</p>
		</div>
		{#if !readonly}
			<div class="my-6 flex gap-2">
				<button
					class="btn btn-outline btn-sm"
					onclick={() => { editMode = true; }}
				>
					<Pencil class="w-[1em]" />
					{m.profile_editProfile()}
				</button>
			</div>
		{/if}
	{:else}
		<ProfileEditC
			{profile}
			onDiscard={() => { editMode = false; }}
			{form}
			{ratingTable}
		/>
	{/if}
</div>
