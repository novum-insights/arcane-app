import { getAssets } from "$lib/client/api";
import { getFloorMultiple } from "$lib/server/gql";
import { getSum } from "$lib/utils";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ parent }) => {
    const _parent: any = await parent()
    const { address, price, total_stx } = _parent
    const assets = address && await getAssets(address) || [];
    const collected = assets.length
    const contractArray = assets && assets.map(({ collection_contract_id }: any) => collection_contract_id)
    const floor_map = contractArray.length && await arrayMap(contractArray)
    const floor_map_obj = floor_map.size && Object.fromEntries(floor_map)

    const portfolio_stx = total_stx ? floor_map.size && getSum([...floor_map.values()]).toFixed(2) : 0
    const portfolio_usd = (Number(portfolio_stx) * price).toFixed(2)
    return {
        ..._parent,
        floor_map_obj,
        portfolio_stx,
        portfolio_usd,
        collected,
        assets,
    }
}
const arrayMap = async (array: string[]) => {
    if (array.length === 0) return [0]
    const unique = [...new Set(array)];
    const map = new Map();
    unique.forEach(item => map.set(item, array.filter(i => i === item).length));
    const floors = await getFloorMultiple(unique);
    const floorMap: Map<string, number> = new Map(floors.map(({ collection_contract_id, price_amount }: any) => [collection_contract_id, map.get(collection_contract_id) * price_amount * 10e-7]))

    return floorMap;
}