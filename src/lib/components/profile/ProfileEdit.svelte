<script lang="ts">
	import UserAvatar from "$lib/components/UserAvatar.svelte"
	import { superForm, type SuperValidated } from "sveltekit-superforms"
	import { type Profile, type ProfileEdit, profileSchema } from "./profile"
	import * as Form from "formsnap"
	import { m } from "$lib/paraglide/messages"
	import type { Snippet } from "svelte"
	import { Pencil, Save } from "lucide-svelte"
	import { zod4Client } from "sveltekit-superforms/adapters"

	let {
		profile,
		formValidated,
		onDiscard,
		onSubmit,
		ratingTable
	}: {
		profile: Profile
		onDiscard: () => Promise<void> | void
		onSubmit: (data: ProfileEdit) => Promise<void> | void
		ratingTable: Snippet<[]>
		formValidated: SuperValidated<ProfileEdit, any, ProfileEdit>
	} = $props()

	const form = superForm(formValidated, {
		validators: zod4Client(profileSchema)
	})

	const { form: formData, enhance } = $derived(form)
</script>

<form
	onsubmit={async (e) => {
		e.preventDefault()
		await onSubmit($formData)
	}}
	use:enhance
>
	<div class="flex gap-4">
		<div>
			<UserAvatar
				user={{
					id: profile.id,
					username: $formData.username,
					avatarUrl: profile.avatarUrl
				}}
				size="lg"
				style="box"
			/>
		</div>
		<div class="flex gap-4">
			<div class="w-80">
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="font-bold text-base-content">{m.register_username()}</Form.Label>
							<input
								class="input"
								placeholder={m.register_username()}
								{...props}
								bind:value={$formData.username}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-error" />
				</Form.Field>
			</div>
			<div class="w-80">
				<Form.Field {form} name="pronouns">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="font-bold text-base-content">{m.profile_pronouns()}</Form.Label>
							<input
								class="input"
								type="text"
								placeholder={m.profile_pronouns()}
								bind:value={$formData.pronouns}
								{...props}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-error" />
				</Form.Field>
			</div>
		</div>
	</div>
	{@render ratingTable()}
	<section>
		<Form.Field {form} name="biography">
			<Form.Control>
				{#snippet children({ props })}
					<h3><Form.Label>{m.profile_biography()}</Form.Label></h3>
					<textarea
						class="textarea min-h-80 w-full text-base"
						contenteditable="plaintext-only"
						bind:value={$formData.biography}
						placeholder={m.profile_biography()}
						{...props}
					>
					</textarea>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors class="my-3 text-error" />
		</Form.Field>
	</section>
	<div class="flex gap-2">
		<button type="submit" class="btn btn-sm btn-primary"><Save class="w-[1em]" />Save</button>
		<button class="btn btn-sm btn-error" onclick={onDiscard}>
			<Pencil class="w-[1em]" />
			Discard changes
		</button>
	</div>
</form>
