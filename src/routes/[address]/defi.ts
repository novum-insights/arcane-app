import { getTokenMetadata, getTokens } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";
import { validateAddress } from "$lib/server/_stacks";
import { resolveBNS } from "$lib/server/_gql";
export const GET: RequestHandler = async ({ params }) => {
    const { address } = params;
    if (!validateAddress(address)) {
        const _address = await resolveBNS(address);
        const fungible_tokens = await getTokens(_address);
        return {
            body: {
                fungible_tokens,
                address: _address
            }
        }
    }
    else {
        const fungible_tokens = await getTokens(address);
        return {
            body: {
                fungible_tokens,
                address
            }
        }
    }
}