import type { RequestHandler } from "./$types"
export const POST: RequestHandler = async ({ locals }) => {
    await locals.session.destroy()
    return new Response(JSON.stringify({ message: 'ok' }));


}
