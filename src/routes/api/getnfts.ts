import { getNft } from "$lib/server/_gql";
import { ipfsUriToHttp } from "$lib/utils/helpers";
import type { RequestHandler } from "@sveltejs/kit";
import type { INFTTokenMetadata } from "./interfaces";
export const POST: RequestHandler = async ({ request }) => {
    const { collection_contract_id, token_id, asset_id } = await request.json()
    const _data = await getNft(collection_contract_id, token_id, asset_id);
    const data = _data && dataCleanup(_data);
    return {
        body: { ...data, token_id }
    }
}


const dataCleanup = (object: INFTTokenMetadata) => {
    const media_type = object.image_type !== null ? 'image' : 'video';
    const fixed_image_url = checkIfImageExists(object.image_url, object.image_protocol);
    const fixed_asset_url = checkIfAssetExists(object.asset_url, object.asset_protocol);
    return {
        ...object,
        media_type,
        fixed_asset_url,
        fixed_image_url
    }
}

const checkIfImageExists = (image_url: string, image_protocol: string) => {
    const fixed_image_url = image_protocol === 'ipfs' ? ipfsUriToHttp(image_url) : image_url;
    return fixed_image_url;
}

const checkIfAssetExists = (asset_url: string, asset_protocol: string) => {
    const fixed_asset_url = asset_protocol === 'ipfs' ? ipfsUriToHttp(asset_url) : asset_url;
    return fixed_asset_url;
}


// <code>
// <pre class="text-[0.5em]">{JSON.stringify(
//         { data: data.collection_contract_id, token_id },
//         null,
//         2
//     )}</pre>
// </code>