import { getAPI } from "$lib/utils";

import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    const URL =
        'https://api.coingecko.com/api/v3/coins/blockstack?localization=false&community_data=false&developer_data=false';
    const response = await getAPI(URL);
    const { market_data } = response;
    const { current_price } = market_data;
    const { dehydratedState } = locals.session.data
    await locals.session.set({ dehydratedState })
    return {
        price: current_price.usd as number,
        dehydratedState
    }
}
