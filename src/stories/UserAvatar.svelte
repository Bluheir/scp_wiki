<script lang="ts">
	import UserAvatar from "$lib/components/UserAvatar.svelte"

	const props: {
		id: string
		username: string
		avatarUrl?: string

		isLink?: boolean
		size?: "sm" | "base" | "lg"
		style?: "circle" | "box"
	} = $props()
</script>

<UserAvatar user={props} isLink={props.isLink} size={props.size} style={props.style} />
