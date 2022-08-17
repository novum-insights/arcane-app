<script lang="ts">
	import Nft from '$lib/components/NFT.svelte';

	import { stats_data } from '$lib/stores';
	import { ipfsUriToHttp } from '$lib/utils';

	export let data: any;
	const { assets, floor_map_obj } = data;
	$stats_data = [
		{
			title: 'Total NFTs',
			stat: data.collected
		},
		{
			title: 'Portfolio (STX)',
			stat: data.portfolio_stx,
			hint: `${data.portfolio_usd} USD`
		},
		{
			title: 'Total STX',
			stat: data.total_stx
		}
	];

	$: prev = 0;
	$: next = 16;
	$: offset = 16;
	$: currentData = assets.slice(prev, next);
	$: currentRange = (prev: number, next: number) => {
		currentData = assets.slice(prev, next);
	};
	const nftData = async (collection_contract_id: string, token_id: string) => {
		const { data } = await fetch(
			`https://gamma.io/api/v1/collections/${collection_contract_id}/${token_id}`
		).then((e) => e.json());
		return data;
	};

	const dataCleanup = (object: any) => {
		const media_type = object.image_type !== null ? 'image' : 'video';
		const fixed_image_url = checkIfImageExists(object.image_url, object.image_protocol);
		const fixed_asset_url = checkIfAssetExists(object.asset_url, object.asset_protocol);
		return {
			...object,
			media_type,
			fixed_asset_url,
			fixed_image_url
		};
	};

	const checkIfImageExists = (image_url: string, image_protocol: string) => {
		const fixed_image_url = image_protocol === 'ipfs' ? ipfsUriToHttp(image_url) : image_url;
		return fixed_image_url;
	};

	const checkIfAssetExists = (asset_url: string, asset_protocol: string) => {
		const fixed_asset_url = asset_protocol === 'ipfs' ? ipfsUriToHttp(asset_url) : asset_url;
		return fixed_asset_url;
	};

</script>

<div class="h-[600px] overflow-auto">
	<div class="grid grid-cols-4 gap-4">
		{#each currentData as { asset_id, token_id, fully_qualified_token_id, collection_contract_id }}
			{#if floor_map_obj[collection_contract_id] !== undefined}
				{#await nftData(collection_contract_id, token_id)}
					<div class="aspect-square">
						<div class="h-full w-full animate-pulse bg-gray-700 rounded-lg" />
					</div>
				{:then nft_data}
					{@const meta_data = dataCleanup(nft_data.token_metadata)}
					{@const floor = floor_map_obj[collection_contract_id]}
					<Nft {meta_data} {nft_data} {floor} />
				{/await}
			{/if}
		{/each}
	</div>
	<div class="flex gap-4 justify-end py-4">
		<button
			class:hidden={prev === 0}
			on:click={() => {
				currentRange((prev -= offset), (next -= offset));
			}}
		>
			prev
		</button>
		<button
			class:hidden={next >= data.length}
			on:click={() => currentRange((prev += offset), (next += offset))}
		>
			next
		</button>
	</div>
</div>

<style lang="postcss">
	button {
		@apply bg-slate-800 text-white p-4 rounded-lg;
	}
</style>
