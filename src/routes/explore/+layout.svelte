<script lang="ts">
	import { base } from '$app/paths';

	export let data: any;
</script>

<div class="grid grid-cols-3 gap-4 py-4">
	{#each data.links as { link, text, color, icon }}
		<div class="bg-{color}-700 p-4 rounded-lg">
			<a href="{base}/explore/{link}" class="flex justify-between items-center">
				<span> {text} </span>
				{@html icon}
			</a>
		</div>
	{/each}
</div>

<slot />
