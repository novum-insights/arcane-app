import { getAlexLabPirceByToken, getTokens } from "$lib/client/api";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ parent }) => {
    const _parent: any = await parent()
    const { address, price } = _parent
    const fungible_tokens = await getTokens(address) || [];
    const total_tokens = fungible_tokens.length;

    const total_folio = await calculateFolio(fungible_tokens);
    // console.log(total_folio)
    return {
        ..._parent,
        total_folio,
        total_tokens,
        fungible_tokens,
    }
}

const calculateFolio = async (fungible_tokens: any[]) => {

    const priceData = fungible_tokens.map(async (e: any) => {
        const { avg_price_usd, token }: any = await getAlexLabPirceByToken(e.symbol);
        const balance = e.balance * 10 ** -e.decimals;
        if (token) {
            const folio = balance * avg_price_usd;
            return {
                token,
                balance,
                folio
            };
        }
    });

    const folioData = (await Promise.all(priceData)).filter((e) => e);
    return folioData.reduce((acc, e: any) => acc + e.folio, 0);
};