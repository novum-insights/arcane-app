<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { copy } from 'svelte-copy';
	import Stats from './Stats.svelte';

	let address = $page.data.address;
	let bns = $page.data.bns[0];
	const links = [
		['NFT', `${base}/${address}/nft`],
		['DeFi', `${base}/${address}/defi`]
	];
</script>

<div class="py-4">
	<div class="flex justify-between items-center">
		<ul class="flex gap-4">
			{#each links as [name, link]}
				<li class="bg-gray-800 p-2 rounded-lg" class:bg-sky-700={$page.url.pathname.includes(link)}>
					<a href={link}>{name}</a>
				</li>
			{/each}
		</ul>
		<div class="flex gap-2">
			<!-- <p>{address}</p> -->
			{#if bns}
				<div class="flex gap-2 items-center">
					<a href="https://gamma.io/{bns}" target="_blank">
						{bns}
					</a>
					<button use:copy={`${bns}`}>
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
			{/if}

			<div class="flex gap-2 items-center">
				<a href="https://explorer.stacks.co/address/{address}?chain=mainnet" target="_blank">
					{address}
				</a>
				<button use:copy={`${address}`}>
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
	</div>

	<Stats />
</div>
