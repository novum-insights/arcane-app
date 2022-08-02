<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const url =
			'https://api.coingecko.com/api/v3/coins/blockstack?localization=false&community_data=false&developer_data=false';
		const response = await fetch(url);
		const { market_data } = await response.json();

		const { current_price } = market_data;

		return {
			props: { price: current_price.usd }
		};
	};
</script>

<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/stores';
	import { stx_price } from '$lib/utils/stores';
	let address = $page.params.address;
	export let price: string;
	$stx_price = price;
</script>

<svelte:head>
	<title>Arcane - Stacks portfolio tracker</title>
</svelte:head>

<div class="flex">
	<Sidebar {price} />
	<div class="p-4 w-full h-screen">
		<Search bind:address />
		<slot />
	</div>
</div>

<style lang="postcss">
	@import '../app.css';
</style>
