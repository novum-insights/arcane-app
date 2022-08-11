<script lang="ts">
	import { getAuth } from '@micro-stacks/svelte';

	const auth = getAuth();

	let response: any;
	$: label = $auth.isRequestPending
		? 'Loading...'
		: $auth.isSignedIn
		? 'Sign out'
		: 'Connect Stacks wallet';

	function onClick() {
		if ($auth.isSignedIn) {
			$auth.signOut();
		} else {
			$auth.openAuthRequest();
		}
	}
</script>

<button on:click={onClick} class="p-2 mt-2 ml-6 bg-blue-700 text-white rounded-lg">
	{label}
</button>
