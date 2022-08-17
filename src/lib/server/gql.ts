import { gql, request } from "graphql-request"
export const resolveBNS = async (name: string): Promise<string | null> => {
  const query = gql`
        {
          getNameDetails(name:"${name}"){
            address
          }
        }
        `
  const data = await request('https://gql.stxnft.com/', query).then((data) => (data)).catch(error => error)
  // console.log({ data: data.getNameDetails, response: data.response })

  if (data.getNameDetails) {
    const { getNameDetails } = data
    const { address } = getNameDetails
    return address
  }
  return null
}

export const getBNS = async (principal: string): Promise<string | null> => {
  const query = gql`
        {
          getAccountNames(principal:"${principal}"){
            names
          }
        }
        `
  const data = await request('https://gql.stxnft.com/', query).then((data) => (data)).catch(error => error)
  // console.log({ data: data.getNameDetails, response: data.response })
  if (data.getAccountNames) {
    const { getAccountNames } = data
    const { names } = getAccountNames
    return names
  }
  return null
}

export const getFloorMultiple = async (contract_ids: string[]) => {
  const query = gql`
  query fetchManyFloorPrices($collection_contract_ids: [String!]!) {
    marketplace_list_events_active_floors(
      where: { collection_contract_id: { _in: $collection_contract_ids } }
    ) {
      price_amount,
      collection_contract_id
    }
  }
  `
  const variables = {
    "collection_contract_ids": contract_ids
  }
  const data = await request('https://gql.stxnft.com/', query, variables).then((data) => (data))
  const { marketplace_list_events_active_floors } = data
  // const floor_prices = marketplace_list_events_active_floors.map(({ price_amount }: any) => price_amount * 10e-7)
  return marketplace_list_events_active_floors

}