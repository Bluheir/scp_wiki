<script lang="ts">
	import { signInSchema } from "$lib/schema/auth"
	import { Control, Description, Label, Field, FieldErrors } from "formsnap"
	import { superForm } from "sveltekit-superforms"
	import { zod4Client } from "sveltekit-superforms/adapters"
	import type { PageData } from "./$types"
	import { Asterisk, Key, Lock, Mail, User } from "lucide-svelte"

	let { data }: { data: PageData } = $props()

	const form = superForm(data.form, {
		validators: zod4Client(signInSchema)
	})
	const { form: formData, enhance } = form
</script>

<div class="relative w-full flex justify-center my-[min(10rem,10%)]">
	<div class="absolute top-[-25%]">
		<svg version="1.1" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text-base-content h-180">
			<circle cx="67.7" cy="71.5" r="33" fill="none" stroke="currentColor" stroke-width="6"/>
			<path d="m51.9 11.9h31.7l3.07 11.4.944.391c19.4 8.03 32 26.9 32 47.9 0 2.26-.149 4.53-.445 6.77l-.133 1.01 8.37 8.37-15.8 27.4-11.4-3.06-.809.623c-9.06 6.95-20.2 10.7-31.6 10.7-11.4 6e-5-22.5-3.77-31.6-10.7l-.81-.623-11.4 3.06-15.8-27.4 8.37-8.37-.133-1.01c-.296-2.25-.445-4.51-.445-6.77.000141-21 12.6-39.9 32-47.9l.944-.391z" fill="none" stroke="currentColor" stroke-width="4"/>
			<path id="b" d="m64.7 30.6v24h-5.08l8.08 14 8.08-14h-5.08l-.000265-24h-5.99" stroke="none" fill="currentColor"/>
			<use id="a" transform="rotate(120 67.7 71.5)" xlink:href="#b"/>
			<use transform="rotate(120 67.7 71.5)" xlink:href="#a"/>
		</svg>
	</div>
	<form class="card border border-base-content/10 rounded-box p-8 shadow gap-y-1 bg-base-200/80 w-fit z-20" method="POST" use:enhance>
		<h1 class="text-3xl font-bold">{"Welcome, Doctor [REDACTED]"}</h1>
		<p class="mb-2">Please sign in.</p>
		<Field {form} name="email">
			<Control>
				{#snippet children({ props })}
					<Label>Email</Label>
					<input class="input" {...props} bind:value={$formData.email} placeholder="Email" />
				{/snippet}
			</Control>
			<Description>Email address for the account.</Description>
			<FieldErrors />
		</Field>
		<Field {form} name="password">
			<Control>
				{#snippet children({ props })}
					<Label>Password</Label>
					<input class="input" {...props} type="password" bind:value={$formData.password} placeholder="Password" />
				{/snippet}
			</Control>
			<Description>Password to access the account.</Description>
			<FieldErrors />
		</Field>
		<input class="btn btn-primary w-full" type="submit" />
	</form>
</div>
