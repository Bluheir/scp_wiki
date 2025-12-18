import { error, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ locals, params, fetch }) => {
	const userId = params.userId!
	const { data } = await locals.supabaseUser
		.from("profile")
		.select("avatar_url")
		.eq("id", userId)
		.single()

	if (!data || !data.avatar_url) {
		error(404)
	}

	return fetch(data.avatar_url)
}
