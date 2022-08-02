export const ipfsUriToHttp = (uri: string) => {

    //https://images.gamma.io/ipfs/QmV7bH3NJBtdtfxnD5H2ByH2qpr139sDJK6mVQ6MeQRE23/images/122.png?img-width=460&img-fit=contain&img-quality=100&img-onerror=redirect&img-fit=pad&img-format=webp

    return uri.replace("ipfs://"
        , "https://images.gamma.io/ipfs/")
}

export const getSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

const getAPI = async (url: string): Promise<any> => {
    return await fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
}



export const getStxBalance = async (address: string) => {
    const data = await getAPI(`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${address}/stx`)
    const { balance } = data
    return balance * 1e-6
}

export const getStxPrice = async () => {
    const url =
        'https://api.coingecko.com/api/v3/coins/blockstack?localization=false&community_data=false&developer_data=false';
    const response = await fetch(url);
    const { market_data } = await response.json();

    const { current_price } = market_data;
    return current_price.usd;
}

export const getAssets = async (address: string) => {
    // https://stacks-node-api.stacks.co/extended/v1/tokens/nft/holdings?principal=SP25KJH4N4YNKTVXSWSHDPVCWDFAN2BA4H2VQVN0G
    const NFTAPI = 'https://gamma.io/api/holdings/'
    const url = `${NFTAPI}${address}`;
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
}


export const getTokens = async (address: string) => {
    const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${address}/balances`
    const response = await fetch(url)
    const data = await response.json();
    const { fungible_tokens } = data;
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

export const getAlexLabPrices = async () => {

    const graphql = JSON.stringify({
        query: "query FetchLatestPrices {  laplace_current_token_price {    avg_price_usd    token  }}"
        ,
        variables: {}
    })

    const requestOptions = {
        method: 'POST',
        body: graphql,
    };

    const response = await fetch('https://gql.alexlab.co/v1/graphql', requestOptions)
    const { data } = await response.json()
    const { laplace_current_token_price } = data

    const oracle = laplace_current_token_price.map(({ token, avg_price_usd }: any) => {

        // return ({
        //     token,
        //     price: avg_price_usd,
        // })
        return token
    })
    return oracle

}


export const getAlexTokens = async () => {
    const query = JSON.stringify({
        query: "{\n	tokenCollection {\n		items {\n			id\n			fullAddresses\n			name\n			description\n			scale\n\n			iconsCollection {\n				items {\n					title\n					url\n				}\n			}\n		}\n	}\n}\n"
        ,
        variables: {}
    })

    const requestOptions = {
        method: 'POST',
        body: query,
    };
    const response = await fetch('https://gql.alexlab.co/v1/graphql', requestOptions)

    const { data } = await response.json()
    const { tokenCollection } = data
    // console.log(tokenCollection.items)
    return tokenCollection.items
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