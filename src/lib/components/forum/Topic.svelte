<script lang="ts">
	import ImmediateParentTopic from "./ImmediateParentTopic.svelte"
	import ParentTopic from "./ParentTopic.svelte"
	import type { Topic } from "./types"

	const { topic }: { topic: Topic } = $props()
</script>

{#if topic.type === "immediateParent"}
	<ImmediateParentTopic {topic} />
{:else}
	<ParentTopic {topic} />
{/if}
