export type Topic = ImmediateParentTopic | ParentTopic

export type ImmediateParentTopic = {
	readonly id: string
	readonly title: string
	readonly description: string
	readonly type: "immediateParent"
	children: PostPreview[]
}

export type ParentTopic = {
	readonly id: string
	readonly title: string
	readonly description: string
	readonly type: "parent"
	children: ChildTopic[]
}

export type ChildTopic = {
	readonly id: string
	readonly title: string
	readonly description: string
	readonly threadAmount: number
	readonly postAmount: number
	readonly lastPoster: Author
	readonly timestamp: number
}

export type PostPreview = {
	readonly id: string
	readonly author: Author
	readonly lastReply: Author
	readonly repliesAmount: number
	readonly title: string
	readonly preview: string
	readonly timestamp: number
}

export type Author = {
	readonly id: string
	readonly profileSrc: string
	readonly username: string
}
