import type { Handle } from "@sveltejs/kit"
import { paraglideMiddleware } from "$lib/paraglide/server"
import { createServerClient, type CookieMethodsServer } from "@supabase/ssr"
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"
import { PRIVATE_SUPABASE_KEY } from "$env/static/private"

const initSetValues = {
	supabase_anon_key: PUBLIC_SUPABASE_ANON_KEY,
	supabase_url: PUBLIC_SUPABASE_URL
}

export const handle: Handle = ({ event, resolve }) => {
	event.locals.supabase_anon_key = initSetValues.supabase_anon_key
	event.locals.supabase_url = initSetValues.supabase_url
	const cookies: CookieMethodsServer = {
		getAll: () => event.cookies.getAll(),
		setAll: (cookiesToSet) =>
			cookiesToSet.forEach(({ name, value, options }) => event.cookies.set(name, value, { ...options, path: '/' }))
	}
	event.locals.supabase = createServerClient(initSetValues.supabase_url, PRIVATE_SUPABASE_KEY, { cookies })
	event.locals.supabasePublic = createServerClient(initSetValues.supabase_url, initSetValues.supabase_anon_key, { cookies })

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale),
			filterSerializedResponseHeaders: (name) => name === "content-range" || name === "x-supabase-api-version",
		})
	})
}
