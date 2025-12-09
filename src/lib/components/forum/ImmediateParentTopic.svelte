<script lang="ts">
	import { Avatar } from "bits-ui"
	import type { ImmediateParentTopic } from "./types"
	const { topic }: { topic: ImmediateParentTopic } = $props()
	const children = $derived(topic.children)
</script>

<div>
	<div class="border border-base-content/10 bg-primary p-4">
		<h2 class="text-xl font-bold">{topic.title}</h2>
		<p>{topic.description}</p>
	</div>
	<!-- Header Row - Reduced padding and consistent vertical alignment -->
	<div class="flex gap-2 bg-base-content/10">
		<div class="flex flex-1 items-center px-5 py-3 font-bold">Thread name</div>
		<div class="flex flex-1 items-center justify-center px-5 py-3 text-center font-bold">
			Started
		</div>
		<div class="flex flex-1 items-center justify-center px-5 py-3 text-center font-bold">Posts</div>
		<div class="flex flex-1 items-center justify-center px-5 py-3 text-center font-bold">
			Recent post
		</div>
	</div>

	<!-- Content Rows -->
	{#each children as post}
		<div class="flex gap-2 bg-base-content/15 p-1">
			<div
				class="flex flex-1 flex-col justify-center rounded-md border border-base-content/10 bg-base-content/9 px-5 py-3"
			>
				<a href="/posts/{post.id}" class="font-bold hover:underline">{post.title}</a>
				<div class="mt-1 text-sm">{post.preview}</div>
			</div>
			<div
				class="flex flex-1 items-center justify-center rounded-md border border-base-content/10 bg-base-content/9 px-5 py-3 text-center"
			>
				{post.repliesAmount}
			</div>
			<div
				class="flex flex-1 items-center justify-center rounded-md border border-base-content/10 bg-base-content/9 px-5 py-3"
			>
				<div class="flex items-center gap-1">
					<div>by</div>
					<Avatar.Root class="avatar">
						<div class="w-5 rounded-box">
							<Avatar.Image src={post.lastReply.profileSrc} />
							<Avatar.Fallback
								class="flex h-full items-center justify-center rounded-box border border-base-content/10 bg-base-200 select-none"
								>{post.lastReply.username}</Avatar.Fallback
							>
						</div>
					</Avatar.Root>
					<div>{post.lastReply.username}</div>
				</div>
			</div>
		</div>
	{/each}
</div>
