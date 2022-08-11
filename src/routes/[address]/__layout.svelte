<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { validateStacksAddress } from 'micro-stacks/crypto';
	import { resolveBNS } from '$lib/server/_gql';

	export const load: Load = async ({ params }) => {
		const { address } = params;
		const _address = validateStacksAddress(address) ? address : await resolveBNS(address);
		return {
			props: { address: _address }
		};
	};
</script>

<script lang="ts">
	import { stats_data } from '$lib/utils/stores';
	import Userbar from '$lib/components/Userbar.svelte';

	export let address: string;

	$: stats = $stats_data;
</script>

<main class="px-16 h-100">
	{#if stats}
		<Userbar {address} {stats} />
	{/if}
	<slot />
</main>
