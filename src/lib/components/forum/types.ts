export type Topic = ImmediateParentTopic | ParentTopic

export type ImmediateParentTopic = {
	readonly id: string
	title: string
	description: string
	readonly type: "immediateParent"
	url: string
	children: PostPreview[]
}

export type ParentTopic = {
	readonly id: string
	title: string
	description: string
	readonly type: "parent"
	children: ChildTopic[]
}

export type ChildTopic = {
	readonly id: string
	readonly threadAmount: number
	readonly postAmount: number
	readonly lastPoster: Author
	title: string
	url: string
	description: string
}

export type PostPreview = {
	readonly id: string
	readonly author: Author
	readonly lastReply: Author
	readonly repliesAmount: number
	title: string
	preview: string
	timestamp: number
}

export type Author = {
	readonly id: string
	readonly profileSrc: string
	readonly username: string
}
