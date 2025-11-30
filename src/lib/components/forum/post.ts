export type MyRating = -1 | 0 | 1

export type Post = {
	readonly id: string
	readonly text: string
	readonly authorId: string
	readonly authorProfileSrc?: string
	readonly authorUsername: string
	readonly created: Date
	readonly rating: number
	readonly myRating: MyRating
	setMyRating: (newRating: MyRating) => Promise<void>
}