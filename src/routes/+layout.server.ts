import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	return {
		cookies: cookies.getAll(),
		supabase_url: locals.supabase_url,
		supabase_anon_key: locals.supabase_anon_key
	}
}