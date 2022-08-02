import { getTokenMetadata, getTokens } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
    const { address } = params;
    const fungible_tokens = await getTokens(address);

    return {
        body: {
            fungible_tokens,
            address
        }
    }
}