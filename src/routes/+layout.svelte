<script>
	import Loading from '$lib/components/Loading.svelte';
	import Search from '$lib/components/Search.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { mountClient } from '@micro-stacks/svelte';
	import { onPersistState, onSignOut } from '$lib/fetchers';
	export let data;
	const { dehydratedState } = data;
	mountClient({
		appName: 'Novum Defi',
		appIconUrl: 'https://a.storyblok.com/f/106212/x/01ae91185c/novum_purple.svg',
		onPersistState,
		onSignOut,
		dehydratedState
	});
</script>

<svelte:head>
	<title>Arcane - Stacks portfolio tracker</title>
</svelte:head>

<div class="flex">
	<Loading />
	<Sidebar />
	<div class="p-4 w-screen h-screen">
		<Search />
		<slot />
	</div>
</div>

<style lang="postcss">
	@import '../app.postcss';
</style>
