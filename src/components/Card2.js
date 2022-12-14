import React from 'react';
import { useState, useEffect } from 'react';
import useDataFeed from '../utils/DataFeed';
import usePrice from '../utils/Price';
import { useNavigate } from 'react-router-dom';

const Card2 =  ({image, listingId, author, name, description, ...props}) => {

    const navigate = useNavigate();
    const [price, setPrice] = useState(null);
    const [pair, setPair] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
          let url = "";
          if (image) {
            try {
                const response = await fetch("https://nftstorage.link/");
                url = response.ok
                ? image.replace("ipfs//", "https://nftstorage.link/ipfs/")
                : "";
            } catch (error) {
              console.error(error);
              url = image.replace("ipfs//", "https://ipfs.io/ipfs/");
            }
          }
          setUrl(url);
        };
        fetchUrl();
    }, [image]);      
      

    const { data, isFetched } = useDataFeed();
    const tokenPrice = isFetched && (parseInt(data?.answer)*10**-8).toFixed(2);

    const priceData = usePrice(listingId);

    useEffect(() => {
        const getPrice = () => {
            if (priceData) {
                setPrice(priceData.map(data => (parseInt(data.price)*10**-18)));
            }
        }
        getPrice();
    }, [priceData])

    const maticToUsd = !price? "N/A" : price * tokenPrice;

    useEffect(() => {
        const supply = () => {
            if (priceData) {
                const maxqty = priceData.map(data => data.maxClaimableSupply);
                const qty = priceData.map(data2 => data2.currentMintSupply)
                setPair(`${qty}/${maxqty}`);
            }
        }
        supply();
    }, [priceData])

    // const OpenModal = () => {
    //     setIsOpen(!isOpen)
    // }

    return (
        <div className="relative w-full sm:max-w-full rounded-lg overflow-hidden shadow-md sm:shadow-lg">
            <a className="cursor-pointer" onClick={()=> navigate(`/listing/${listingId}`)}>
                {url ? (<img className="rounded-t-lg object-cover w-full h-48 sm:h-72" src={url} alt="cover"/>) 
                : (<div className="h-48 sm:h-64 bg-gray-200 flex items-center justify-center animate-pulse">Loading...</div>)}
                <div className="px-4 py-2 sm:py-4">
                    <div className="font-bold text-sm sm:text-lg mb-0 text-gray-800">{name? name : <div>Title...</div>}</div>
                    <div className="font-semibold text-gray-700 text-sm mb-1 sm:text-lg tracking-wide">{author? author[0]?.value : <div>Author...</div>}</div>
                    <div className="text-gray-700 text-sm mb-2 line-clamp-3">{description}</div>
                    <div className="block items-center">
                        <h6 className="text-gray-900 text-sm font-medium mb-1">Price</h6>
                    </div>
                    <div className='flex items-center'>
                        <svg width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="40" fill="#7B3FE4"/>
                            <path d="M66.6663 40.9337V53.0011C66.662 53.7537 66.4632 54.4922 66.0892 55.1445C65.7153 55.7968 65.1791 56.3405 64.533 56.7226L54.1163 62.7438C53.4712 63.1297 52.7341 63.3334 51.983 63.3334C51.2319 63.3334 50.4948 63.1297 49.8497 62.7438L39.433 56.7226C38.7869 56.3405 38.2507 55.7968 37.8768 55.1445C37.5029 54.4922 37.304 53.7537 37.2997 53.0011V49.6142L42.633 46.5075V52.3948L51.9663 57.8306L61.2997 52.3948V41.5483L51.9663 36.1125L30.0997 48.8239C29.4485 49.1921 28.7137 49.3856 27.9663 49.3856C27.2189 49.3856 26.4842 49.1921 25.833 48.8239L15.4163 42.7777C14.7802 42.3898 14.2543 41.844 13.8894 41.1929C13.5245 40.5418 13.3329 39.8074 13.333 39.0604V26.9929C13.3373 26.2404 13.5362 25.5019 13.9101 24.8496C14.2841 24.1973 14.8203 23.6535 15.4663 23.2715L25.883 17.2503C26.5295 16.8682 27.2661 16.6667 28.0163 16.6667C28.7666 16.6667 29.5032 16.8682 30.1497 17.2503L40.5663 23.2715C41.2124 23.6535 41.7486 24.1973 42.1225 24.8496C42.4965 25.5019 42.6953 26.2404 42.6997 26.9929V30.3798L37.333 33.4657V27.6118L27.9997 22.176L18.6663 27.6118V38.4457L27.9997 43.8815L49.8663 31.1701C50.5175 30.8019 51.2523 30.6085 51.9997 30.6085C52.7471 30.6085 53.4818 30.8019 54.133 31.1701L64.5497 37.2164C65.192 37.6002 65.7245 38.1442 66.0954 38.7955C66.4663 39.4469 66.663 40.1835 66.6663 40.9337Z" fill="white"/>
                        </svg>
                        <span className="text-sm sm:text-lg font-semibold text-gray-900 mt-0 ml-1">{price === undefined? "..." : price}</span>
                        <span className="text-sm sm:text-lg font-semibold text-gray-900 mt-0 ml-1">{`- ${maticToUsd} USD`}</span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 mt-0 ml-auto">{pair === undefined? "..." : pair}</span>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Card2;