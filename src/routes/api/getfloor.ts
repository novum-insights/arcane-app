import { getFloor } from "$lib/server/_gql";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const { collection_contract_id } = await request.json()
    const floor = await getFloor(collection_contract_id)
    return {
        body: { floor }
    }
}