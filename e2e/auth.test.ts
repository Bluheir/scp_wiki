import { expect, test } from "./fixtures"

test.describe("register", () => {
	test("valid data successfully registers user", async ({ page, adminClient }) => {
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
		const { data: { user } } = await adminClient.auth.signInWithPassword({ email, password })
		await adminClient.auth.admin.deleteUser(user!.id)
	})

	test("existing email does not register user", async ({ page, adminClient }) => {
		const email = `test${Date.now()}@example.com`
		const password = "12345aA!"
		await adminClient.auth.signUp({ email, password })

		await page.goto("/register")
		await page.getByLabel("Email").fill(email)
		await page.getByLabel("Username").fill("testUser")
		await page.getByLabel("Password", { exact: true }).fill(password)
		await page.getByLabel("Confirm password").fill(password)

		await expect(page.getByTestId("register-success-message")).toBeHidden()

		await page.locator("[type=submit]").click()

		await expect(page.getByTestId("register-success-message")).toBeHidden()
	})
})

test.describe("login", () => {
	test("correct email and password logs in", async ({ page, adminClient }) => {
		const email = `test${Date.now()}@example.com`
		const password = "12345aA!"
		await adminClient.auth.signUp({ email, password, options: { data: { username: "test" } } })

		await page.goto("/login")
		await page.getByLabel("Email").fill(email)
		await page.getByLabel("Password").fill(password)

		await page.locator("[type=submit]").click()

		await expect(page).toHaveURL("/")
		const { data: { user } } = await adminClient.auth.signInWithPassword({ email, password })
		await adminClient.auth.admin.deleteUser(user!.id)
	})

	test("invalid email and password does not log in", async ({ page }) => {
		const email = `test${Date.now()}@example.com`
		const password = "12345aA!"

		await page.goto("/login")
		await page.getByLabel("Email").fill(email)
		await page.getByLabel("Password").fill(password)

		await page.locator("[type=submit]").click()

		await expect(page).toHaveURL("/login")
	})
})
