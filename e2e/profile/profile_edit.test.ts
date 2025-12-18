import { expect, userTest } from "../fixtures"

userTest.describe("user", () => {
	userTest("can edit a profile successfully", async ({ page, pageUtils, user }) => {
		await page.goto(`/profile/${user.userInfo.id}`)
		await pageUtils.waitForStart(page)

		const profileEditButton = page.getByTestId("profile-edit")
		await profileEditButton.click()

		await page.getByTestId("profile-edit-username").fill("TGirl1234")
		await page.getByTestId("profile-edit-pronouns").fill("she/her") // :3 :3 :3 :3
	
		await page.locator("[type=submit]").click()
		await expect(page.locator("[type=submit]")).toBeHidden()

		const newUsername = await page.getByTestId("profile-username").innerText()
		const newPronouns = await page.getByTestId("profile-pronouns").innerText()
	
		expect(newUsername).toBe("TGirl1234")
		expect(newPronouns).toBe("she/her")
	})

	userTest("can see live profile updates", async ({ page, pageUtils, supabaseAdmin, user }) => {
		await page.goto(`/profile/${user.userInfo.id}`)
		await pageUtils.waitForStart(page)

		await supabaseAdmin.from("profile")
			.update({ username: "Cute Girl", biography: "I am a cute girl who likes Hatsune Miku :3" })
			.eq("id", user.userInfo.id)

		await expect(page.getByTestId("profile-username")).toHaveText("Cute Girl")
		await expect(page.getByTestId("profile-biography")).toHaveText("I am a cute girl who likes Hatsune Miku :3")
	})

	userTest("can set their profile picture", async ({ page, pageUtils, user }) => {
		await page.goto(`/profile/${user.userInfo.id}`)
		await pageUtils.waitForStart(page)

		const oldAvatarUrl = await page.locator("img[data-avatar-image]").getAttribute("src")

		const profileEditButton = page.getByTestId("profile-edit")
		await profileEditButton.click()

		await page.getByTestId("profile-edit-avatar").click()
		await page.getByTestId("profile-edit-avatar-upload").setInputFiles("e2e/assets/avatar.avif")
		await page.getByTestId("profile-edit-avatar-submit").click()
		await page.locator("[type=submit]").click()
		await expect(page.locator("[type=submit]")).toBeHidden()
		const avatarUrl = await page.locator("img[data-avatar-image]").getAttribute("src")

		expect(avatarUrl).toContain(user.userInfo.id)
		expect(avatarUrl).not.toEqual(oldAvatarUrl)
	})
})
