import React from 'react';
import DropdownMenu from './DropdownMenu';
import { useState, useEffect } from 'react';

const Card = ({image, ...props}) => {

    const [url, setUrl] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
          let url = "";
          if (image) {
            try {
                const response = await fetch("https://nftstorage.link/ipfs/");
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

    let external_url = "";
    external_url = props?.external_url?.replace("ipfs//", "https://nftstorage.link/ipfs/");

    return (
        <div className="flex justify-center relative m-2">
            <div className="rounded-lg shadow-lg bg-white max-w-xs max-h-xs">
                <a href={external_url} rel="external">
                    {url ? (
                        <img className="rounded-t-lg" src={url} alt="cover"/>
                        ) : (<div>Loading...</div>)}
                </a>
                <div className="relative p-5 block">
                    <h5 className="text-gray-900 text-xl font-medium mb-0">{props.name}</h5>
                    <p className="text-gray-700 text-sm font-medium tracking-wide mb-0">{props.author[0].value}</p>
                    {/* <p className="text-gray-700 text-base mb-4 line-clamp-4">
                        {props.description}
                    </p> */}
                    <DropdownMenu tokenId={props?.tokenId}/> 
                </div>
            </div>
        </div>
    )
}

export default Card;