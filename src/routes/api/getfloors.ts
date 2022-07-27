import { getFloorMultiple } from "$lib/server/_gql";
import { getSum } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const { collection_contract_id } = await request.json()
    const floors = await getFloorMultiple(collection_contract_id)
    const portfolio = getSum(floors)
    return {
        body: { floors, portfolio }
    }
}