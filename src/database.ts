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
			topic: {
				Row: {
					creator_id: string | null
					id: string
					parent_id: string | null
				}
				Insert: {
					creator_id?: string | null
					id?: string
					parent_id?: string | null
				}
				Update: {
					creator_id?: never
					id?: never
					parent_id?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "topic_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "profile"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "topic_parent_id_fkey"
						columns: ["parent_id"]
						isOneToOne: false
						referencedRelation: "parent_topic"
						referencedColumns: ["id"]
					}
				]
			}
			topic_info: {
				Row: {
					id: string
					locale_code: string
					topic_description: string
					topic_name: string
				}
				Insert: {
					id: string
					locale_code: string
					topic_description: string
					topic_name: string
				}
				Update: {
					id?: never
					locale_code?: string
					topic_description?: string
					topic_name?: string
				}
				Relationships: [
					{
						foreignKeyName: "topic_info_id_fkey"
						columns: ["id"]
						isOneToOne: false
						referencedRelation: "topic"
						referencedColumns: ["id"]
					}
				]
			}
			immediate_parent_topic: {
				Row: {
					id: string
				}
				Insert: {
					id: string
				}
				Update: {
					id?: never
				}
				Relationships: [
					{
						foreignKeyName: "immediate_parent_topic_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "topic"
						referencedColumns: ["id"]
					}
				]
			}
			parent_topic: {
				Row: {
					id: string
				}
				Insert: {
					id: string
				}
				Update: {
					id?: never
				}
				Relationships: [
					{
						foreignKeyName: "parent_topic_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "topic"
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
