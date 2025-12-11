import { test as base } from "@playwright/test"
import { createClient, SupabaseClient } from "@supabase/supabase-js"

export const test = base.extend<{ supabaseAdmin: SupabaseClient }>({
	supabaseAdmin: async ({}, use) => {
		const client = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.PRIVATE_SUPABASE_KEY!)

		await use(client)
	}
})

export { expect } from "@playwright/test"
