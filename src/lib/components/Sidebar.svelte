<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import WalletConnect from './WalletConnect.svelte';
	import { getAccount } from '@micro-stacks/svelte';
	const account = getAccount();

	const links = [
		['', `${base}`],
		['About', `${base}/about`],
		['Explore', `${base}/explore`],
		['Minting Now', `${base}/minting-now`]
	];

	const price = $page.data.price;
</script>

<div class="flex flex-col w-64 h-100 py-8 border-r bg-gray-800 border-gray-600">
	<a href="{base}/.">
		<h2 class="text-3xl font-semibold text-center text-white uppercase">Arcane</h2>
		<p class="text-xs text-center">Stacks portfolio tracker</p>
	</a>
	<div class="flex flex-col items-center mt-6 -mx-2">
		<h4 class="mx-2 mt-2 font-medium">
			1 STX ~(${Number(price).toFixed(2)})
		</h4>
	</div>

	<div class="flex flex-col justify-between flex-1 mt-6">
		<nav>
			{#each links as [name, link]}
				<a
					class="flex items-center px-4 py-2 text-white"
					href={link}
					class:bg-sky-900={link === $page.url.pathname}
				>
					<span class="mx-4 font-medium">{name}</span>
				</a>
			{/each}
			{#if $account.stxAddress}
				<a
					class="flex items-center px-4 py-2 text-white"
					href={`${base}/${$account.stxAddress}/nft`}
					class:bg-sky-900={$page.url.pathname.includes($account.stxAddress)}
				>
					<span class="mx-4 font-medium">Profile</span>
				</a>
			{/if}
			<!-- <button class="p-2 ml-6 bg-blue-700 text-white rounded-lg"> Connect Hiro wallet </button> -->
			<WalletConnect />
		</nav>
	</div>
</div>
