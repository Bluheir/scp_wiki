export type Topic = ImmediateParentTopic | ParentTopic

export type ImmediateParentTopic = {
	readonly id: string
	readonly title: string
	readonly description: string
	readonly type: "immediateParent"
	readonly children: PostPreview[]
}

export type ParentTopic = {
	readonly id: string
	readonly title: string
	readonly description: string
	readonly type: "parent"
	readonly children: ChildTopic[]
}

export type ChildTopic = {
	readonly id: string
	readonly title: string
	readonly description: string
	readonly threadAmount: number
	readonly postAmount: number
	readonly lastAuthor: Author
	readonly lastDate: Date
}

export type PostPreview = {
	readonly id: string
	readonly title: string
	readonly description: string
	readonly startedAuthor: Author
	readonly startedDate: Date
	readonly postAmount: number
	readonly lastAuthor: Author
	readonly lastDate: Date
}

export type Author = {
	readonly id: string
	readonly profileSrc: string
	readonly username: string
}
