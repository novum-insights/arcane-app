export const getAPI = async (url: string): Promise<any> => {
    return await fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const getSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export const ipfsUriToHttp = (uri: string) => {

    //https://images.gamma.io/ipfs/QmV7bH3NJBtdtfxnD5H2ByH2qpr139sDJK6mVQ6MeQRE23/images/122.png?img-width=460&img-fit=contain&img-quality=100&img-onerror=redirect&img-fit=pad&img-format=webp
    // if (uri.includes('QmQK6pTrpNsRd9ZzpaaLiT7oQKVQvSQNHFk2QbDThV5guS')) {
    //     const [, hash] = uri.split('ipfs://');
    //     console.log(`${ipfsPrefix}${hash}`)
    // }

    const ipfsPrefix = 'https://images.gamma.io/ipfs/';
    const [, hash] = uri.split('ipfs://');
    return `${ipfsPrefix}${hash}`

}

export const STXtoNumber = (stx: number) => `${stx * 10e-7} STX`
