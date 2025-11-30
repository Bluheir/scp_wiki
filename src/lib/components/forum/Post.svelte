<script lang="ts">
	import { Avatar, Separator } from "bits-ui"
	import type { Post } from "./post"
	import { ChevronDown, ChevronUp, Pencil, Reply, X } from "lucide-svelte"

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

	$effect(() => {
		console.log(post.created)
	})
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
			}}><ChevronUp /></button>
			<div aria-label="{rating.toString()}" class="select-none">{rating.toLocaleString()}</div>
			<button class="btn btn-square btn-xs {myRating === -1 ? "text-primary" : "btn-ghost"}" onclick={async () => {
				if(myRating === -1) {
					await setNewRating(0)
				} else {
					await setNewRating(-1)
				}
			}}><ChevronDown /></button>
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
				<button class="btn btn-xs gap-1 transition"><Reply class="w-[1.5em]" />Reply</button>
			{/if}
			{#if actionItems.editAble}
				<button class="btn btn-xs gap-1 transition"><Pencil class="w-[1.4em]" />Edit</button>
			{/if}
			{#if actionItems.deleteAble}
				<button class="btn btn-xs btn-error gap-1 transition"><X class="w-[1.5em]" />Delete</button>
			{/if}
		</div>
	</div>
</div>
