<script lang="ts">
	import Topic from "$lib/components/forum/ImmediateParentTopic.svelte"

	import type { PostPreview } from "$lib/components/forum/types"; // Adjust import path

	export const testPostPreviews: PostPreview[] = [
	{
		id: 'post-1',
		isTopPost: true,
		title: 'Welcome to the New Forum!',
		description: 'Welcome message and guidelines for the new forum platform. Please read before posting.',
		startedAuthor: {
			id: 'admin-1',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
			username: 'Admin'
		},
		startedDate: new Date('2024-01-01T10:00:00Z'),
		postAmount: 245,
		lastAuthor: {
			id: 'author-1',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
			username: 'AliceChen'
		},
		lastDate: new Date('2024-03-10T14:45:00Z')
	},
	{
		id: 'post-2',
		isTopPost: false,
		title: 'Site Rules and Guidelines',
		description: 'Official rules and guidelines for posting on the forum. All users must follow these rules.',
		startedAuthor: {
			id: 'mod-1',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=moderator',
			username: 'Moderator'
		},
		startedDate: new Date('2024-01-02T09:30:00Z'),
		postAmount: 189,
		lastAuthor: {
			id: 'author-2',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
			username: 'BobSmith'
		},
		lastDate: new Date('2024-03-09T16:20:00Z')
	},
	{
		id: 'post-3',
		isTopPost: false,
		title: 'What features would you like to see added?',
		description: 'Discussion about potential new features for the forum. Share your ideas!',
		startedAuthor: {
			id: 'user-1',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
			username: 'CarolDavis'
		},
		startedDate: new Date('2024-01-15T14:20:00Z'),
		postAmount: 996,
		lastAuthor: {
			id: 'author-3',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dave',
			username: 'DaveWilson'
		},
		lastDate: new Date('2024-03-08T13:10:00Z')
	},
	{
		id: 'post-4',
		isTopPost: false,
		title: 'Introduce yourself here!',
		description: 'New members, please introduce yourselves here. Tell us about your interests!',
		startedAuthor: {
			id: 'user-2',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve',
			username: 'EveMartinez'
		},
		startedDate: new Date('2024-01-10T11:15:00Z'),
		postAmount: 4918,
		lastAuthor: {
			id: 'author-4',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
			username: 'FrankLee'
		},
		lastDate: new Date('2024-03-10T09:30:00Z')
	},
	{
		id: 'post-5',
		isTopPost: false,
		title: 'General Discussion Thread',
		description: 'Casual off-topic conversations. Please keep it friendly and respectful.',
		startedAuthor: {
			id: 'user-3',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
			username: 'GraceTaylor'
		},
		startedDate: new Date('2024-01-05T08:45:00Z'),
		postAmount: 3215,
		lastAuthor: {
			id: 'author-5',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=henry',
			username: 'HenryBrown'
		},
		lastDate: new Date('2024-03-10T18:45:00Z')
	},
	{
		id: 'post-6',
		isTopPost: false,
		title: 'Site Bug Reports',
		description: 'Report any bugs or technical issues you encounter on the site.',
		startedAuthor: {
			id: 'user-4',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=isabel',
			username: 'IsabelClark'
		},
		startedDate: new Date('2024-01-20T13:30:00Z'),
		postAmount: 742,
		lastAuthor: {
			id: 'author-6',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jack',
			username: 'JackMiller'
		},
		lastDate: new Date('2024-03-10T11:15:00Z')
	},
	{
		id: 'post-7',
		isTopPost: false,
		title: 'Weekly Movie Discussion',
		description: 'What movies have you watched recently? Share your thoughts and recommendations.',
		startedAuthor: {
			id: 'user-5',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karen',
			username: 'KarenWhite'
		},
		startedDate: new Date('2024-02-01T12:00:00Z'),
		postAmount: 999,
		lastAuthor: {
			id: 'author-7',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leo',
			username: 'LeoAdams'
		},
		lastDate: new Date('2024-03-10T23:59:59Z')
	},
	{
		id: 'post-8',
		isTopPost: false,
		title: 'New Feature Announcement: Dark Mode!',
		description: 'We just released dark mode! Check it out and share your feedback.',
		startedAuthor: {
			id: 'admin-2',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=developer',
			username: 'Developer'
		},
		startedDate: new Date('2024-03-09T10:00:00Z'),
		postAmount: 45,
		lastAuthor: {
			id: 'author-8',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
			username: 'MikeJohnson'
		},
		lastDate: new Date('2024-03-10T12:00:00Z')
	},
	{
		id: 'post-9',
		isTopPost: false,
		title: 'Inactive Discussion',
		description: 'This thread has not been active for a while.',
		startedAuthor: {
			id: 'user-6',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nina',
			username: 'NinaDavis'
		},
		startedDate: new Date('2023-06-15T10:00:00Z'),
		postAmount: 50,
		lastAuthor: {
			id: 'author-9',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=oliver',
			username: 'OliverTaylor'
		},
		lastDate: new Date('2023-12-01T15:30:00Z')
	},
	{
		id: 'post-10',
		isTopPost: false,
		title: 'Brand New Thread with No Replies',
		description: 'I just created this thread and am waiting for responses.',
		startedAuthor: {
			id: 'user-7',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=paul',
			username: 'PaulWalker'
		},
		startedDate: new Date('2024-03-09T14:00:00Z'),
		postAmount: 0,
		lastAuthor: {
			id: 'author-10',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=paul',
			username: 'PaulWalker'
		},
		lastDate: new Date('2024-03-09T14:00:00Z')
	},
	{
		id: 'post-11',
		isTopPost: false,
		title: 'Very Long Thread Title That Tests How the UI Handles Text Overflow and Wrapping in Limited Space',
		description: 'This thread has an extremely long title to test the layout and responsiveness of the forum interface.',
		startedAuthor: {
			id: 'user-8',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quentin',
			username: 'QuentinLongnameuser'
		},
		startedDate: new Date('2024-02-15T09:45:00Z'),
		postAmount: 123,
		lastAuthor: {
			id: 'author-11',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rachel',
			username: 'RachelWithAVeryLongUsernameToo'
		},
		lastDate: new Date('2024-03-10T10:30:00Z')
	},
	{
		id: 'post-12',
		isTopPost: true,
		title: 'IMPORTANT: Site Maintenance Scheduled',
		description: 'The site will be down for maintenance on March 15th from 2-4 AM UTC.',
		startedAuthor: {
			id: 'admin-3',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sysadmin',
			username: 'SystemAdmin'
		},
		startedDate: new Date('2024-03-05T08:00:00Z'),
		postAmount: 78,
		lastAuthor: {
			id: 'author-12',
			profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
			username: 'SarahMiller'
		},
		lastDate: new Date('2024-03-10T08:15:00Z')
	}
];

</script>

<div class="p-10">
	<Topic
		topic={{
			id: "123",
			description: "first topic",
			title: "scp-issue",
			type: "immediateParent",
			children: testPostPreviews
		}}
	/>
</div>