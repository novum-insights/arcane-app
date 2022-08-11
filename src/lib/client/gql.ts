import { gql, request } from "graphql-request"
export const getCollectionMetadata = async (contract_id: string) => {
    // console.log(contract_id)
    const query = gql`
    query {
        nft_collection_metadata(
          where: {
            contract_id: {
              _eq: "${contract_id}"
            }
          }
        ) {
          slug
          contract_id
          description
          external_url
          name
        }
      }
      `
    const data = await request('https://gql.stxnft.com/', query).then((data) => (data))
    const { nft_collection_metadata } = data
    // console.log(data)
    return nft_collection_metadata
}