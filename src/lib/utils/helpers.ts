export const ipfsUriToHttp = (uri: string) => {

    //https://images.gamma.io/ipfs/QmV7bH3NJBtdtfxnD5H2ByH2qpr139sDJK6mVQ6MeQRE23/images/122.png?img-width=460&img-fit=contain&img-quality=100&img-onerror=redirect&img-fit=pad&img-format=webp

    return uri.replace("ipfs://", "https://images.gamma.io/ipfs/")
}

export const getSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);


export const getStxBalance = async (address: string) => {
    const response = await fetch(`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${address}/stx`)
    const data = await response.json()
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
