<script lang="ts">
	import { stats_data } from '$lib/stores';
</script>

<div>
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		{#each $stats_data as { title, stat, hint }}
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
