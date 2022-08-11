<script>
	import WalletConnect from '$lib/components/WalletConnect.svelte';
	import { getAccount } from '@micro-stacks/svelte';
	const account = getAccount();
</script>

<div class="grid place-items-center py-12">
	<div class="justify-center text-center w-[600px] grid gap-4">
		<h1>Arcane - Stacks portfolio tracker</h1>
		<p>Track NFT portfolio and DeFi of stacks wallets</p>
	</div>
	{#if !$account}
		<WalletConnect />
	{/if}
</div>
