<script lang="ts">
	import { Tooltip } from "bits-ui"
	import type { Profile } from "./profile"
	import { m } from "$lib/paraglide/messages"
	import UserAvatar from "../UserAvatar.svelte"
	import { Pencil, Save } from "lucide-svelte"

	let { profile, readonly = false }: { profile: Profile; readonly?: boolean; } = $props()
	let { username, biography, pronouns } = $derived(profile)

	let pronounsVisible = $derived(pronouns.trim().length !== 0)
	let editMode: {
		username: string
		pronouns: string
		biography: string
	} | undefined = $state()
	const totalRating = $derived(profile.wikiRating + profile.forumRating)
</script>

<div
	class="prose max-w-[unset] prose-h2:my-0 prose-h3:mt-4 prose-table:my-4 prose-table:text-base prose-table:text-base-content prose-img:my-0"
>
	<div class="flex items-center gap-4">
		<UserAvatar
			user={{
				id: profile.id,
				username,
				avatarUrl: profile.avatarUrl
			}}
			size="lg"
			style="box"
		/>
		<Tooltip.Provider>
			{#if editMode}
				<input class="input block text-2xl min-w-[unset] font-bold text-base-content" placeholder="Username" bind:value={editMode.username} />
			{:else}
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
			{/if}
			{#if pronounsVisible && !editMode}
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger class="select-all">
					{pronouns}
				</Tooltip.Trigger>
				<Tooltip.Content sideOffset={8}>
					<div
						class="shadow-popover z-0 flex items-center justify-center rounded-box border border-base-content/10 bg-base-200 p-2 text-sm font-medium outline-hidden"
					>
						{m.profile_pronouns()}
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
			{:else if editMode}
				<input class="input w-40" type="text" placeholder={m.profile_pronouns()} bind:value={editMode.pronouns}/>
			{/if}
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
	<section>
		<h3>{m.profile_biography()}</h3>
		{#if editMode}
			<textarea
				class="textarea w-full text-base min-h-80"
				contenteditable="plaintext-only"
				bind:value={editMode.biography}
				placeholder={m.profile_biography()}>
			</textarea>
		{:else}
			<p>{biography}</p>
		{/if}
	</section>
	<div class="my-6 flex gap-2">
		{#if editMode}
			<button class="btn btn-primary btn-sm" onclick={() => {
				username = editMode!.username
				biography = editMode!.biography
				pronouns = editMode!.pronouns
				console.log(biography)
				editMode = undefined
			}}><Save class="w-[1em]"/>Save</button>
		{/if}
		{#if !readonly && !editMode}
			<button class="btn btn-outline btn-sm" onclick={() => { editMode = {
				username,
				pronouns,
				biography
			} }}><Pencil class="w-[1em]"/>Edit profile</button>
		{/if}
		{#if !readonly && editMode}
			<button class="btn btn-error btn-sm" onclick={() => { editMode = undefined }}><Pencil class="w-[1em]"/>Discard changes</button>
		{/if}
	</div>
</div>
