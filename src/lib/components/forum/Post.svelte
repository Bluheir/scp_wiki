<script lang="ts">
	import { Avatar, Separator } from "bits-ui"
	import type { Post } from "./post"
	import { ChevronDown, ChevronUp, Pencil, Reply, X } from "lucide-svelte"
	import { m } from "$lib/paraglide/messages"

	const { post, actionItems }: {
		post: Post,
		actionItems: {
			replyAble: boolean,
			editAble: boolean,
			deleteAble: boolean
		}
	} = $props()
	let myRating = $derived(post.myRating)
	let rating = $derived(post.rating ?? 0)

	async function setNewRating(newRating: -1 | 0 | 1) {
		rating += newRating - myRating
		myRating = newRating

		await post.setMyRating(newRating)
		rating = post.rating
		myRating = post.myRating
	}

	function segmentNumber(n: number): string[] {
		const s = String(n);
		const out: string[] = [];

		let i = s.length;
		while (i > 3) {
			const end = i;
			const start = i - 3;
			out.unshift(s.slice(start, end));
			out.unshift(",");
			i -= 3;
		}

		out.unshift(s.slice(0, i));
		return out;
	}
</script>

<div class="rounded-box border border-base-content/10 p-4 transition hover:shadow-lg">
	<div class="flex items-center gap-4">
		<div class="flex items-center flex-col">
			<button class="btn btn-square btn-xs {myRating === 1 ? "text-primary" : "btn-ghost"}" onclick={async () => {
				if(myRating === 1) {
					await setNewRating(0)
				} else {
					await setNewRating(1)
				}
			}} title={m.forum_post_upvote()}><ChevronUp /></button>
			<div>
				{#each segmentNumber(rating) as segment, index}
					{#if segment === ","}
						{segment}
					{:else}
						<span class="countdown"><span style="--value:{segment};{index === 0 ? "" : "--digits:3;"}">{segment}</span></span>
					{/if}
				{/each}
			</div>
			<button class="btn btn-square btn-xs {myRating === -1 ? "text-primary" : "btn-ghost"}" onclick={async () => {
				if(myRating === -1) {
					await setNewRating(0)
				} else {
					await setNewRating(-1)
				}
			}} title={m.forum_post_downvote()}><ChevronDown /></button>
		</div>
		<Avatar.Root class="avatar">
			<div class="w-12 rounded-box">
				<Avatar.Image src={post.authorProfileSrc} />
				<Avatar.Fallback class="select-none h-full flex justify-center items-center border border-base-content/10 rounded-box bg-base-200">{post.authorUsername[0]}</Avatar.Fallback>
			</div>
		</Avatar.Root>
		<div class="text-lg font-bold">{post.authorUsername}</div>
	</div>
	<div class="text-xs text-base-content/90 my-2">{post.created.toLocaleString()}</div>
	<Separator.Root
		class="my-4 h-px bg-base-content/10 [orientation='vertical']:h-full"
		orientation="horizontal"
	/>
	<div>
		<div class="my-4">
			{post.text}
		</div>
		<div class="flex gap-2">
			{#if actionItems.replyAble}
				<button class="btn btn-xs gap-1 transition" title={m.forum_post_reply()}><Reply class="w-[1.5em]" />{m.forum_post_reply()}</button>
			{/if}
			{#if actionItems.editAble}
				<button class="btn btn-xs gap-1 transition" title={m.forum_post_edit()}><Pencil class="w-[1.4em]" />{m.forum_post_edit()}</button>
			{/if}
			{#if actionItems.deleteAble}
				<button class="btn btn-xs btn-error gap-1 transition" title={m.forum_post_delete()}><X class="w-[1.5em]" />{m.forum_post_delete()}</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.countdown {
		& > * {
			&:after, &:before {
				transition: all 0.3s cubic-bezier(1, 0, 0, 1), width 0.2s ease-out 0.2s, opacity 0.2s ease-out 0.2s;
			}
		}
	}
</style>