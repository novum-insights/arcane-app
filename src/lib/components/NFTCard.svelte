<script lang="ts">
	export let src: string;
	export let hasError = false;
	const handleError = (ev: any) => (hasError = true);
</script>

<div class="card">
	<img class="object-cover aspect-square" {src} alt="" on:error={handleError} />
	<div class="token">
		<slot />
	</div>
</div>

<style lang="postcss">
	.card {
		@apply p-2 bg-gray-800 rounded-lg shadow-white;
	}
</style>
