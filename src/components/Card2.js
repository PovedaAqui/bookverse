import React from 'react';
import { useState, useEffect } from 'react';
import useDataFeed from '../utils/DataFeed'; // used to get the price of Matic
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
      
    // Get the price on Matic

    // const { data, isFetched } = useDataFeed();
    // const tokenPrice = isFetched && (parseInt(data?.answer)*10**-8).toFixed(2);

    const priceData = usePrice(listingId); // get the price of the listing from the contract
    //(parseInt(data.price)*10**-18).toFixed(2)));

    useEffect(() => {
        const getPrice = () => {
            if (priceData) {
                setPrice(priceData.map(data => data.currencyMetadata.displayValue));
                const maxqty = priceData.map(data => data.maxClaimableSupply); // get the max quantity of the listing
                const qty = priceData.map(data2 => data2.currentMintSupply) // get the current quantity of the listing
                setPair(`${qty}/${maxqty}`); // set the pair of the listing
            }
        }
        getPrice();
    }, [priceData])

    // const maticToUsd = !price? "N/A" : price * tokenPrice;

    // useEffect(() => {
    //     const supply = () => {
    //         if (priceData) {
    //             const maxqty = priceData.map(data => data.maxClaimableSupply);
    //             const qty = priceData.map(data2 => data2.currentMintSupply)
    //             setPair(`${qty}/${maxqty}`);
    //         }
    //     }
    //     supply();
    // }, [priceData])

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
                        <svg data-name="86977684-12db-4850-8f30-233a7c267d11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
                            <path d="M10 20c5.542 0 10 -4.458 10 -10S15.542 0 10 0 0 4.458 0 10s4.458 10 10 10z" fill="#2775ca"/><path d="M12.75 11.583c0 -1.458 -0.875 -1.958 -2.625 -2.167 -1.25 -0.167 -1.5 -0.5 -1.5 -1.083s0.417 -0.958 1.25 -0.958c0.75 0 1.167 0.25 1.375 0.875 0.042 0.125 0.167 0.208 0.292 0.208h0.667c0.167 0 0.292 -0.125 0.292 -0.291v-0.042c-0.167 -0.917 -0.917 -1.625 -1.875 -1.708v-1c0 -0.167 -0.125 -0.292 -0.333 -0.333h-0.625c-0.167 0 -0.292 0.125 -0.333 0.333v0.958c-1.25 0.167 -2.041 1 -2.041 2.042 0 1.375 0.833 1.917 2.583 2.125 1.167 0.208 1.542 0.458 1.542 1.125s-0.583 1.125 -1.375 1.125c-1.083 0 -1.459 -0.459 -1.583 -1.083 -0.041 -0.167 -0.167 -0.25 -0.291 -0.25h-0.709c-0.167 0 -0.291 0.125 -0.291 0.292v0.042c0.167 1.041 0.833 1.791 2.208 2v1c0 0.167 0.125 0.291 0.333 0.333h0.625c0.167 0 0.292 -0.125 0.333 -0.333v-1c1.25 -0.209 2.083 -1.083 2.083 -2.209z" fill="#fff"/>
                            <path d="M7.875 15.958c-3.25 -1.167 -4.917 -4.791 -3.708 -8 0.625 -1.75 2 -3.083 3.708 -3.708 0.167 -0.083 0.25 -0.208 0.25 -0.417V3.25c0 -0.167 -0.083 -0.292 -0.25 -0.333 -0.042 0 -0.125 0 -0.167 0.041 -3.958 1.25 -6.125 5.459 -4.875 9.417 0.75 2.333 2.542 4.125 4.875 4.875 0.167 0.083 0.333 0 0.375 -0.167 0.042 -0.041 0.042 -0.083 0.042 -0.167v-0.583c0 -0.125 -0.125 -0.291 -0.25 -0.375zM12.292 2.958c-0.167 -0.083 -0.333 0 -0.375 0.167 -0.042 0.042 -0.042 0.083 -0.042 0.167v0.583c0 0.167 0.125 0.333 0.25 0.417 3.25 1.167 4.917 4.791 3.708 8 -0.625 1.75 -2 3.083 -3.708 3.708 -0.167 0.083 -0.25 0.208 -0.25 0.417V17c0 0.167 0.083 0.292 0.25 0.333 0.042 0 0.125 0 0.167 -0.041 3.958 -1.25 6.125 -5.459 4.875 -9.417 -0.75 -2.375 -2.583 -4.167 -4.875 -4.917z" fill="#fff"/>
                        </svg>
                        {/* <svg width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="40" fill="#7B3FE4"/>
                            <path d="M66.6663 40.9337V53.0011C66.662 53.7537 66.4632 54.4922 66.0892 55.1445C65.7153 55.7968 65.1791 56.3405 64.533 56.7226L54.1163 62.7438C53.4712 63.1297 52.7341 63.3334 51.983 63.3334C51.2319 63.3334 50.4948 63.1297 49.8497 62.7438L39.433 56.7226C38.7869 56.3405 38.2507 55.7968 37.8768 55.1445C37.5029 54.4922 37.304 53.7537 37.2997 53.0011V49.6142L42.633 46.5075V52.3948L51.9663 57.8306L61.2997 52.3948V41.5483L51.9663 36.1125L30.0997 48.8239C29.4485 49.1921 28.7137 49.3856 27.9663 49.3856C27.2189 49.3856 26.4842 49.1921 25.833 48.8239L15.4163 42.7777C14.7802 42.3898 14.2543 41.844 13.8894 41.1929C13.5245 40.5418 13.3329 39.8074 13.333 39.0604V26.9929C13.3373 26.2404 13.5362 25.5019 13.9101 24.8496C14.2841 24.1973 14.8203 23.6535 15.4663 23.2715L25.883 17.2503C26.5295 16.8682 27.2661 16.6667 28.0163 16.6667C28.7666 16.6667 29.5032 16.8682 30.1497 17.2503L40.5663 23.2715C41.2124 23.6535 41.7486 24.1973 42.1225 24.8496C42.4965 25.5019 42.6953 26.2404 42.6997 26.9929V30.3798L37.333 33.4657V27.6118L27.9997 22.176L18.6663 27.6118V38.4457L27.9997 43.8815L49.8663 31.1701C50.5175 30.8019 51.2523 30.6085 51.9997 30.6085C52.7471 30.6085 53.4818 30.8019 54.133 31.1701L64.5497 37.2164C65.192 37.6002 65.7245 38.1442 66.0954 38.7955C66.4663 39.4469 66.663 40.1835 66.6663 40.9337Z" fill="white"/>
                        </svg> */}
                        <span className="text-sm sm:text-lg font-semibold text-gray-900 mt-0 ml-1">{price === undefined? "..." : price}</span>
                        {/* <span className="text-sm sm:text-lg font-semibold text-gray-900 mt-0 ml-1">{`- ${maticToUsd} USD`}</span> */}
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 mt-0 ml-auto">{pair === undefined? "..." : pair}</span>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Card2;