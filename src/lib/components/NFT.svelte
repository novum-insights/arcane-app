<script lang="ts">
	import { getCollectionMetadata } from '$lib/client/gql';

	import NftCard from './NFTCard.svelte';

	export let meta_data: any;
	export let data: any;
	export let floor: number;
	export let debug = false;
	let hasError = false;
	console.log(data);
	$: link = async (contract_id: string) => await getCollectionMetadata(contract_id);
</script>

{#if debug}
	<code>
		<pre class="text-[0.5em]">{JSON.stringify(meta_data, null, 2)}</pre>
	</code>
{/if}

{#if meta_data.fixed_image_url && !hasError}
	<NftCard src={meta_data.fixed_image_url} bind:hasError>
		<div class="flex items-center justify-between">
			<div class="grid gap-4">
				{#await link(data.collection_contract_id) then sth}
					<a href="https://gamma.io/collections/{sth[0].slug}/{data.token_id}" target="_blank" class="text-sky-300">
						<p class="uppercase">
							{data.asset_id} - # {data.token_id}
						</p>
					</a>
					<p class="text-lg">
						{Math.round(floor * 100) / 100} STX
					</p>
				{/await}
			</div>
		</div>
	</NftCard>
{/if}
{#if meta_data.fixed_asset_url && !hasError}
	<NftCard src={meta_data.fixed_asset_url} bind:hasError>
		<div class="flex items-center justify-between">
			<div class="grid gap-4">
				{#await link(data.collection_contract_id) then sth}
					<a href={sth.slug} target="_blank" class="text-sky-300">
						<p class="uppercase">
							{data.asset_id} - # {data.token_id}
						</p>
					</a>
					<p class="text-lg">
						{Math.round(floor * 100) / 100} STX
					</p>
				{/await}
			</div>
		</div>
	</NftCard>
{/if}

{#if hasError}
	<div class="card">
		<video controls muted paused class="aspect-square">
			<source src={meta_data.fixed_asset_url} type="video/mp4" />
		</video>
		<div class="flex items-center justify-between">
			<div class="grid gap-4">
				{#await link(data.collection_contract_id) then sth}
					<a href={sth.slug} target="_blank" class="text-sky-300">
						<p class="uppercase">
							{data.asset_id} - # {data.token_id}
						</p>
					</a>
					<p class="text-lg">
						{Math.round(floor * 100) / 100} STX
					</p>
				{/await}
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.card {
		@apply p-2 bg-gray-800 rounded-lg shadow-white;
	}
</style>
