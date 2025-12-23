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
export type Rating = -1 | 0 | 1

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
			post: {
				Row: {
					creator_id: string
					id: string
					rating: number
				}
				Insert: {
					creator_id: string
					id?: string
					rating?: number
				}
				Update: {
					creator_id?: string
					id?: string
					rating?: number
				}
				Relationships: [
					{
						foreignKeyName: "post_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "profile"
						referencedColumns: ["id"]
					}
				]
			}
			post_revision: {
				Row: {
					content: string
					id: string
					post_id: string
				}
				Insert: {
					content: string
					id?: string
					post_id: string
				}
				Update: {
					content?: string
					id?: string
					post_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "post_revision_post_id_fkey"
						columns: ["post_id"]
						isOneToOne: false
						referencedRelation: "post"
						referencedColumns: ["id"]
					}
				]
			}
			post_vote: {
				Row: {
					post_id: string
					profile_id: string
					vote_value: Rating
				}
				Insert: {
					post_id: string
					profile_id: string
					vote_value?: Rating
				}
				Update: {
					post_id?: string
					profile_id?: string
					vote_value?: Rating
				}
				Relationships: [
					{
						foreignKeyName: "post_vote_post_id_fkey"
						columns: ["post_id"]
						isOneToOne: false
						referencedRelation: "post"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "post_vote_profile_id_fkey"
						columns: ["profile_id"]
						isOneToOne: false
						referencedRelation: "profile"
						referencedColumns: ["id"]
					}
				]
			}
			thread: {
				Row: {
					id: string
					title: string
					topic_id: string
				}
				Insert: {
					id: string
					title?: string
					topic_id: string
				}
				Update: {
					id?: string
					title?: string
					topic_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "thread_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "post"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "thread_topic_id_fkey"
						columns: ["topic_id"]
						isOneToOne: false
						referencedRelation: "immediate_parent_topic"
						referencedColumns: ["id"]
					}
				]
			}
			reply: {
				Row: {
					id: string
					replying_to_post_id: string
				}
				Insert: {
					id: string
					replying_to_post_id: string
				}
				Update: {
					id?: string
					replying_to_post_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "reply_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "post"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "reply_replying_to_post_id_fkey"
						columns: ["replying_to_post_id"]
						isOneToOne: false
						referencedRelation: "post_revision"
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
			create_topic: {
				Args: {
					t_description: string
					t_locale_code: string
					t_name: string
					t_parent_topic_id: string | null
					t_type: Database["public"]["Enums"]["topic_type"]
				}
				Returns: [
					{
						creator_id: string
						id: string
						parent_id: string
					}
				]
			}
			set_vote_for: {
				Args: {
					entity_id: string
					entity_type: Database["public"]["Enums"]["ratable_entity"]
					new_vote: Rating
					voter_id: string
				}
				Returns: [
					{
						author_rating: number
						new_rating: number
						old_vote: Rating
					}
				]
			}
		}
		Enums: {
			ratable_entity: "post"
			topic_type: "parent" | "immediate_parent"
		}
		CompositeType: {
			[_ in never]: never
		}
	}
}
