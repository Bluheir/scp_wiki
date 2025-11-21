import type { Handle, ServerInit } from "@sveltejs/kit"
import { paraglideMiddleware } from "$lib/paraglide/server"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"

const initSetValues: {
	supabase: SupabaseClient
} = {
	supabase: undefined!
}

export const init: ServerInit = async () => {
	const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

	initSetValues.supabase = supabaseClient
}

export const handle: Handle = ({ event, resolve }) => {
	event.locals.supabase = initSetValues.supabase

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale)
		})
	})
}
