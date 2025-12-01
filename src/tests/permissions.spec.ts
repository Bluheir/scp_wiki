import { describe, expect } from "vitest"
import { test } from "./fixtures"

import { v6 } from "uuid"

test("user can access their own profile", async ({ userInfo: { user, client } }) => {
	const result = await client
		.from("profile")
		.select("id,username,pronouns,biography,forum_rating,wiki_rating,avatar_url")
		.eq("id", user.id)
		.single()

	expect(result.data).toBeTruthy()
})

test("user can access non-hidden roles", async ({ userInfo: { user, client }, supabaseAdmin }) => {
	const hiddenRoleId = v6()
	const visibleRoleId = v6()

	const result1 = await supabaseAdmin.from("urole_or_utag").insert({ id: visibleRoleId })
	expect(result1.error).toBeNull()
	const result2 = await supabaseAdmin.from("urole").insert({ id: visibleRoleId, role_name: `moderator${Date.now()}` })
	expect(result2.error).toBeNull()

	const result3 = await supabaseAdmin.from("urole_or_utag").insert({ id: hiddenRoleId })
	expect(result3.error).toBeNull()
	const result4 = await supabaseAdmin.from("urole").insert({ id: hiddenRoleId, role_name: `secret${Date.now()}`, is_hidden: true })
	expect(result4.error).toBeNull()

	const result = await client
		.from("urole")
		.select("id,role_name")
	
	await supabaseAdmin.from("urole_or_utag").delete().eq("id", hiddenRoleId)
	await supabaseAdmin.from("urole_or_utag").delete().eq("id", visibleRoleId)

	expect(result.data).toBeTruthy()
	const mappedData: string[] = result.data!.map(({ id }) => id)
	expect(mappedData).toContain(visibleRoleId)
	expect(mappedData).not.toContain(hiddenRoleId)
})

test("user can access hidden roles when has permission", async ({ userInfo: { user, client }, supabaseAdmin }) => {
	const roleId = v6()
	const hiddenRoleId = v6()

	const result1 = await supabaseAdmin.from("urole_or_utag").insert({ id: roleId })
	expect(result1.error).toBeNull()
	const result2 = await supabaseAdmin.from("urole").insert({ id: roleId, role_name: `admin${Date.now()}` })
	expect(result2.error).toBeNull()
	const result3 = await supabaseAdmin.from("urole_permission").insert({ id: roleId, permission_name: "view_hidden_roles" })
	expect(result3.error).toBeNull()
	const result4 = await supabaseAdmin.from("urole_profile").insert({ profile_id: user.id, urole_id: roleId })
	expect(result4.error).toBeNull()
	const result5 = await supabaseAdmin.from("urole_or_utag").insert({ id: hiddenRoleId })
	expect(result5.error).toBeNull()
	const result6 = await supabaseAdmin.from("urole").insert({ id: hiddenRoleId, role_name: `secret${Date.now()}`, is_hidden: true })
	expect(result6.error).toBeNull()

	const result = await client
		.from("urole")
		.select("id,role_name")
		.eq("id", hiddenRoleId)
		.single()

	console.log(result)

	await supabaseAdmin.from("urole_or_utag").delete().eq("id", hiddenRoleId)
	await supabaseAdmin.from("urole_or_utag").delete().eq("id", roleId)

	expect(result.data).toBeTruthy()
})
