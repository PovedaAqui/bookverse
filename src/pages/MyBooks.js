import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';

const MyBooks = () => {

    const { address, isConnected } = useAccount();
    const [tokens, setTokens] = useState(null);
    const [totalBalance, setTotalBalance] = useState(null);
    const [ipfs, setIpfs] = useState(null);
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
        .then(res => res.json())
        .then(res2 => res2.find(element => element?.contractAddress === "0xf66f067a0a9a525e5a8b8e7a732857653e6994f5"))
        .then(res3 => res3.balances.map(element => element?.tokenId))
        .then(res4 => setTotalBalance(res4))
    };

    //First call
    const { data: balance } = useQuery(['nfts'], fetchBalance);

    //Second call
    useEffect(() => {
        const fetchMetadata = async (ids) => {
            let params = [];
            let res = [];
            res = await fetch(`https://bookverse-proxy.herokuapp.com/https://api-eu1.tatum.io/v3/multitoken/metadata/${chain}/${nftContract}/${ids}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_TATUM
                }
            }
        )
        .then(res => {
            if(!res.ok) {
                throw Error("There was an error in the second call, please report it to support")
            }
            return res.json();
        })
        .then(data => params.push(data))
        .then(data2 => data2 === params.length && setTokens(params))
        .catch(error => console.log(error))
    };
        totalBalance!==null && totalBalance.map(ids => fetchMetadata(ids));
    }, [!!totalBalance]);
    
    //Third call
    useEffect(() => {
        const fetchIPFS = async (ids) => {
            let params = [];
            let url = "";
            if (ids.data.includes("ipfs://")) {
                url = ids.data.replace("ipfs://", "https://nftstorage.link/ipfs/");
            }
            else if (ids.data.includes("ipfs//")) {
                url = ids.data.replace("ipfs//", "https://nftstorage.link/ipfs/");
            } else {
                url = ids;
            }
            let res = [];
            res = await fetch(`https://bookverse-proxy.herokuapp.com/${url}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                }
            }
        )
        .then(res => {
            if(!res.ok) {
                throw Error("There was an error in the last call, please report it to support")
            }
            return res.json();
        })
        .then(data => params.push(data))
        .then(data2 => data2 === params.length && setIpfs(params))
        .catch(error => console.log(error))
    };
        tokens!==null && tokens.map(data => fetchIPFS(data));
    }, [!!tokens]);

    return (
        <div className='grid grid-cols-1 gap-y-3 gap-x-0 mt-1 lg:grid-cols-4'>
            {isConnected && !ipfs? <h1>Loading your books...</h1> : ipfs?.map((nft, id)=>{
                return (
                    <div key={id}>
                        <Card name={nft?.name} description={nft?.description} image={nft?.image} external_url={nft?.external_url} tokenId={nft?.token_id} />
                    </div>
                )
            })}
            {!isConnected && <div className='flex m-auto justify-center item-center leading-none text-lg font-extrabold text-gray-900 md:text-3xl md:ml-2 md:absolute md:mt-2 lg:text-4xl'>It's very quiet round here...</div>}
        </div>
    )
};

export default MyBooks;