import { whaleWatch } from "$lib/server/gql";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params, parent }) => {
    const { slug } = params;
    const { block_height } = await parent()
    const whale_watch = await whaleWatch(block_height)
    return {
        slug,
        block_height,
        whale_watch: slug === 'whale-watch' ? whale_watch : []
    }
}

