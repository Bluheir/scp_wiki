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
		replyAble = true,
		deleteAble = true,
		editAble = true,
		rating = $bindable(),
		myRating = $bindable()
	}: {
		id: string
		text: string
		authorId: string
		authorProfileSrc?: string
		authorUsername: string
		created: number
		replyAble?: boolean,
		deleteAble?: boolean,
		editAble?: boolean,
		rating: number
		myRating: MyRating
	} = $props()
</script>
<Post
	post={{
		id,
		text,
		authorId,
		authorProfileSrc,
		authorUsername,
		created: new Date(created),
		rating,
		myRating,
		setMyRating: async (newRating) => {
			rating += newRating - myRating
			myRating = newRating
		}
	}}
	actionItems={{
		replyAble,
		deleteAble,
		editAble
	}}
/>
