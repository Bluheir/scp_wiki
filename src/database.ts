
export type Rating = -1 | 0 | 1

export type VictimType = "user" | "role" | "tag" | "topic" | "self"
export type ActionType = "edit_profile" | "view_topic" | "create_topic" | "edit_topic"
export type ActionData = {}
export type UtagEntityType = "user" | "role" | "topic"

// only define types for tables, views and functions that are actually used in the codebase to keep
// it simple
export type Database = {
	permission: {
		Tables: {
			default_action: {
				Row: {
					id: string
					info: Database["permission"]["CompositeTypes"]["permission_info_inner"]
				}
				Insert: {
					id?: string
					info: Database["permission"]["CompositeTypes"]["permission_info_inner"]
				}
				Update: {
					id?: string
					info?: Database["permission"]["CompositeTypes"]["permission_info_inner"]
				}
				Relationships: []
			}
			urole: {
				Row: {
					creator_id: string | null
					id: string
					is_default: boolean
					is_hidden: boolean
					role_name: string
				}
				Insert: {
					creator_id?: string | null
					id?: string
					is_default?: boolean
					is_hidden?: boolean
					role_name: string
				}
				Update: {
					creator_id?: string | null
					id?: string
					is_default?: boolean
					is_hidden?: boolean
					role_name?: string
				}
				Relationships: [
					{
						foreignKeyName: "urole_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_urole"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "urole_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_utag"
						referencedColumns: ["user_id"]
					}
				]
			}
			urole_action: {
				Row: {
					id: string
					info: Database["permission"]["CompositeTypes"]["permission_info_inner"]
					urole_id: string
				}
				Insert: {
					id?: string
					info: Database["permission"]["CompositeTypes"]["permission_info_inner"]
					urole_id: string
				}
				Update: {
					id?: string
					info?: Database["permission"]["CompositeTypes"]["permission_info_inner"]
					urole_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "urole_action_urole_id_fkey"
						columns: ["urole_id"]
						isOneToOne: false
						referencedRelation: "urole"
						referencedColumns: ["id"]
					}
				]
			}
			urole_assignment: {
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
						foreignKeyName: "urole_assignment_profile_id_fkey"
						columns: ["profile_id"]
						isOneToOne: false
						referencedRelation: "user_for_urole"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "urole_assignment_profile_id_fkey"
						columns: ["profile_id"]
						isOneToOne: false
						referencedRelation: "user_for_utag"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "urole_assignment_urole_id_fkey"
						columns: ["urole_id"]
						isOneToOne: false
						referencedRelation: "urole"
						referencedColumns: ["id"]
					}
				]
			}
			user_action: {
				Row: {
					id: string
					info: Database["permission"]["CompositeTypes"]["permission_info_inner"]
					profile_id: string
				}
				Insert: {
					id?: string
					info: Database["permission"]["CompositeTypes"]["permission_info_inner"]
					profile_id: string
				}
				Update: {
					id?: string
					info?: Database["permission"]["CompositeTypes"]["permission_info_inner"]
					profile_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "user_action_profile_id_fkey"
						columns: ["profile_id"]
						isOneToOne: false
						referencedRelation: "user_for_urole"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "user_action_profile_id_fkey"
						columns: ["profile_id"]
						isOneToOne: false
						referencedRelation: "user_for_utag"
						referencedColumns: ["user_id"]
					}
				]
			}
			utag: {
				Row: {
					creator_id: string | null
					id: string
					is_default: boolean
					is_hidden: boolean
					tag_name: string
				}
				Insert: {
					creator_id?: string | null
					id?: string
					is_default?: boolean
					is_hidden?: boolean
					tag_name: string
				}
				Update: {
					creator_id?: string | null
					id?: string
					is_default?: boolean
					is_hidden?: boolean
					tag_name?: string
				}
				Relationships: [
					{
						foreignKeyName: "utag_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_urole"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "utag_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_utag"
						referencedColumns: ["user_id"]
					}
				]
			}
			utag_assignment: {
				Row: {
					entity_id: string
					entity_type: UtagEntityType
					utag_id: string
				}
				Insert: {
					entity_id: string
					entity_type: UtagEntityType
					utag_id: string
				}
				Update: {
					entity_id?: string
					entity_type?: UtagEntityType
					utag_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "utag_assignment_utag_id_fkey"
						columns: ["utag_id"]
						isOneToOne: false
						referencedRelation: "utag"
						referencedColumns: ["id"]
					}
				]
			}
		}
		Views: {
			topic_for_utag: {
				Row: {
					creator_id: string | null
					id: string
					is_default: boolean
					is_hidden: boolean
					tag_name: string
					topic_creator_id: string
					topic_id: string
					topic_parent_id: string
				}
				Relationships: [
					{
						foreignKeyName: "topic_creator_id_fkey"
						columns: ["topic_creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_urole"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "topic_creator_id_fkey"
						columns: ["topic_creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_utag"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "utag_assignment_utag_id_fkey"
						columns: ["id"]
						isOneToOne: false
						referencedRelation: "utag"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "utag_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_urole"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "utag_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_utag"
						referencedColumns: ["user_id"]
					}
				]
			}
			user_action_full: {
				Row: {
					action_id: string
					action_info: Database["permission"]["CompositeTypes"]["permission_info_inner"]
					grant_type: string
					user_id: string | null
				}
				Relationships: []
			}
			user_for_urole: {
				Row: {
					id: string
					is_default: boolean
					is_hidden: boolean
					user_created_at: string | null
					user_id: string | null
					user_username: string | null
				}
				Relationships: []
			}
			user_for_utag: {
				Row: {
					creator_id: string | null
					id: string
					is_default: boolean
					is_hidden: boolean
					tag_name: string
					user_created_at: string
					user_id: string
					user_username: string
				}
				Relationships: [
					{
						foreignKeyName: "utag_assignment_utag_id_fkey"
						columns: ["id"]
						isOneToOne: false
						referencedRelation: "utag"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "utag_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_urole"
						referencedColumns: ["user_id"]
					},
					{
						foreignKeyName: "utag_creator_id_fkey"
						columns: ["creator_id"]
						isOneToOne: false
						referencedRelation: "user_for_utag"
						referencedColumns: ["user_id"]
					}
				]
			}
			user_topic_action: {
				Row: {
					action_data: ActionData
					action_type: string | null
					user_id: string | null
					victim_topic_id: string
				}
				Relationships: []
			}
			user_user_action: {
				Row: {
					action_data: ActionData
					action_type: ActionType
					user_id: string | null
					victim_user_id: string
				}
				Relationships: []
			}
		}
		Functions: {
			roles_for_user: {
				Args: { u_profile_id: string | null }
				Returns: {
					creator_id: string
					id: string
					is_default: boolean
					is_hidden: boolean
					role_name: string
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			permission_info_inner: {
				action_type: string
				action_data: ActionData
				victim_id: string | null
				victim_type: VictimType
			}
		}
	}
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
			[_ in never]: never
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
