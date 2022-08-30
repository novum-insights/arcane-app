import { getAPI } from "$lib/utils"

export const getStxBalance = async (address: string) => {
    const data = await getAPI(`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${address}/stx`)
    const { balance } = data
    return balance * 1e-6
}
export const getTokens = async (address: string) => {
    const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${address}/balances`
    const { fungible_tokens } = await getAPI(url);
    // fungible token syntax: address.token_name::name take address.token_name
    // regex split 

    let obj: any = []
    await Promise.all(Object.keys(fungible_tokens).map(async (key) => {
        const [address, name] = key.split("::")
        const data = await getTokenMetadata(address)
        // console.log(data.error)
        if (fungible_tokens[key].balance !== '0')
            if (data.error !== 'tokens not found')
                obj.push({ ...fungible_tokens[key], ...data, address, name })

    }))
    return obj;
}

export const getTokenMetadata = async (address: string) => {
    //https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-token/ft/metadata
    const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/${address}/ft/metadata`
    const data = await getAPI(url);

    return data
}

export const getAssets = async (address: string) => {
    // https://gamma.io/api/holdings/SP8W15E5S1JMM3Q9PVD5QY5DJAXMM460RJBYBX2T
    const NFTAPI = 'https://gamma.io/api/holdings/'
    const url = `${NFTAPI}${address}`;
    const { data } = await getAPI(url);
    return data
}


export const getAlexLabPirceByToken = async (symbol: string) => {

    const _token: string = tokenMap[symbol]
    if (_token) {
        const query = JSON.stringify({
            query: `{	laplace_current_token_price(where: { token: { _eq: "${_token}" } }) {token, avg_price_usd}}`,
            variables: {}
        })

        const requestOptions = {
            method: 'POST',
            body: query,
        };
        const response = await fetch('https://gql.alexlab.co/v1/graphql', requestOptions)
        const { data } = await response.json()
        // console.log(data)
        const { laplace_current_token_price } = data
        const { avg_price_usd, token } = laplace_current_token_price[0]
        return { avg_price_usd, token }
    }

    return 0
}

export const tokenMap: any = {
    // symbol: token at laplace_current_token_price

    'stDIKO': "token-wdiko",
    'SLM': "token-wslm",
    'auto-alex': "auto-alex",
    "BAN": "token-wban",
    // 'lBTC': null,
    // 'SP': null,
    // 'APower': null,
}

export const block = async () => {
    const { total } = await getAPI('https://api.stacks.org/extended/v1/block?limit=1')
    return total
}