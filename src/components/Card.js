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
        <div className="flex justify-center relative m-2">
            <div className="rounded-lg shadow-lg bg-white max-w-xs max-h-xs">
                <a href={externalUrl} target="_blank" rel="external">
                    {url ? (
                        <img className="rounded-t-lg" src={url} alt="cover"/>
                        ) : (<div>Loading...</div>)}
                </a>
                <div className="relative p-5 block">
                    <h5 className="text-gray-900 text-xl font-medium mb-0">{name}</h5>
                    <p className="text-gray-700 text-sm font-medium tracking-wide mb-0">{author? author[0].value : <div>Loading...</div>}</p>
                    {/* <p className="text-gray-700 text-base mb-4 line-clamp-4">
                        {props.description}
                    </p> */}
                    <DropdownMenu tokenId={tokenId}/> 
                </div>
            </div>
        </div>
    )
}

export default Card;