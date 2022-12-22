import React from 'react';
import DropdownMenu from './DropdownMenu';
import { useState, useEffect } from 'react';

const Card = ({image, name, author, tokenId, ...props}) => {

    const [url, setUrl] = useState(null);
    const [externalUrl, setExternalUrl] = useState(null);

    useEffect(() => {
        const fetchUrl = async (image) => {
          if (!image) return "";
      
          try {
            const response = await fetch("https://nftstorage.link/");
            return response.ok ? image.replace("ipfs//", "https://nftstorage.link/ipfs/") : "";
          } catch (error) {
            console.error(error);
            return image.replace("ipfs//", "https://ipfs.io/ipfs/");
          }
        };
      
        const fetchImageUrl = async () => {
          const url = await fetchUrl(image);
          setUrl(url);
        };
      
        const fetchExternalUrl = async () => {
          const externalUrl = await fetchUrl(props?.external_url);
          setExternalUrl(externalUrl);
        };
      
        fetchImageUrl();
        fetchExternalUrl();
    }, [image, props]);
      

    return (
      <div className="relative w-full sm:max-w-xs md:max-w-sm rounded-lg overflow-hidden shadow-sm sm:shadow-md">
        <a href={externalUrl} target="_blank" rel="external">
          {url ? (<img className="rounded-t-lg object-cover w-full h-48 sm:h-72" src={url} alt="cover"/>) 
          : (<div className="h-48 sm:h-64 bg-gray-200 flex items-center justify-center animate-pulse">Loading...</div>)}
          <div className="px-4 py-2 sm:py-4">
            <div className="font-bold text-sm sm:text-base mb-0 text-gray-800">{name? name : <div>Title...</div>}</div>
            <div className="font-semibold text-gray-700 text-sm sm:text-base tracking-wide">{author? author[0]?.value : <div>Author...</div>}</div>
          </div>
        </a>
        <div><DropdownMenu tokenId={tokenId}/></div>
      </div>
    )
}

export default Card;