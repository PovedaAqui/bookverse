import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import usePrice from "../../utils/Price";

const ListingPage = () => {

  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [pending, setPending] = useState(false);
  const [img, setImg] = useState(null);

  const { contract } = useContract(process.env.REACT_APP_DROP_CONTRACT); // Contract address

  const params = useParams();
  const listingId = params.listingId; // listing ID from URL
  const priceToken = usePrice(listingId); // get the price of the listing from the contract

  const { data: nft, isLoading, isSuccess } = useNFT(contract, listingId);

  useEffect(() => {
    const fetchUrl = async () => {
      let url = "";
      if (nft?.metadata?.image) {
        try {
            const response = await fetch("https://nftstorage.link/");
            url = response.ok
            ? nft?.metadata?.image.replace("ipfs//", "https://nftstorage.link/ipfs/")
            : "";
        } catch (error) {
          console.error(error);
          url = nft?.metadata?.image.replace("ipfs//", "https://ipfs.io/ipfs/");
        }
      }
      setImg(url);
    };
    fetchUrl();
  }, [isSuccess, nft]);      
  
  useEffect(() => { // set the price and the currency of the listing
    const getPrice = () => {
      if (priceToken) {
        // let priceConverted = priceToken.map(data => (parseInt(data.price)*10**-18)); // convert the price from hex to decimal
        let priceConverted = priceToken.map(data => data.currencyMetadata.displayValue); // get the price of the listing
        let currency = priceToken.map(data => data.currencyMetadata.symbol); // get the currency of the listing
        setPrice(priceConverted);
        setCurrency(currency);
      } else {
        return "Loading...";
      }
    }
    getPrice();
  }, [listingId, priceToken]);

  const fetchCheckoutLink = async () => { // fetch the checkout link from the server
    setPending(true);
    const response = await fetch(`https://obscure-taiga-79570.herokuapp.com/api/create-paper-intent?listingId=${listingId}&img=${img}&name=${nft.metadata.name}`);
    const data = await response.json();
    console.log(data);
    window.open(data?.returnData?.checkoutLinkIntentUrl ?? data?.checkoutLinkIntentUrl, "_blank");
    setPending(false);
  };

  return (
    <div className="container flex flex-col min-w-full min-h-screen mx-auto p-2 items-center justify-center bg-gray-100 sm:flex-row">
      {!isLoading && nft ? (
        <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-lg sm:ml-4">
          <div className="flex flex-col items-center justify-center max-w-xs"> {/* NFT image in the left */}
              <img src={img} alt="cover" className="w-full h-auto" />
          </div>
          <div className="flex flex-col items-center justify-center max-w-lg text-left sm:ml-4"> {/* NFT info in the right */}
            <h1 className="text-2xl font-bold sm:text-3xl mt-2 sm:mt-0">{nft.metadata.name}</h1>
            <p className="text-sm sm:text-base font-normal tracking-wide mb-2">{nft.metadata.attributes[0].value}</p>
            <p className="text-sm sm:text-lg mb-2">{nft.metadata.description}</p>
            <h2 className="font-bold mb-2">Price: {price} {currency}</h2>
            <div className="flex flex-col items-center justify-center align-middle mt-2"> {/* Buy button below*/}
              {!pending? <button onClick={() => fetchCheckoutLink()} className="w-full bg-gradient-to-br from-orange-100 via-blue-700 to-indigo-400 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:px-6 mb-0 rounded">
                Buy Now
              </button> : 
              <button className="bg-gradient-to-br from-orange-100 via-blue-700 to-indigo-400 animate-pulse text-white font-bold py-2 px-4 sm:px-6 rounded mb-3">
                Loading...
              </button>}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ListingPage;