import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {


    return {
        body: { message: 'hello' }
    }
}