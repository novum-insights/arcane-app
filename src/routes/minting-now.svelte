<script lang="ts">
	import { STXtoNumber } from '$lib/utils/helpers';

	export let featured: any;
	console.log(featured);
</script>

<div class="grid grid-cols-8 gap-4 py-4">
	{#each featured as { name, image, prices, slug }}
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

<!-- <ul>
	{#each featured as { name, image, total, websiteText, active, slug, deployedTransactionUrl, prices }}
		{#if slug}
			<li>
	
			</li>
		{/if}
	{/each}
</ul> -->
