import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import { data } from 'autoprefixer';

const MyBooks = () => {

    const { address, isConnected } = useAccount();
    // const [tokens, setTokens] = useState(null);
    // const [totalBalance, setTotalBalance] = useState(null);
    // const [ipfs, setIpfs] = useState(null);
    const chain = process.env.REACT_APP_CHAIN;
    const nftContract = process.env.REACT_APP_DROP_CONTRACT;

    const fetchBalance = async () => {
        const res = await fetch(`https://bookverse-proxy.herokuapp.com/https://api-eu1.tatum.io/v3/multitoken/address/balance/${chain}/${address}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_TATUM
                }
            }
        )
        const result = await res.json();
        const resultFiltered = result.find(element => element?.contractAddress?.toLowerCase() === nftContract.toLowerCase());
        const resultBalances = resultFiltered.balances.map(ids => ids.tokenId)
        return resultBalances;
        // .then(res2 => res2.find(element => element?.contractAddress?.toLowerCase() === nftContract.toLowerCase()))
        // .then(res3 => res3.balances.map(element => element?.tokenId))
        // .then(res4 => setTotalBalance(res4))
    };

    //First call
    const { data: balance } = useQuery({ queryKey: ['nfts'], queryFn: fetchBalance});

    //Second call
    const fetchMetadata = async (ids) => {
        const res = await fetch(`https://bookverse-proxy.herokuapp.com/https://api-eu1.tatum.io/v3/multitoken/metadata/${chain}/${nftContract}/${ids}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_TATUM
                }
            }
        )
        const result = await res.json();
        return result;
    };

    const { data: tokenId } = useQuery({ queryKey: ['tokenId'], queryFn: () => Promise.all(balance.map(ids => fetchMetadata(ids))), enabled: !!balance });

    //Third call
    const fetchIPFS = async (ids) => {
        let url = "";
        if (ids.data.includes("ipfs://")) {
            url = ids.data.replace("ipfs://", "https://nftstorage.link/ipfs/");
        }
        else if (ids.data.includes("ipfs//")) {
            url = ids.data.replace("ipfs//", "https://nftstorage.link/ipfs/");
        } else {
            url = ids;
        }
        const res = await fetch(`https://bookverse-proxy.herokuapp.com/${url}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                }
            }
        )
        const result = await res.json();
        return result;
    };

    const { data: ipfs } = useQuery({ queryKey: ['ipfs'], queryFn: () => Promise.all(tokenId.map(ids => fetchIPFS(ids))), enabled: !!tokenId });

    return (
        <div className='grid grid-cols-1 gap-y-3 gap-x-0 mt-1 lg:grid-cols-4'>
            {isConnected && !ipfs? <h1>Loading your books...</h1> : ipfs?.map((nft, id)=>{
                return (
                    <div key={id}>
                        <Card name={nft?.name} description={nft?.description} image={nft?.image} external_url={nft?.external_url} tokenId={nft?.external_url?.substr(66, 1)} />
                    </div>
                )
            })}
            {!isConnected && <div className='flex m-auto justify-center item-center leading-none text-lg font-extrabold text-gray-900 md:text-3xl md:ml-2 md:absolute md:mt-2 lg:text-4xl'>It's very quiet round here...</div>}
        </div>
    )
};

export default MyBooks;