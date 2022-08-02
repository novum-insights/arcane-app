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
	import { stats_data } from '$lib/utils/stores';

	export let address: string;

	$: stats = $stats_data;
</script>

<main class="px-16 h-screen">
	{#if stats}
		<Userbar {address} {stats} />
	{/if}
	<slot />
</main>
