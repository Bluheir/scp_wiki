<script lang="ts">
	import { Avatar, Separator } from "bits-ui"
	import type { Post } from "./post"

	const { post }: { post: Post } = $props()
</script>

<div class="rounded-box border border-base-content/10 p-4">
	<div class="flex items-center gap-4">
		<Avatar.Root class="avatar">
			<div class="w-12 rounded">
				<Avatar.Image src={post.authorProfileSrc} />
				<Avatar.Fallback>S1</Avatar.Fallback>
			</div>
		</Avatar.Root>
		<div class="text-lg font-bold">{post.authorUsername}</div>
	</div>
	<Separator.Root
		class="my-4 h-px bg-base-content/10 [orientation='vertical']:h-full"
		orientation="horizontal"
	/>
	<div>
		{post.text}
	</div>
</div>
