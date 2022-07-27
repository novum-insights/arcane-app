<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const { user } = params;
		console.log(user);
	};
</script>
