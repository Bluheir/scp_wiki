import { createBrowserClient, createServerClient, isBrowser } from "@supabase/ssr"
import type { LayoutLoad } from "./$types"
import type { Database } from "../database"

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends("supabase:auth")

	const supabase = isBrowser()
		? createBrowserClient<Database, "public">(data.supabase_url, data.supabase_anon_key, {
				global: {
					fetch
				}
			})
		: createServerClient<Database, "public">(data.supabase_url, data.supabase_anon_key, {
				global: {
					fetch
				},
				cookies: {
					getAll: () => data.cookies
				}
			})

	const { data: { session } } = await supabase.auth.getSession()

	return { supabase, session }
}
