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
      <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg">
        <a href={externalUrl} target="_blank" rel="external">
          {url ? (
            <img className="rounded-t-lg" src={url} alt="cover"/>
            ) : (<div>Loading...</div>)}
        <div className="px-4 py-4">
          <div className="font-bold text-xl mb-1 text-left text-gray-800">{name}</div>
          <div className="text-gray-700 text-base tracking-wide">{author? author[0]?.value : <div>Author...</div>}</div>
        </div>
        </a>
        <div className="absolute right-0 bottom-0 z-10 align-middle"><DropdownMenu tokenId={tokenId}/></div>
      </div>
    )
}

export default Card;