<script lang="ts">
	import Composer from "./Composer.svelte"
	import ComposerToolbar from "./ComposerToolbar.svelte"
</script>

<div class="h-full overflow-auto relative rounded-[inherit]">
	<Composer>
		{#snippet toolbar({ editor })}
			<div class="sticky top-0 p-2 bg-base-100 z-10">
				<div class="border border-base-content/10 rounded-box p-1">
					<ComposerToolbar {editor} />
				</div>
			</div>
		{/snippet}
	</Composer>
</div>
