<script lang="ts">
	import { zod4Client } from "sveltekit-superforms/adapters"
	import type { PageData } from "./$types"
	import { registerSchema } from "$lib/schema/auth"
	import { superForm } from "sveltekit-superforms"
	import { Control, Description, Field, FieldErrors, Label } from "formsnap"
	import { Mail, Lock, User } from "lucide-svelte"
	import SCPEmblem from "$lib/icons/SCPEmblem.svelte"
	import { m } from "$lib/paraglide/messages"

	let { data }: { data: PageData } = $props()

	const form = superForm(data.form, {
		validators: zod4Client(registerSchema)
	})
	const { form: formData, enhance, message } = form
</script>

<div class="flex justify-center py-40 select-none">
	<div
		class="flex gap-6 rounded-box border border-base-content/10 bg-base-200 px-6 py-4 font-mono shadow-2xl transition"
	>
		<form method="POST" use:enhance class="card w-sm gap-y-1.5 py-4">
			<h1 class="bold text-2xl font-bold">{m.register_title()}</h1>
			<Field {form} name="email">
				<Control>
					{#snippet children({ props })}
						<Label class="label text-xs">{m.auth_email()}</Label>
						<label class="input input-sm w-full">
							<Mail class="h-[1em] text-sm" />
							<input
								type="email"
								{...props}
								bind:value={$formData.email}
								placeholder={m.auth_email()}
							/>
						</label>
					{/snippet}
				</Control>
				<Description class="text-xs">{m.auth_emailDescription()}</Description>
				<FieldErrors class="text-xs text-error" />
			</Field>
			<Field {form} name="username">
				<Control>
					{#snippet children({ props })}
						<Label class="label text-xs">{m.register_username()}</Label>
						<label class="input input-sm w-full">
							<User class="h-[1em] text-sm" />
							<input
								type="text"
								{...props}
								bind:value={$formData.username}
								placeholder={m.register_username()}
							/>
						</label>
					{/snippet}
				</Control>
				<Description class="text-xs">{m.register_usernameDescription()}</Description>
				<FieldErrors class="text-xs text-error" />
			</Field>
			<Field {form} name="password">
				<Control>
					{#snippet children({ props })}
						<Label class="label text-xs">{m.auth_password()}</Label>
						<label class="input input-sm w-full">
							<Lock class="h-[1em] text-sm" />
							<input
								type="password"
								{...props}
								bind:value={$formData.password}
								placeholder={m.auth_password()}
							/>
						</label>
					{/snippet}
				</Control>
				<Description class="text-xs">{m.auth_passwordDescription()}</Description>
				<FieldErrors class="text-xs text-error" />
			</Field>
			<Field {form} name="confirmPassword">
				<Control>
					{#snippet children({ props })}
						<Label class="label text-xs">{m.register_confirmPassword()}</Label>
						<label class="input input-sm w-full">
							<Lock class="h-[1em] text-sm" />
							<input
								type="password"
								{...props}
								bind:value={$formData.confirmPassword}
								placeholder={m.register_confirmPassword()}
							/>
						</label>
					{/snippet}
				</Control>
				<Description class="text-xs">{m.register_confirmPasswordDescription()}</Description>
				<FieldErrors class="text-xs text-error" />
			</Field>
			{#if $message}
				<output class="text-success text-xs">{$message}</output>
			{/if}
			<input class="btn btn-sm btn-primary" type="submit" value={m.register_register()} />
		</form>
		<div class="h-full w-[0.5px] bg-base-content/10"></div>
		<div class="flex items-center rounded-box">
			<div class="flex items-center gap-4">
				<SCPEmblem class="h-40 text-base-content motion-safe:animate-spin-slow" />
				<div class="grow">
					<h2 class="font-bauhaus text-4xl">SCP Foundation</h2>
					<h3 class="text-xl">Secure Contain Protect</h3>
				</div>
			</div>
		</div>
	</div>
</div>
