<script lang="ts">
    import { Avatar } from "bits-ui";
    import type { ParentTopic, SubTopic } from "./types"
    const { topic }: { topic: ParentTopic } = $props()
    const children: SubTopic[] = $derived(topic.children)
</script>

<div>
    <div class="border border-base-content/10 p-4 bg-primary">
        <h2 class="font-bold text-xl">{topic.title}</h2>
        <p>{topic.description}</p>
    </div>
    <!-- Header Row - Reduced padding and consistent vertical alignment -->
    <div class="flex bg-base-content/10 gap-2">
        <div class="flex-1 py-3 px-5 font-bold flex items-center">Thread name</div>
        <div class="flex-1 py-3 px-5 font-bold text-center flex items-center justify-center">Started</div>
        <div class="flex-1 py-3 px-5 font-bold text-center flex items-center justify-center">Posts</div>
        <div class="flex-1 py-3 px-5 font-bold text-center flex items-center justify-center">Recent post</div>
    </div>
    
    <!-- Content Rows -->
    {#each children as post}
        <div class="flex bg-base-content/15 gap-2 p-1">
            <div class="border bg-base-content/9 border-base-content/10 rounded-md flex-1 py-3 px-5 flex flex-col justify-center">
                <a href="{post.url}" class="font-bold hover:underline">{post.title}</a>
                <div class="text-sm mt-1">{post.description}</div>
            </div>
            <div class="border bg-base-content/9 border-base-content/10 rounded-md flex-1 py-3 px-5 text-center flex items-center justify-center">{post.threadAmount}</div>
            <div class="border bg-base-content/9 border-base-content/10 rounded-md flex-1 py-3 px-5 text-center flex items-center justify-center">{post.postAmount}</div>
            <div class="border bg-base-content/9 border-base-content/10 rounded-md flex-1 py-3 px-5 flex items-center justify-center">
                <div class="flex gap-1 items-center">
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
            </div>
        </div>
    {/each}
</div>