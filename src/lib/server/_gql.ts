import { gql, request } from "graphql-request"
import type { INFTTokenMetadata } from "src/routes/api/interfaces";

export const getNft = async (contract_id: string, token_id: bigint, asset_id: string): Promise<INFTTokenMetadata | null> => {
  console.log({ contract_id, token_id, asset_id })
  const query = gql`
  query getData($contract_id: String!, $token_id: bigint!, $asset_id: String!)
  @cached(ttl: 120) {
  nft_token_metadata(
    where: {
      contract_id: { _eq: $contract_id }
      token_id: { _eq: $token_id }
      asset_id: { _eq: $asset_id }
    }
  ) {
    asset_id,
    asset_protocol,
    asset_type,
    asset_url,
    contract_id,
    fully_qualified_token_id,
    image_meta,
    image_protocol,
    image_type,
    image_url,
    name,
    raw_uri_data,
    token_id,
  }
}
`;
  const variables = {
    "contract_id": contract_id,
    "token_id": token_id,
    "asset_id": asset_id
  }
  // console.log(JSON.stringify(variables))
  const data = await request('https://gql.stxnft.com/', query, variables).then((data) => (data))
  const { nft_token_metadata } = data

  if (nft_token_metadata.length === 0) {
    return null
  }
  const [{
    asset_protocol,
    asset_type,
    asset_url,
    fully_qualified_token_id,
    image_meta,
    image_protocol,
    image_type,
    image_url,
    name,
    raw_uri_data,
  }] = nft_token_metadata
  return {
    asset_id,
    asset_protocol,
    asset_type,
    asset_url,
    contract_id,
    fully_qualified_token_id,
    image_meta,
    image_protocol,
    image_type,
    image_url,
    name,
    raw_uri_data,
  }
}


export const getFloor = async (asset_id: string) => {
  const query = gql`
  {
    marketplace_list_events_active_floors(
      where: {
        asset_id: {
          _eq: "${asset_id}"
        }
      }
    ) {
      price_amount
    }
  }`
  const data = await request('https://gql.stxnft.com/', query).then((data) => (data))
  const { marketplace_list_events_active_floors } = data
  const floor_price = data.marketplace_list_events_active_floors.length > 0 ? marketplace_list_events_active_floors[0].price_amount : 0
  return floor_price * 10e-7
}

export const getFloorMultiple = async (contract_ids: string[]) => {
  const query = gql`
  query fetchManyFloorPrices($collection_contract_ids: [String!]!) {
    marketplace_list_events_active_floors(
      where: { collection_contract_id: { _in: $collection_contract_ids } }
    ) {
      price_amount
    }
  }
  `
  const variables = {
    "collection_contract_ids": contract_ids
  }
  const data = await request('https://gql.stxnft.com/', query, variables).then((data) => (data))
  const { marketplace_list_events_active_floors } = data
  const floor_prices = marketplace_list_events_active_floors.map(({ price_amount }: any) => price_amount * 10e-7)
  return floor_prices

}