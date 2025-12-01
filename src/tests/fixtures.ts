import { test as baseTest } from "vitest"

import { PRIVATE_SUPABASE_KEY } from "$env/static/private"
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"

function createSupabaseAdmin(): SupabaseClient {
	return createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_KEY)
}

export const test = baseTest.extend<{ userInfo: { user: User, client: SupabaseClient }, supabaseAdmin: SupabaseClient }>({
	supabaseAdmin: async ({}, use) => {
		await use(createSupabaseAdmin())
	},
	userInfo: async ({}, use) => {
		const adminClient = createSupabaseAdmin()
		const {
			data: { user, session }
		} = await adminClient.auth.signUp({
			email: `test${Date.now()}@example.com`,
			password: "12345aA!",
			options: {
				data: {
					username: "test"
				}
			}
		})

		const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			async accessToken() {
				return session!.access_token
			}
		})

		await use({ user: user!, client })

		await adminClient.auth.admin.deleteUser(user!.id)
	}
})
