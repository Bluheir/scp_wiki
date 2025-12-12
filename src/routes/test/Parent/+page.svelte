<script lang="ts">
	import Topic from "$lib/components/forum/ParentTopic.svelte"

	import type { ChildTopic } from "$lib/components/forum/types"; // Adjust import path

	// Generate the SubTopic array with embedded authors
	export const testChildTopics: ChildTopic[] = [
		{
			id: 'child-1',
			title: 'Sitewide Announcements',
			description: 'Announcement of any sitewide changes or events. For usage by both staff and non-staff members.',
			threadAmount: 198,
			postAmount: 6553,
			lastAuthor: {
				id: 'author-1',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
				username: 'AliceChen'
			},
			lastDate: new Date('2024-03-10T14:45:00Z')
		},
		{
			id: 'child-2',
			title: 'Page Announcements',
			description: 'Announce posting of new pages and deletion of old pages. Authors, please use the collective threads for new works.',
			threadAmount: 183,
			postAmount: 30136,
			lastAuthor: {
				id: 'author-2',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
				username: 'BobSmith'
			},
			lastDate: new Date('2024-03-09T16:20:00Z')
		},
		{
			id: 'child-3',
			title: 'Proposals and Policy',
			description: 'What can we do to improve the site? Ask any questions you may have regarding site structure and policy.',
			threadAmount: 996,
			postAmount: 11501,
			lastAuthor: {
				id: 'author-3',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
				username: 'CarolDavis'
			},
			lastDate: new Date('2024-03-08T13:10:00Z')
		},
		{
			id: 'child-4',
			title: 'Introductions',
			description: 'New to the site? Introduce yourself and meet other site members here. Get to know the community!',
			threadAmount: 4918,
			postAmount: 41019,
			lastAuthor: {
				id: 'author-4',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dave',
				username: 'DaveWilson'
			},
			lastDate: new Date('2024-03-10T09:30:00Z')
		},
		{
			id: 'child-5',
			title: 'General Discussion',
			description: 'For all off-topic conversations and casual discussions. Please keep it friendly and respectful.',
			threadAmount: 3215,
			postAmount: 128450,
			lastAuthor: {
				id: 'author-5',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve',
				username: 'EveMartinez'
			},
			lastDate: new Date('2024-03-10T18:45:00Z')
		},
		{
			id: 'child-6',
			title: 'Technical Support',
			description: 'Experiencing issues with the site? Report bugs and get help with technical problems here.',
			threadAmount: 742,
			postAmount: 3241,
			lastAuthor: {
				id: 'author-6',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
				username: 'FrankLee'
			},
			lastDate: new Date('2024-03-10T11:15:00Z')
		},
		{
			id: 'child-7',
			title: 'Very Popular Thread',
			description: 'A thread with an extremely high number of posts.',
			threadAmount: 1,
			postAmount: 999999,
			lastAuthor: {
				id: 'author-7',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=popular',
				username: 'PopularUser'
			},
			lastDate: new Date('2024-03-10T23:59:59Z')
		},
		{
			id: 'child-8',
			title: 'New Thread',
			description: 'A thread that was just created.',
			threadAmount: 1,
			postAmount: 1,
			lastAuthor: {
				id: 'author-8',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newuser',
				username: 'NewUser'
			},
			lastDate: new Date('2024-03-10T12:00:00Z')
		},
		{
			id: 'child-9',
			title: 'Inactive Thread',
			description: 'A thread that has not been active for a long time.',
			threadAmount: 1,
			postAmount: 50,
			lastAuthor: {
				id: 'author-9',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=inactive',
				username: 'InactiveUser'
			},
			lastDate: new Date('2022-12-01T15:30:00Z')
		},
		{
			id: 'child-10',
			title: 'Thread with No Replies',
			description: 'A thread that has no replies yet.',
			threadAmount: 1,
			postAmount: 0,
			lastAuthor: {
				id: 'author-10',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=starter',
				username: 'ThreadStarter'
			},
			lastDate: new Date('2024-03-09T14:00:00Z')
		},
		{
			id: 'child-11',
			title: 'Very Long Thread Title That Might Overflow and Cause Layout Issues in the Table Cell',
			description: 'A thread with an extremely long title that tests the table cell wrapping and overflow behavior.',
			threadAmount: 42,
			postAmount: 1234,
			lastAuthor: {
				id: 'author-11',
				profileSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=longname',
				username: 'UserWithAVeryLongUsernameThatExceedsNormalLimits'
			},
			lastDate: new Date('2024-03-10T10:30:00Z')
		},
		{
			id: 'child-12',
			title: 'Short',
			description: 'Minimal content.',
			threadAmount: 0,
			postAmount: 0,
			lastAuthor: {
				id: 'author-12',
				profileSrc: '',
				username: 'Anonymous'
			},
			lastDate: new Date('2024-01-01T00:00:00Z')
		}
	];
</script>

<div class="p-10">
	<Topic
		topic={{
			id: "123",
			description: "first topic",
			title: "scp-issue",
			type: "parent",
			children: testChildTopics
		}}
	/>
</div>