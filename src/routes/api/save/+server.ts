import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ locals, request }) => {
    const { dehydratedState } = await request.json();
    await locals.session.set({ dehydratedState });
    return new Response(JSON.stringify({ message: 'ok' }));
}
