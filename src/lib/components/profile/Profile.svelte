<script lang="ts">
	import { Avatar, Tooltip } from "bits-ui"
	import type { Profile } from "./profile"
	import { m } from "$lib/paraglide/messages"

	let { profile, readonly = true }: { profile: Profile; readonly?: boolean } = $props()
	const totalRating = $derived(profile.wikiRating + profile.forumRating)
</script>

<div
	class="prose max-w-[unset] prose-h2:my-0 prose-h3:mt-4 prose-table:my-4 prose-table:text-base prose-table:text-base-content prose-img:my-0"
>
	<div class="flex items-center gap-4">
		<Avatar.Root class="avatar">
			<div class="w-15 rounded-box">
				<Avatar.Image src={profile.avatarUrl} />
				<Avatar.Fallback
					class="flex h-full items-center justify-center rounded-[inherit] border border-base-content/10 bg-base-200 select-none"
					>{profile.username[0]}</Avatar.Fallback
				>
			</div>
		</Avatar.Root>
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger class="select-all">
					<h2>{profile.username}</h2>
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
					{profile.pronouns}
				</Tooltip.Trigger>
				<Tooltip.Content sideOffset={8}>
					<div
						class="shadow-popover z-0 flex items-center justify-center rounded-box border border-base-content/10 bg-base-200 p-2 text-sm font-medium outline-hidden"
					>
						Pronouns
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
	<div>
		<h3>{m.profile_biography()}</h3>
		<p>
			{profile.biography}
		</p>
	</div>
</div>
