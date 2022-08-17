import type { Load, RequestHandler } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
    const { slug } = params;
    throw redirect(301, `${slug}/nft`)
}
