<script lang="ts">
	import SCPEmblem from "$lib/icons/SCPEmblem.svelte"
	import { m } from "$lib/paraglide/messages"
	import { Avatar, NavigationMenu } from "bits-ui"
	import { ChevronDown, Earth, Newspaper, Search } from "lucide-svelte"

	const { user }: {
		user?: {
			id: string
			username: string
			avatarUrl?: string
		}
	} = $props()

	type Link = {
		href: string,
		title: string,
		description: string
	}

	// TODO: in the future, allow forumLinks and wikiLinks to be passed in from the backend so that
	// multiple translations can be passed in and administrators can change the wiki links in the navbar
	const forumLinks: Link[] = [
		{
			href: "/forum",
			title: "Forum",
			description: "Discuss anything SCP-foundation related here with the community!"
		},
		{
			href: "/rules",
			title: "Rules",
			description: "Community rules"
		},
		{
			href: "/announcements",
			title: "Sitewide announcements",
			description: "Announce new pages, suggest policy, and interact with new site members"
		}
	]

	const wikiLinks: Link[] = [
		{
			href: "/joke-scps",
			title: "Joke SCPs",
			description: "Joke articles on the SCP wiki"
		},
		{
			href: "/tales",
			title: "Tales",
			description: "Tales in the SCP Foundation universe"
		},
		{
			href: "/random-scp",
			title: "Random SCP",
			description: "Random SCP"
		}
	]

	function toRomanNumeral(value: number): string {
		switch(value) {
			case 0:
				return "0"
			case 1:
				return "I"
			case 2:
				return "II"
			case 3:
				return "III"
			case 4:
				return "IV"
			case 5:
				return "V"
			case 6:
				return "VI"
			case 7:
				return "VII"
			case 8:
				return "VIII"
			case 9:
				return "IX"
			case 10:
			default:
				return "X"
		}
	}
</script>

<div class="rounded-b-box p-2">
	<nav
		class="navbar sticky top-0 rounded-box border-b border-base-content/10 bg-base-200 px-4 shadow-lg shadow-primary transition"
	>
		<div class="navbar-start">
			<NavigationMenu.Root class="relative z-10 flex w-full" orientation="horizontal">
				<NavigationMenu.List class="navbar gap-1">
					<NavigationMenu.Item value="community">
						<NavigationMenu.Trigger class="btn cursor-default btn-ghost btn-sm"
							><Newspaper class="w-[1em]" />{m.navbar_community()}<ChevronDown
								class="w-[1em]"
							/></NavigationMenu.Trigger
						>
						<NavigationMenu.Content
							class="data-[motion=from-end]:animate-enter-from-right data-[motion=from-start]:animate-enter-from-left data-[motion=to-end]:animate-exit-to-right data-[motion=to-start]:animate-exit-to-left absolute top-0 left-0 w-full sm:w-auto"
						>
							<div class="w-150 p-4">
								<div class="text-xl font-bold p-4 select-none">{m.navbar_community()}</div>
								<ul
									class="m-0 grid list-none gap-x-2.5 gap-y-2.5 grid-cols-2 grid-rows-2 bg-base-200 justify-items-stretch"
								>
									{#each forumLinks as link}
										<li class="contents">
											<NavigationMenu.Link
												class="p-4 hover:bg-base-300 rounded-box transition block border border-base-content/10 hover:border-primary"
												href={link.href}
											>
												<div class="text-sm font-medium leading-none flex gap-2 items-center">{link.title}</div>
												<p class="text-base-content/50 line-clamp-2 text-sm leading-snug">
													{link.description}
												</p>
											</NavigationMenu.Link>
										</li>
									{/each}
								</ul>
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item value="wiki">
						<NavigationMenu.Trigger class="btn cursor-default btn-ghost btn-sm">
							<Earth class="w-[1em]" />
							{m.navbar_wiki()}
							<ChevronDown class="w-[1em]" />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content class="data-[motion=from-end]:animate-enter-from-right data-[motion=from-start]:animate-enter-from-left data-[motion=to-end]:animate-exit-to-right data-[motion=to-start]:animate-exit-to-left absolute top-0 left-0 w-full sm:w-auto">
							<div class="w-150 p-4">
								<div class="text-xl font-bold p-4 select-none">{m.navbar_wiki()}</div>
								<ul
									class="m-0 grid gap-2.5 grid-cols-2 grid-rows-3 bg-base-200"
								>
									<li class="contents">
										<div class="row-span-3 border border-base-content/10 rounded-box hover:border-primary transition p-4 hover:bg-base-300">
											<div class="font-medium leading-none select-none">{m.navbar_scpBySeries()}</div>
											<ol class="text-base-content/50 text-sm list-disc ms-4">
												{#each [1,2,3,4,5,6,7,8,9,10] as serie}
													<li class="my-1"><a href="/series/{serie}">{m.navbar_seriesN({ series: toRomanNumeral(serie) })}</a></li>
												{/each}
											</ol>
										</div>
									</li>
									{#each wikiLinks as link}
										<li class="contents">
											<NavigationMenu.Link
												class="p-4 hover:bg-base-300 rounded-box transition block border border-base-content/10 hover:border-primary"
												href={link.href}
											>
												<div class="text-sm font-medium leading-none flex gap-2 items-center">{link.title}</div>
												<p class="text-base-content/50 line-clamp-2 text-sm leading-snug">
													{link.description}
												</p>
											</NavigationMenu.Link>
										</li>
									{/each}
								</ul>
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item value="search">
						<NavigationMenu.Link class="btn cursor-default btn-ghost btn-sm" href="/search"
							><Search class="w-[1em]" />{m.navbar_search()}</NavigationMenu.Link
						>
					</NavigationMenu.Item>
				</NavigationMenu.List>
				<div class="absolute top-full left-0 flex w-150 justify-center perspective-[2000px]">
					<NavigationMenu.Viewport
						class="text-popover-foreground bg-base-200 data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in relative mt-2.5 h-(--bits-navigation-menu-viewport-height) origin-[top_center] overflow-hidden rounded-md border border-base-content/10 shadow-2xl shadow-primary transition-[width,height] duration-200 w-150"
					/>
				</div>
			</NavigationMenu.Root>
		</div>
		<a href="/" class="navbar-center flex items-center gap-4 select-none">
			<SCPEmblem class="h-24" />
			<div>
				<div class="font-bauhaus text-4xl">SCP Foundation</div>
				<div class="font-mono">Secure, Contain, Protect</div>
			</div>
		</a>
		<div class="navbar-end flex h-full! items-start gap-2">
			{#if !user}
				<a href="/login" class="btn btn-outline btn-sm btn-primary">{m.login_signIn()}</a>
				<a href="/register" class="btn btn-outline btn-sm btn-secondary">{m.register_register()}</a>
			{:else}
				<a href="/profile/{user.id}" class="flex items-center gap-2">
					<Avatar.Root class="avatar">
						<div class="w-8 rounded-full">
							<Avatar.Image src={user.avatarUrl} />
							<Avatar.Fallback
								class="flex h-full items-center justify-center rounded-box border border-base-content/10 bg-base-200 select-none"
								>{user.username[0]}</Avatar.Fallback
							>
						</div>
					</Avatar.Root>
					<div class="text-xs">
						{user.username}
					</div>
				</a>
			{/if}
		</div>
	</nav>
</div>
