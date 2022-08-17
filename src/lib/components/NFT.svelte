<script lang="ts">
	import { getCollectionMetadata } from '$lib/client/gql';

	export let meta_data: any;
	export let nft_data: any;
	export let floor: number;
	export let debug = false;

	let hasError = false;
	$: link = async (contract_id: string) => await getCollectionMetadata(contract_id);
	const handleError = (ev: any) => (hasError = true);
</script>

{#if debug}
	<code>
		<pre class="text-[0.5em]">{JSON.stringify(meta_data, null, 2)}</pre>
	</code>
{/if}

{#if meta_data}
	{@const src = meta_data.fixed_image_url ? meta_data.fixed_image_url : meta_data.fixed_asset_url}
	{#await link(nft_data.collection_contract_id) then sth}
		<div class="card">
			{#if !hasError}
				<div class="img-card">
					<img class="object-cover aspect-square" {src} alt="" on:error={handleError} />
					<div class="token">
						<div class="flex items-center justify-between">
							<div class="grid gap-4">
								<a
									href="https://gamma.io/collections/{sth[0].slug}/{nft_data.token_id}"
									target="_blank"
									class="text-sky-300"
								>
									<p class="uppercase">
										{nft_data.asset_id} - # {nft_data.token_id}
									</p>
								</a>
								<p class="text-lg">
									floor: {Math.round(floor * 100) / 100} STX
								</p>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="media-card">
					<video controls muted paused class="aspect-square">
						<source {src} type="video/mp4" />
					</video>
					<div class="flex items-center justify-between">
						<div class="grid gap-4">
							<a
								href="https://gamma.io/collections/{sth[0].slug}/{nft_data.token_id}"
								target="_blank"
								class="text-sky-300"
							>
								<p class="uppercase">
									{nft_data.asset_id} - # {nft_data.token_id}
								</p>
							</a>
							<p class="text-lg">
								floor: {Math.round(floor * 100) / 100} STX
							</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/await}
{/if}

<style lang="postcss">
	.card {
		@apply p-2 bg-gray-800 rounded-lg shadow-white;
	}
</style>
