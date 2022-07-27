<script lang="ts">
	import { stx_price } from '$lib/utils/stores';

	export let total_nfts = 0;
	export let portfolio = 0;
	export let total_stx = 0;
</script>

<div>
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		<div class="px-4 py-5 bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
			<dt class="text-sm font-medium text-white truncate">Total NFTs</dt>
			<dd class="mt-1 text-3xl font-semibold text-white">{total_nfts}</dd>
		</div>

		<div class="px-4 py-5 bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
			<dt class="text-sm font-medium text-white truncate">Portfolio (STX)</dt>
			<dd class="mt-1 text-3xl font-semibold text-white">
				{portfolio ? portfolio.toFixed(2) : 0}
			</dd>
			<dt class="text-sm font-medium text-gray-500 truncate">
				{(Number($stx_price) * portfolio).toFixed(2)} USD
			</dt>
		</div>

		<div class="px-4 py-5 bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
			<dt class="text-sm font-medium text-white truncate">Total STX</dt>
			<dd class="mt-1 text-3xl font-semibold text-white">{total_stx.toFixed(2)}</dd>
		</div>
	</dl>
</div>
