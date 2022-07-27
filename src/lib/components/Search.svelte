<script lang="ts">
	import { goto } from '$app/navigation';

	import { base } from '$app/paths';

	export let address: string;

	const searchAddress = async (address: string) => {
		address ? goto(`${base}/${address}/nft`) : goto(`/`);
	};
</script>

<div class="">
	<form on:submit|preventDefault={() => searchAddress(address)}>
		<input
			type="text"
			class="border border-gray-500 bg-gray-900 p-2 rounded-lg outline-none focus-none w-full"
			placeholder="Search by wallet address"
			bind:value={address}
		/>
	</form>
</div>
