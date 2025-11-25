// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SupabaseClient } from "@supabase/supabase-js"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {},
		interface Locals {
			supabase: SupabaseClient,
			supabase_anon_key: string,
			supabase_url: string
		}
	}
}

export {}
