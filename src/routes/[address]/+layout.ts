import type { LayoutLoad } from '@sveltejs/kit';
import { validateStacksAddress } from 'micro-stacks/crypto';
import { resolveBNS } from '$lib/server/_gql';

export const load: LayoutLoad = async ({ params }) => {
	const { address } = params;
	const _address = validateStacksAddress(address) ? address : await resolveBNS(address);
	return { address: _address };
};
