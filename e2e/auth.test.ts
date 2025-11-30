import { expect, test } from "@playwright/test"
import { type SupabaseClient, createClient } from "@supabase/supabase-js"

test.describe("register", () => {
	test("valid data successfully registers user", async ({ page }) => {
		console.log(process.env)
		const email = `test${Date.now()}@example.com`
		const password = "12345aA!"

		await page.goto("/register")
		await page.getByLabel("Email").fill(email)
		await page.getByLabel("Username").fill("testUser")
		await page.getByLabel("Password", { exact: true }).fill(password)
		await page.getByLabel("Confirm password").fill(password)

		await expect(page.getByTestId("register-success-message")).toBeHidden()

		await page.locator("[type=submit]").click()

		await expect(page.getByTestId("register-success-message")).toBeVisible()
	})
})
