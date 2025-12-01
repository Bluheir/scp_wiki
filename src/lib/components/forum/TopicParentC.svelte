<script lang="ts">
    import { Avatar } from "bits-ui";
	import type { ParentTopic, SubTopic } from "./types"
    const { topic }: { topic: ParentTopic } = $props()
    const children: SubTopic[] = $derived(topic.children)
</script>

<div class="">
    <div class="border border-base-content/10 p-4">
        <h2 class="font-bold text-xl">{topic.title}</h2>
        <p>{topic.description}</p>
    </div>
    <div class="flex">
        <div class="border border-base-content/10 flex-1 p-5 font-bold">Category Name</div>
        <div class="border border-base-content/10 flex-1 p-5 font-bold text-center">Threads</div>
        <div class="border border-base-content/10 flex-1 p-5 font-bold text-center">Posts</div>
        <div class="border border-base-content/10 flex-1 p-5 font-bold text-center">Last</div>
    </div>
        {#each children as post}
            <div class="flex">
                <div class="border border-base-content/10 flex-1 p-5">
                    <div class="font-bold">{post.title}</div>
                    <div>{post.description}</div>
                </div> <!--Category name & description, called category name-->
                <div class="border border-base-content/10 flex-1 p-5 text-center flex items-center justify-center">{post.threadAmount}</div> <!--Threads-->
                <div class="border border-base-content/10 flex-1 p-5 text-center flex items-center justify-center">{post.postAmount}</div> <!--Posts-->
                <div class="border border-base-content/10 flex-1 p-5">
                    <div class="flex gap-1 items-center justify-center">
                        <div>by</div>
                        <Avatar.Root class="avatar">
                            <div class="w-5 rounded-box">
                                <Avatar.Image src={post.lastPoster.profileSrc} />
                                <Avatar.Fallback
                                    class="flex h-full items-center justify-center rounded-box border border-base-content/10 bg-base-200 select-none"
                                    >{post.lastPoster.username}</Avatar.Fallback
                                >
                            </div>
                        </Avatar.Root>
                        <div>{post.lastPoster.username}</div>
                    </div>
                </div> <!--Last Post-->
            </div>
        {/each}
</div>