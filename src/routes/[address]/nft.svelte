<script lang="ts">
	import { base } from '$app/paths';

	import Table from '$lib/components/Table.svelte';
	import { getAssets, getStxBalance } from '$lib/utils/helpers';
	import { stx_price, stats_data } from '$lib/utils/stores';

	export let data: any;
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

	$: NFTstats = [
		{
			title: 'Total NFTs',
			stat: total_nfts
		},
		{
			title: 'Portfolio (STX)',
			stat: portfolio ? portfolio.toFixed(2) : 0,
			hint: `${(Number($stx_price) * portfolio).toFixed(2)} USD`
		},
		{
			title: 'Total STX',
			stat: total_stx ? total_stx.toFixed(2) : 0
		}
	];

	$: $stats_data = NFTstats;
</script>

<div class="grid">
	<Table {data} />
</div>
