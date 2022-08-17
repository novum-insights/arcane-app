import { getStxBalance } from "$lib/client/api";
import { getBNS, resolveBNS } from "$lib/server/gql";
import type { Load } from "@sveltejs/kit";
import { validateStacksAddress } from "micro-stacks/crypto"

export const load: Load = async ({ params }) => {
    const { slug } = params
    const address = validateStacksAddress(slug) ? slug : await resolveBNS(slug);
    const bns = address && await getBNS(address);
    const total_stx = address && await getStxBalance(address)
    const page_slug = bns ? bns[0] : address
    return {
        address,
        bns,
        total_stx,
        page_slug
    }
}