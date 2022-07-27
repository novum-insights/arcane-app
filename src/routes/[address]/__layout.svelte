<script lang="ts" context="module">
	import Userbar from '$lib/components/Userbar.svelte';
	import { getAssets, getStxBalance } from '$lib/utils/helpers';

	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ params }) => {
		const { address } = params;
		return {
			props: { address }
		};
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';

	export let address: string;

	$: total_stx = 0;
	$: portfolio = 0;
	$: total_nfts = 0;
	const getStxData = async () => {
		total_stx = await getStxBalance(address);
	};

	const getPortfolioFloor = async () => {
		const data = await getAssets(address);
		const contractArray =
			data && data.map(({ collection_contract_id }: any) => collection_contract_id);
		total_nfts = contractArray.length;
		const url = `${base}/api/getfloors`;
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					collection_contract_id: contractArray
				})
			});
			const _data = await response.json();
			portfolio = _data.portfolio;
		} catch (error) {}
	};

	$: if (address) {
		getStxData();
		getPortfolioFloor();
	}
</script>

<main class="px-16 h-screen">
	<Userbar {address} {total_stx} {portfolio} {total_nfts} />
	<slot />
</main>
