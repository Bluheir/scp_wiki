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
})
