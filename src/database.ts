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
			urole: {
				Row: {
					id: string
				}
				Insert: {
					id: string
				}
				Update: {
					id?: string
				}
				Relationships: []
			}

			urole_custom: {
				Row: {
					id: string
					is_default: boolean
					is_hidden: boolean
					profile_id: string | null
					role_color: string
					role_name: string
				}
				Insert: {
					id: string
					is_default?: boolean
					is_hidden?: boolean
					profile_id?: string | null
					role_color?: string
					role_name: string
				}
				Update: {
					id?: string
					is_default?: boolean
					is_hidden?: boolean
					profile_id?: string | null
					role_color?: string
					role_name?: string
				}
				Relationships: [
					{
						foreignKeyName: "urole_custom_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "urole"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "urole_custom_profile_id_fkey"
						columns: ["profile_id"]
						isOneToOne: false
						referencedRelation: "profile"
						referencedColumns: ["id"]
					}
				]
			}

			urole_profile: {
				Row: {
					profile_id: string
					urole_id: string
				}
				Insert: {
					profile_id: string
					urole_id: string
				}
				Update: {
					profile_id?: string
					urole_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "urole_profile_profile_id_fkey"
						columns: ["profile_id"]
						isOneToOne: false
						referencedRelation: "profile"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "urole_profile_urole_id_fkey"
						columns: ["urole_id"]
						isOneToOne: false
						referencedRelation: "urole_custom"
						referencedColumns: ["id"]
					}
				]
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
