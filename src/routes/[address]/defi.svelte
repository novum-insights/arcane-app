<script lang="ts">
	import {
		getAlexLabPirceByToken,
		getAlexLabPrices,
		getAlexTokens,
		getStxBalance,
		tokenMap
	} from '$lib/utils/helpers';
	import { stats_data } from '$lib/utils/stores';
	import { onMount } from 'svelte';

	export let fungible_tokens: any;
	export let address: string;

	$: total_stx = 0;
	$: total_tokens = fungible_tokens.length;
	const getStxData = async () => {
		total_stx = await getStxBalance(address);
	};

	const calculateFolio = async () => {
		const tokenPrices = fungible_tokens.map(
			async (e: any) => await getAlexLabPirceByToken(e.symbol)
		);
		const priceData = await Promise.all(tokenPrices);
		console.log({ fungible_tokens });
		const qualifyingTokens = fungible_tokens
			.map((e: any) => tokenMap[e.symbol])
			.filter((item: string) => item);

		console.log(qualifyingTokens, priceData);
	};

	$: if (address) {
		getStxData();
	}

	$: defiStats = [
		{
			title: 'Total Tokens',
			stat: total_tokens
		},
		{
			title: 'Portfolio (USD)',
			stat: 0
		},
		{
			title: 'Total STX',
			stat: total_stx ? total_stx.toFixed(2) : 0
		}
	];
	$: $stats_data = defiStats;

	onMount(() => {
		calculateFolio();
	});
</script>

<div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-8 gap-4">
	{#each fungible_tokens as { balance, decimals, image_canonical_uri, name }}
		<div class="p-2 bg-gray-800 rounded-lg shadow-white">
			<p class="text-center text-sm uppercase">
				{name}
			</p>
			<img
				src={image_canonical_uri
					? image_canonical_uri
					: 'https://stacksdataverse.herokuapp.com/_app/immutable/assets/novum_white-8a56a124.svg'}
				alt=""
				class="object-contain aspect-square p-4"
			/>
			<p class="text-center text-lg text-green-600">
				{Number(balance * 10 ** -decimals).toFixed(0)}
			</p>
		</div>
	{/each}
</div>
