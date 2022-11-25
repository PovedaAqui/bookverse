import React from 'react';
import { useContract, useNFTs } from '@thirdweb-dev/react';
import Card2 from '../components/Card2';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

const Store = () => {

    const { contract } = useContract(process.env.REACT_APP_DROP_CONTRACT);

    const { data: nfts, isLoading } = useNFTs(contract, { start: 0, count: 100 });
    
    return (
        <div className='grid grid-cols-1 gap-3 mt-1 lg:grid-cols-4 lg:gap-x-0'>
            {isLoading && <h1>Loading...</h1>}
            {nfts && nfts?.map((nfts, id) => {
                return (
                    <div key={id}>
                        <Card2 name={nfts.metadata.name} author={nfts.metadata.attributes} description={nfts.metadata.description} image={nfts.metadata.image} listingId={nfts.metadata.id}/>
                    </div>
                )
            })}
        </div>
    )
}

// const hof = (WrappedComponent) => {
//     // Its job is to return a react component warpping the baby component
//     return (props) => (
//         <QueryClientProvider client={queryClient}>
//             <WrappedComponent {...props} />
//         </QueryClientProvider>
//     );
// };

// export default hof(Store);
export default Store;