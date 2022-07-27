<script lang="ts">
	import { base } from '$app/paths';
	import { ipfsUriToHttp } from '$lib/utils/helpers';
	import { onMount } from 'svelte';
	import Nft from './NFT.svelte';
	import Stats from './Stats.svelte';
	export let data: any;

	const floorPrice = async (collection_contract_id: string) => {
		return await fetch(`${base}/api/getfloor`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collection_contract_id
			})
		}).then((e) => e.json());
	};
	$: prev = 0;
	$: next = 16;
	$: offset = 16;
	$: currentData = data.slice(prev, next);
	$: currentRange = (prev: number, next: number) => {
		currentData = data.slice(prev, next);
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
	<!-- <div
		class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
	>
		<table class="w-full divide-y divide-gray-900">
			<thead class="bg-slate-700">
				<tr>
					<th
						scope="col"
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
					>
						Collection
					</th>
					<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Token</th>
					<th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-white">
						Floor Price (STX)
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-900 bg-slate-700">
				{#each currentData as { asset_id, token_id, fully_qualified_token_id }}
					<tr>
						<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
							<a href="https://gamma.io/collections/{fully_qualified_token_id}" target="_blank">
								{asset_id}
							</a>
						</td>
						<td class="whitespace-nowrap px-3 py-4 text-sm text-white">{token_id}</td>
						<td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
							{#await floorPrice(asset_id)}
								<p>loading...</p>
							{:then { floor }}
								{floor.toFixed(2)}
							{/await}
						</td>
					</tr>
				{/each}

			</tbody>
		</table>
	</div> -->
	<div class="grid grid-cols-4 gap-4">
		{#each currentData as { asset_id, token_id, fully_qualified_token_id, collection_contract_id }}
			<div>
				{#await nftData(collection_contract_id, token_id)}
					<p>loading...</p>
				{:then data}
					{#await floorPrice(asset_id) then { floor }}
						{@const meta_data = dataCleanup(data.token_metadata)}
						<Nft {meta_data} {data} {floor} />
					{/await}
				{/await}
			</div>
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
