<script lang="ts">
	import { zod4Client } from "sveltekit-superforms/adapters"
	import type { PageData } from "./$types"
	import { registerSchema } from "$lib/schema/auth"
	import { superForm } from "sveltekit-superforms"

	let { data }: { data: PageData } = $props()

	const form = superForm(data.form, {
		validators: zod4Client(registerSchema)
	})
	const { form: formData, enhance } = form
</script>
