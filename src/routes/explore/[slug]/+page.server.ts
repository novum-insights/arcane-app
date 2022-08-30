import { topCollectors } from "$lib/server/gql";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params, parent }) => {
    const { slug } = params;
    const { block_height } = await parent()
    const top_collectors = await topCollectors(block_height)
    return {
        slug,
        block_height,
        top_collectors: slug === 'top-collectors' ? top_collectors : []
    }
}

