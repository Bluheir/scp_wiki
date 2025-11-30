export type Post = {
	readonly id: string
	readonly text: string
	readonly authorId: string
	readonly authorProfileSrc?: string
	readonly authorUsername: string
	readonly created: Date
}