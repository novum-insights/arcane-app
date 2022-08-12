import { getFloorMultiple } from "$lib/server/_gql";
import { getSum } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const { collection_contract_id } = await request.json()
    const arr = await arrayMap(collection_contract_id) || [0]
    const portfolio = getSum(arr)
    return {
        body: { portfolio }
    }
}

const arrayMap = async (array: string[]) => {
    if (array.length === 0) return [0]
    const unique = [...new Set(array)];
    const map = new Map();
    unique.forEach(item => map.set(item, array.filter(i => i === item).length));
    const floors = await getFloorMultiple(unique);
    const floorMap: Map<string, number> = new Map(floors.map(({ collection_contract_id, price_amount }: any) => [collection_contract_id, map.get(collection_contract_id) * price_amount * 10e-7]))
    return [...floorMap.values()]
}