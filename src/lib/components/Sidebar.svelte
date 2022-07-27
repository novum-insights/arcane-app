<script lang="ts">
	import { base } from '$app/paths';

	export let price: string = '';

	const links = [
		['About', `${base}/about`],
		['Explore', `${base}/explore`]
	];
</script>

<div class="flex flex-col w-64 h-100 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
	<a href="{base}/.">
		<h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white uppercase">
			Arcane
		</h2>
	</a>
	<p class="text-xs text-center">Stacks portfolio tracker</p>
	<div class="flex flex-col items-center mt-6 -mx-2">
		<h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
			1 STX ~(${Number(price).toFixed(2)})
		</h4>
	</div>

	<div class="flex flex-col justify-between flex-1 mt-6">
		<nav>
			{#each links as [name, link]}
				<a class="flex items-center px-4 py-2 text-white" href={link}>
					<span class="mx-4 font-medium">{name}</span>
				</a>
			{/each}
			<button class="p-2 ml-6 bg-blue-700 text-white rounded-lg"> Connect Hiro wallet </button>
		</nav>
	</div>
</div>
