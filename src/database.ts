export type MonoActionData = {
	victim:
		| {
				type: "self"
				id?: null
		  }
		| {
				type: "tag"
				id: string
		  }
		| {
				type: "role"
				id: string
		  }
}

export type Action = {
	action_type: "edit_profile"
	action_data: MonoActionData
}
// only define types for tables, views and functions that are actually used in the codebase to keep
// it simple
export type Database = {
	public: {
		Tables: {
			profile: {
				Row: {
					avatar_url: string | null
					biography: string
					created_at: string
					forum_rating: number
					id: string
					pronouns: string
					username: string
					wiki_rating: number
				}
				Insert: {
					avatar_url?: string | null
					biography?: string
					created_at?: string
					forum_rating?: number
					id: string
					pronouns?: string
					username: string
					wiki_rating?: number
				}
				Update: {
					biography?: string
					pronouns?: string
					username?: string
					avatar_url?: string
					created_at?: never
					forum_rating?: never
					id?: never
					wiki_rating?: never
				}
				Relationships: []
			}
		}
		Views: {
			user_single_action: {
				Row: {
					profile_id: string | null
					id: string
				} & MonoActionData["victim"] &
					Action
				Relationships: []
			}
			user_victim_single_action: {
				Row: {
					profile_id: string | null
					victim_profile_id: string
					id: string
				} & Action
				Relationships: []
			}
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeType: {
			[_ in never]: never
		}
	}
}
