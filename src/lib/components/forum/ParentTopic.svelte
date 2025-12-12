<script lang="ts">
	import { Avatar } from "bits-ui"
	import type { ParentTopic } from "./types"
	import { m } from "$lib/paraglide/messages"

	const { topic }: { topic: ParentTopic } = $props()
	const children = $derived(topic.children)
</script>

<div class="p-4 border border-base-content/10 rounded-box text-xs">
	<div class="mb-4">
		<h2 class="text-base font-bold">{topic.title}</h2>
		<p>{topic.description}</p>
	</div>
	<div class="grid grid-cols-4 gap-1 rounded-box shadow-xl">
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_parent_topic()}</div>
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_parent_threadAmount()}</div>
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_parent_postAmount()}</div>
		<div class="flex p-2 justify-center border border-base-content/10 bg-base-300 rounded-box font-bold">{m.topic_parent_lastPoster()}</div>
		{#each children as childTopic}
			<div
				class="flex flex-1 flex-col justify-center rounded-md bg-base-200 px-5 py-3"
			>
				<a href="/topic/{childTopic.id}" class="font-bold">{childTopic.title}</a>
				<div class="mt-1 text-sm">{childTopic.description}</div>
			</div>
			<div
				class="flex flex-1 items-center justify-center rounded-md bg-base-200 text-center"
			>
				{childTopic.threadAmount}
			</div>
			<div
				class="flex flex-1 items-center justify-center rounded-md bg-base-200 text-center"
			>
				{childTopic.postAmount}
			</div>
			<div
				class="flex flex-1 items-center justify-center rounded-md bg-base-200 px-4"
			>
				<a href="/profile/{childTopic.lastAuthor.id}" class="flex items-center justify-center gap-2 w-full">
					<Avatar.Root class="avatar">
						<div class="w-6 rounded-box">
							<Avatar.Image src={childTopic.lastAuthor.profileSrc} />
							<Avatar.Fallback
								class="flex h-full items-center justify-center rounded-box border border-base-content/10 bg-base-200 select-none"
								>{childTopic.lastAuthor.username[0]}</Avatar.Fallback
							>
						</div>
					</Avatar.Root>
					<div class="overflow-hidden text-ellipsis whitespace-nowrap">{childTopic.lastAuthor.username}</div>
				</a>
			</div>
			
		{/each}
	</div>
</div>
