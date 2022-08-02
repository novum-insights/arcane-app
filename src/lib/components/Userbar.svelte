<script lang="ts">
	import { base } from '$app/paths';
	import Stats from './Stats.svelte';
	import { page } from '$app/stores';
	import { copy } from 'svelte-copy';

	export let address: string;
	export let stats: any;
	const links = [
		['NFT', `${base}/${address}/nft`],
		['DeFi', `${base}/${address}/defi`]
	];
</script>

<div class="py-4">
	<div class="flex justify-between items-center">
		<ul class="flex gap-4">
			{#each links as [name, link]}
				<li
					class="bg-gray-800 p-2 rounded-lg"
					class:bg-sky-700={$page.url.pathname.includes(link)}
				>
					<a href={link}>{name}</a>
				</li>
			{/each}
		</ul>
		<div class="flex items-center">
			<!-- <p>{address}</p> -->
			<a href="https://explorer.stacks.co/address/{address}?chain=mainnet" target="_blank"
				>{address}</a
			>
			<button use:copy={`${address}`} on:svelte-copy={(event) => alert(event.detail)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
			</button>
		</div>
	</div>

	<Stats {stats} />
</div>
