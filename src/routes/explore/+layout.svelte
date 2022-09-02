<script lang="ts">
	import { base } from '$app/paths';

	export let data: any;
	// $: ({ links } = data);
	let { links } = data;
</script>

<div class="grid grid-cols-3 gap-4 py-4">
	{#each links as { link, text, color, icon }}
		<div style:background-color={color} class="p-4 rounded-lg">
			<a href="{base}/explore/{link}" class="flex justify-between items-center">
				<span> {text} </span>
				{@html icon}
			</a>
		</div>
	{/each}
</div>

<slot />
