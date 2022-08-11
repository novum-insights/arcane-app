import { getFloorMultiple } from "$lib/server/_gql";
import { getSum } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const { collection_contract_id } = await request.json()
    const arr = await arrayMap(collection_contract_id)
    const portfolio = getSum(arr)
    return {
        body: { portfolio }
    }
}

const arrayMap = async (array: string[]) => {
    const unique = [...new Set(array)];
    const map = new Map();
    unique.forEach(item => map.set(item, array.filter(i => i === item).length));
    const floors = await getFloorMultiple(unique);
    const floorMap = new Map()
    floors.forEach((floor: number, index: number) => {
        floorMap.set(unique[index], floor * map.get(unique[index]))
    })

    return Array.from(floorMap.values())
}