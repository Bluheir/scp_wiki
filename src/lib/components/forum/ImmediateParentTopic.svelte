<script lang="ts">
	import type { ImmediateParentTopic } from "./types"
	import { m } from "$lib/paraglide/messages"
	import UserAvatar from "../UserAvatar.svelte"

	const { topic }: { topic: ImmediateParentTopic } = $props()
	const children = $derived(topic.children)
</script>

<div class="p-4 border border-base-content/10 rounded-box text-xs">
	<div class="mb-4">
		<h2 class="text-base font-bold">{topic.title}</h2>
		<p>{topic.description}</p>
	</div>
	<div class="grid grid-cols-4 gap-1 rounded-box shadow-xl">
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_immediateParent_topic()}</div>
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_immediateParent_threadAmount()}</div>
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_immediateParent_postAmount()}</div>
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_immediateParent_lastPoster()}</div>
		{#each children as postPreview}
			<div
				class="flex flex-1 flex-col justify-center rounded-md bg-base-200 px-5 py-3"
			>
				<a href="/topic/{postPreview.id}" class="font-bold">{postPreview.title}</a>
				<div class="py-1 text-sm">{postPreview.description}</div>
			</div>

			<div class="flex gap-2 items-center justify-center rounded-md bg-base-200">
				<UserAvatar
					user={{
						id: postPreview.startedAuthor.id,
						username: postPreview.startedAuthor.username,
						avatarUrl: postPreview.startedAuthor.profileSrc
					
					}}
					size="sm"
					isLink
				/>
				<a href="/profile/{postPreview.startedAuthor.id}">{postPreview.startedAuthor.username}</a>
				<span>{postPreview.startedDate.toLocaleString()}</span>
			</div>
			
			<span class="flex items-center justify-center rounded-md bg-base-200 text-center">
				{postPreview.postAmount}
			</span>
			
			<div class="flex flex-col gap-1 items-center justify-center bg-base-200">
				<div class="flex gap-1 items-center justify-center">
					<UserAvatar
						user={{
							id: postPreview.lastAuthor.id,
							username: postPreview.lastAuthor.username,
							avatarUrl: postPreview.lastAuthor.profileSrc
						}}
						size="sm"
						isLink
					/>
					<a href="/profile/{postPreview.lastAuthor.id}">{postPreview.lastAuthor.username}</a>					
				</div>
				<span>{postPreview.lastDate.toLocaleString()}</span>
				<a class="underline p-1" href="/post/{postPreview.id}">{m.topic_immediateParent_jump()}</a>
			</div>
		{/each}
	</div>
</div>
