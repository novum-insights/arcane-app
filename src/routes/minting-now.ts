import { getAPI } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const URL = 'https://create.gamma.io/api/featured'
    const response = await getAPI(URL)
    console.log(response)
    return {
        body: {
            featured: response
        }
    }
}