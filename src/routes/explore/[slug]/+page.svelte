<script lang="ts">
	export let data: any;

	export let errors: any;
	$: console.log({ errors });

	$: ({ slug, top_collectors, block_height } = data);
</script>

<p>Top Collectors since block:{block_height}</p>
<ul>
	{#each top_collectors as { address, marketplace_ft_transfers_sender_aggregate: { aggregate: { sum: { amount } } } }}
		<li><a class="text-sky-300" href="/{address}/nft">{address}</a> : ~{(amount * 1e-6).toFixed(0)} STX</li>
	{/each}
</ul>
