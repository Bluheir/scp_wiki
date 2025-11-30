<script lang="ts">
	import type { MyRating } from "$lib/components/forum/post"
	import Post from "$lib/components/forum/Post.svelte"

	let {
		id,
		text,
		authorId,
		authorProfileSrc,
		authorUsername,
		created,
		rating = $bindable(),
		myRating = $bindable()
	}: {
		id: string
		text: string
		authorId: string
		authorProfileSrc?: string
		authorUsername: string
		created: number
		rating: number
		myRating: MyRating
	} = $props()
</script>

<Post
	{id}
	{text}
	{authorId}
	{authorProfileSrc}
	{authorUsername}
	created={new Date(created)}
	{rating}
	{myRating}
	setMyRating={async (newRating) => {
		rating += newRating - myRating
		myRating = newRating
	}}
/>
