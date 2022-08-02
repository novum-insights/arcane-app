import { resolveBNS } from "$lib/server/_gql";
import { validateAddress } from "$lib/server/_stacks";
import { getAssets } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";

// export const get: RequestHandler = async ({ request, params }) => {
//     const { address } = params
//     if (validateAddress(address)) {
//         const results = await getAssets(address)
//         return {
//             body: {
//                 address,
//                 results
//             }
//         }
//     }
//     else {
//         return {
//             body: {
//                 address: "Invalid address"
//             }
//         }
//     }
// }

export const GET: RequestHandler = async ({ params }) => {
    const { address } = params
    if (!validateAddress(address)) {
        const _address = await resolveBNS(address);
        const data = await getAssets(_address)
        return {
            body: {
                data,
                address: _address
            }
        }
    }
    else {
        const data = await getAssets(address)
        return {
            body: {
                data,
                address
            }
        }
    }
}