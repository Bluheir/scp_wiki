<script lang="ts">
	import { Avatar, Tooltip } from "bits-ui"
	import type { Profile } from "./profile"

	let { profile, readonly = true }: { profile: Profile; readonly?: boolean } = $props()
</script>

<div class="prose max-w-[unset] prose-h2:my-0 prose-img:my-0 prose-h3:mt-4">
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
				<Tooltip.Content
					sideOffset={8}
				>
					<div
						class="rounded-box border-base-content/10 bg-base-200 shadow-popover z-0 flex items-center justify-center border p-2 text-sm font-medium outline-hidden"
					>
						Username
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger class="select-all">
					{profile.pronouns}
				</Tooltip.Trigger>
				<Tooltip.Content
					sideOffset={8}
				>
					<div
						class="rounded-box border-base-content/10 bg-base-200 shadow-popover z-0 flex items-center justify-center border p-2 text-sm font-medium outline-hidden"
					>
						Pronouns
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger class="select-all">
					<div class="bg-base-200 rounded-box px-2">{profile.createdAt.toLocaleDateString()}</div>
				</Tooltip.Trigger>
				<Tooltip.Content
					sideOffset={8}
				>
					<div
						class="rounded-box border-base-content/10 bg-base-200 shadow-popover z-0 flex items-center justify-center border p-2 text-sm font-medium outline-hidden"
					>
						Joined
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
	<div class="mx-2">
		<h3>Biography</h3>
		<p class="rounded-box">
			{profile.biography}
		</p>
	</div>
</div>
