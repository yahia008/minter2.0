import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity,  } from '@metaplex-foundation/js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import BN from 'bn.js'


export const mintNFT = async (wallet: PhantomWalletAdapter, ipfsUrl: string) => {
    const maxSupply = new BN(1);
    (maxSupply as any).__opaque__ = 'BigNumber';
    // Connect to the Solana network
    const connection = new Connection(clusterApiUrl('devnet'));

    // Initialize Metaplex with the connection and wallet
    const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
          // Using Bundlr for storage, can be configured to your needs

    // Create the NFT
    const { nft } = await metaplex
        .nfts()
        .create({
            uri: ipfsUrl, // IPFS URL from NFT.Storage
            name: 'AI Generated NFT',
            sellerFeeBasisPoints: 500, // 5% royalty
            
             // Number of copies allowed, set to 1 for a unique NFT
        });

    console.log('NFT Minted: ', nft);
};


export const createOptions = (input: string) => (
    {
   method: 'POST',
   url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
   headers: {
       'x-rapidapi-key': '41b9baf5edmshe8da57e4de32f9ap1f082djsn543d93814799',
       'x-rapidapi-host':  'open-ai21.p.rapidapi.com',
       'Content-Type': 'application/json'
   },
   data: {
    text: input
   }
 });
 

 export const uploader= (url:string)=> {
    const formData = new FormData()
    formData.append('file', url)
    formData.append('upload_preset', 'ml_default')

    fetch('https://api.cloudinary.com/v1_1/dwcxrevad/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Uploaded Image URL:', data.secure_url);
          
        })
        .catch((error) => console.error('Error uploading to Cloudinary:', error));
    };
 