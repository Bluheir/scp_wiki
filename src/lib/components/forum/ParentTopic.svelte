<script lang="ts">
	import type { ParentTopic } from "./types"
	import { m } from "$lib/paraglide/messages"
	import UserAvatar from "../UserAvatar.svelte"

	const { topic }: { topic: ParentTopic } = $props()
	const children = $derived(topic.children)
</script>

<div class="rounded-box border border-base-content/10 p-4 text-xs">
	<div class="mb-4">
		<h2 class="text-base font-bold">{topic.title}</h2>
		<p>{topic.description}</p>
	</div>
	<div class="grid grid-cols-4 gap-1 rounded-box shadow-xl">
		<div
			class="flex justify-center rounded-box border border-base-content/10 bg-base-300 p-2 font-bold"
		>
			{m.topic_parent_topic()}
		</div>
		<div
			class="flex justify-center rounded-box border border-base-content/10 bg-base-300 p-2 font-bold"
		>
			{m.topic_parent_threadAmount()}
		</div>
		<div
			class="flex justify-center rounded-box border border-base-content/10 bg-base-300 p-2 font-bold"
		>
			{m.topic_parent_postAmount()}
		</div>
		<div
			class="flex justify-center rounded-box border border-base-content/10 bg-base-300 p-2 font-bold"
		>
			{m.topic_parent_lastPoster()}
		</div>
		{#each children as childTopic}
			<div class="flex flex-1 flex-col justify-center rounded-md bg-base-200 px-5 py-3">
				<a href="/topic/{childTopic.id}" class="font-bold">{childTopic.title}</a>
				<div class="py-1 text-sm">{childTopic.description}</div>
			</div>
			<div class="flex flex-1 items-center justify-center rounded-md bg-base-200 text-center">
				{childTopic.threadAmount}
			</div>
			<div class="flex flex-1 items-center justify-center rounded-md bg-base-200 text-center">
				{childTopic.postAmount}
			</div>

			<div class="flex flex-col items-center justify-center gap-1 bg-base-200">
				<div class="flex items-center justify-center gap-1">
					<UserAvatar
						user={{
							id: childTopic.lastAuthor.id,
							username: childTopic.lastAuthor.username,
							avatarUrl: childTopic.lastAuthor.profileSrc
						}}
						size="sm"
						isLink
					/>
					<a href="/profile/{childTopic.lastAuthor.id}">{childTopic.lastAuthor.username}</a>
				</div>
				<span>{childTopic.lastDate.toLocaleString()}</span>
				<a class="p-1 underline" href="/post/{childTopic.id}">Jump!</a>
			</div>
		{/each}
	</div>
</div>
