<script lang="ts">
	import { signInSchema } from "$lib/schema/auth"
	import { Control, Description, Label, Field, FieldErrors } from "formsnap"
	import { m } from "$lib/paraglide/messages"
	import { superForm } from "sveltekit-superforms"
	import { zod4Client } from "sveltekit-superforms/adapters"
	import type { PageData } from "./$types"
	import { Lock, Mail } from "lucide-svelte"
	import SCPEmblem from "$lib/icons/SCPEmblem.svelte"

	let { data }: { data: PageData } = $props()

	const form = superForm(data.form, {
		validators: zod4Client(signInSchema)
	})
	const { form: formData, enhance } = form
</script>

<div class="flex justify-center py-40 select-none">
	<div class="px-6 py-4 shadow-2xl transition rounded-box bg-base-200 flex border border-base-content/10 gap-6 font-mono">
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
		<div class="flex items-center rounded-box">
			<div class="flex items-center gap-4">
				<SCPEmblem class="text-base-content h-40 motion-safe:animate-spin-slow"/>
				<div class="grow">
					<h2 class="text-4xl font-bauhaus">SCP Foundation</h2>
					<h3 class="text-xl">Secure Contain Protect</h3>
				</div>
			</div>
		</div>
	</div>
</div>
