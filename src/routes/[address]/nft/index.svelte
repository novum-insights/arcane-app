<!-- <script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ params }) => {
		const { address } = params;
		return {
			props: { address }
		};
	};
</script> -->
<script lang="ts">
	import { browser } from '$app/env';
	import { base } from '$app/paths';
	import Table from '$lib/components/Table.svelte';

	import { getAssets, getStxBalance } from '$lib/utils/helpers';
	import { onMount } from 'svelte';

	export let data: any;
</script>

<div class="grid">
	<Table {data} />
</div>
<!-- <ul>
	{#each data as { collection_contract_id, token_id }}
		<li>
			<a href="/{address}/{collection_contract_id}/{token_id}">
				{collection_contract_id}/{token_id}
			</a>
		</li>
	{/each}
</ul> -->
