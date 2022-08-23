<script lang="ts">
	import { STXtoNumber } from '$lib/utils';

	export let data: any;
</script>

<div class="grid grid-cols-6 gap-4 py-4">
	{#each data.featured as { name, image, prices, slug }}
		{#if slug}
			<a href="https://create.gamma.io/collection/{slug}" target="_blank">
				<div class="p-2 bg-gray-800 rounded-lg shadow-white">
					<img src={image} alt="" class="object-cover aspect-square" />
					<p class="text-sm">
						{name}
					</p>
					<p class="text-sm">
						({STXtoNumber(prices)})
					</p>
				</div>
			</a>
		{/if}
	{/each}
</div>
