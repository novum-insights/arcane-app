<script lang="ts">
	import { stats_data } from '$lib/stores';

	export let data: any;

	$stats_data = [
		{
			title: 'Total Tokens',
			stat: data.total_tokens
		},
		{
			title: 'Portfolio (USD)',
			stat: data.total_folio.toFixed(2)
		},
		{
			title: 'Total STX',
			stat: data.total_stx
		}
	];
</script>

<div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-8 gap-4">
	{#each data.fungible_tokens as { balance, decimals, image_canonical_uri, name }}
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
