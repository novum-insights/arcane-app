<script lang="ts">
	import { stx_price } from '$lib/utils/stores';
	export let stats: any = [];
</script>

<div>
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		{#each stats as { title, stat, hint }}
			<div class="px-4 py-5 bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
				<dt class="text-sm font-medium text-white truncate">{title}</dt>
				<dd class="mt-1 text-3xl font-semibold text-white">
					{stat}
				</dd>
				{#if hint}
					<dt class="text-sm font-medium text-gray-500 truncate">
						{hint}
					</dt>
				{/if}
			</div>
		{/each}
	</dl>
</div>
