import { test as base, Page } from "@playwright/test"
import type { Database } from "../src/database"
import { createClient, SupabaseClient, User } from "@supabase/supabase-js"

export const test = base.extend<{
	supabaseAdmin: SupabaseClient<Database>,
	pageUtils: {
		waitForStart: (page: Page, options?: { timeout?: number }) => Promise<void>
	}
}>({
	supabaseAdmin: async ({}, use) => {
		const client = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.PRIVATE_SUPABASE_KEY!)

		await use(client)
	},
	pageUtils: async ({}, use) => {
    await use({
			waitForStart: async (page: Page, options) => {
				await page.waitForSelector("body.started", { timeout: options?.timeout, state: "attached" })
			}
		})
	}
})

export const userTest = test.extend<{
	user: {
		userInfo: {
			id: string
			username: string
			email: string
			password: string
		}
		user: User
		client: SupabaseClient<Database>
	}
}>({
	user: async ({ page, supabaseAdmin }, use) => {
		const username = "test"
		const email = `test${Date.now()}@example.com`
		const password = "12345aA!"
		const { data } = await supabaseAdmin.auth.signUp({
			email,
			password,
			options: { data: { username } }
		})

		if (!data || !data.user || !data.session) {
			throw new Error("Failed to create user")
		}

		await page.goto("/login")
		await page.getByLabel("Email").fill(email)
		await page.getByLabel("Password").fill(password)
		await page.locator("[type=submit]").click()
		await page.waitForURL("/")

		await use({
			userInfo: { id: data.user.id, username, email, password },
			client: createClient(
				process.env.PUBLIC_SUPABASE_URL!,
				process.env.PUBLIC_SUPABASE_ANON_KEY!,
				{
					accessToken: async () => data.session!.access_token
				}
			),
			user: data.user
		})

		await supabaseAdmin.auth.admin.deleteUser(data.user.id, false)
	}
})

export { expect } from "@playwright/test"
