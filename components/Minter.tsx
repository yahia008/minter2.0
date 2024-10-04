"use client"
import React, { useCallback, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { mintNFT, uploader } from '@/utils/utils'; 
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import dynamic from 'next/dynamic';
import { CldUploadWidget } from 'next-cloudinary';

interface MIntProps {
  url: string;
  input: string;
}

type CloudinaryUploadWidgetInfo = {
  url: string;
};

const Minter = ({ url, input }: MIntProps) => {
  const { publicKey, wallet, connect, connected } = useWallet();
  const [status, setStatus] = useState<string>('');
  const [resource, setResource] = useState<string | CloudinaryUploadWidgetInfo | undefined>();

  const handleMint = useCallback(async () => {
    try {
      // Update status to indicate minting process has started
      setStatus('Connecting to wallet...');

      // Ensure wallet is connected
      if (!connected) {
        await connect();
      }

      // Check if wallet and publicKey are available
      if (wallet && publicKey) {
        setStatus('Uploading image...');

        // Upload image using your uploader utility function
        const uploadedImageUrl = await uploader(url); 
        if (!uploadedImageUrl) {
          setStatus('Image upload failed!');
          throw new Error('Failed to upload image.');
        }

        setStatus('Minting NFT...');
        
        // Proceed with NFT minting using the uploaded image URL and input prompt
        await mintNFT(wallet, uploadedImageUrl, input);
        setStatus('NFT minted successfully!');

      } else {
        setStatus('Wallet not connected!');
        throw new Error('Wallet not connected!');
      }
    } catch (error) {
      console.error('Minting error:', error);
      setStatus(`Minting failed: ${error.message}`);
    }
  }, [wallet, publicKey, connected, url, input, connect]);

  return (
    <div>
    {url  && (
    <button
    onClick={handleMint}
    className="bg-white m-3 w-[200px] sm:w-[500px] text-center font-bold rounded text-black p-3"
  >
    Mint
  </button>
    )}
    <h1>{status}</h1>
</div>
  )
}

export default dynamic (() => Promise.resolve(Minter), {ssr: false})