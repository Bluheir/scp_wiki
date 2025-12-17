<script lang="ts">
	import UserAvatar from "$lib/components/UserAvatar.svelte"
	import AvatarSelect from "./AvatarSelect.svelte"
	import { type AvatarImageData, type Profile, type ProfileEdit } from "./profile"
	import * as Form from "formsnap"
	import { m } from "$lib/paraglide/messages"
	import type { Snippet } from "svelte"
	import { Pencil, Save, X } from "lucide-svelte"
	import type { SuperForm } from "sveltekit-superforms"

	let {
		profile,
		form,
		onDiscard,
		ratingTable
	}: {
		profile: Profile,
		form: SuperForm<ProfileEdit>
		onDiscard: () => Promise<void> | void
		ratingTable: Snippet<[]>
	} = $props()

	const { form: formData, enhance } = form
	let modalElement: HTMLDialogElement | undefined = $state()
	let image: AvatarImageData | undefined = $state()
	const profileAvatar = $derived.by(() => {
		if(image) {
			return {
				id: profile.id,
				avatarUrl: image.fileUrl,
				username: profile.username
			}
		} else {
			return {
				id: profile.id,
				username: $formData.username,
				avatarUrl: profile.avatarUrl
			}
		}
	})
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	use:enhance
>
	<div class="flex gap-4">
		<div>
			<button class="cursor-pointer" onclick={() => modalElement?.showModal() } type="button">
				<UserAvatar user={profileAvatar} size="lg" style="box" />
			</button>
			<dialog bind:this={modalElement} class="modal not-prose">
				<div class="modal-box">
					<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onclick={() => modalElement?.close()}><X class="w-[1em]"/></button>
					<AvatarSelect bind:image onsubmit={() => modalElement?.close()} {form}/>
				</div>
			</dialog>
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
		<button type="submit" class="btn btn-sm btn-primary"><Save class="w-[1em]" />{m.profile_saveChanges()}</button>
		<button class="btn btn-sm btn-error" onclick={onDiscard}>
			<Pencil class="w-[1em]" />
			{m.profile_discardChanges()}
		</button>
	</div>
</form>
