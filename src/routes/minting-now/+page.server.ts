import { getAPI } from "$lib/utils";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
    const URL = 'https://create.gamma.io/api/featured'
    const featured = await getAPI(URL)
    return {
        featured
    }
}