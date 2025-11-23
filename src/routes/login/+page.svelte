<script lang="ts">
	import { signInSchema } from "$lib/schema/auth"
	import { Control, Description, Label, Field, FieldErrors } from "formsnap"
	import { m } from "$lib/paraglide/messages"
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

<div class="flex justify-center py-40 select-none">
	<div class="px-8 py-4 hover:shadow-2xl transition rounded-box bg-base-200 flex border border-base-content/10 w-230 gap-6">
		<form method="POST" use:enhance class="card w-sm gap-y-1.5 py-4">
			<h1 class="bold text-2xl font-bold">{m.login_welcomeBack()}</h1>
			<Field {form} name="email">
				<Control>
					{#snippet children({ props })}
						<Label class="label text-xs">{m.auth_email()}</Label>
						<label class="input input-sm w-full">
							<Mail class="h-[1em] text-sm" />
							<input type="email" {...props} bind:value={$formData.email} placeholder="{m.auth_email()}" />
						</label>
					{/snippet}
				</Control>
				<Description class="text-xs">{m.auth_emailDescription()}</Description>
				<FieldErrors class="text-xs text-error"/>
			</Field>
			<Field {form} name="password">
				<Control>
					{#snippet children({ props })}
						<Label class="label text-xs">{m.auth_password()}</Label>
						<label class="input input-sm w-full">
							<Lock class="h-[1em] text-sm"/>
							<input type="password" {...props} bind:value={$formData.password} placeholder={m.auth_password()} />
						</label>
					{/snippet}
				</Control>
				<Description class="text-xs">{m.auth_passwordDescription()}</Description>
				<FieldErrors class="text-xs text-error"/>
			</Field>
			<input class="btn btn-primary btn-sm" type="submit" value={m.login_signIn()} />
		</form>
		<div class="h-full w-[0.5px] bg-base-content/10"></div>
		<div class="flex items-center gap-3">
			<svg version="1.1" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text-base-content h-40">
				<circle cx="67.7" cy="71.5" r="33" fill="none" stroke="currentColor" stroke-width="6"/>
				<path d="m51.9 11.9h31.7l3.07 11.4.944.391c19.4 8.03 32 26.9 32 47.9 0 2.26-.149 4.53-.445 6.77l-.133 1.01 8.37 8.37-15.8 27.4-11.4-3.06-.809.623c-9.06 6.95-20.2 10.7-31.6 10.7-11.4 6e-5-22.5-3.77-31.6-10.7l-.81-.623-11.4 3.06-15.8-27.4 8.37-8.37-.133-1.01c-.296-2.25-.445-4.51-.445-6.77.000141-21 12.6-39.9 32-47.9l.944-.391z" fill="none" stroke="currentColor" stroke-width="4"/>
				<path id="b" d="m64.7 30.6v24h-5.08l8.08 14 8.08-14h-5.08l-.000265-24h-5.99" stroke="none" fill="currentColor"/>
				<use id="a" transform="rotate(120 67.7 71.5)" xlink:href="#b"/>
				<use transform="rotate(120 67.7 71.5)" xlink:href="#a"/>
			</svg>
			<div class="grow">
				<span class="text-4xl font-bauhaus">SCP Foundation</span>
				<br/>
				<span class="text-xl">Secure Contain Protect</span>
			</div>
		</div>
	</div>
</div>
