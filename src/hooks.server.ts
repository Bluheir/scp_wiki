import type { Handle } from "@sveltejs/kit"
import { paraglideMiddleware } from "$lib/paraglide/server"
import { createClient } from "@supabase/supabase-js"
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"
import { PRIVATE_SUPABASE_KEY } from "$env/static/private"

const initSetValues: App.Locals = {
	supabase: createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_KEY),
	supabase_anon_key: PUBLIC_SUPABASE_ANON_KEY,
	supabase_url: PUBLIC_SUPABASE_URL
}

export const handle: Handle = ({ event, resolve }) => {
	event.locals.supabase = initSetValues.supabase
	event.locals.supabase_anon_key = initSetValues.supabase_anon_key
	event.locals.supabase_url = initSetValues.supabase_url

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale)
		})
	})
}
