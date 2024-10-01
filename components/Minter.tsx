"use client"
import React, { useCallback } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { NFTStorage, File } from 'nft.storage';
import {mintNFT, uploader} from '@/utils/utils' 
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import dynamic from 'next/dynamic';
import { CldUploadWidget } from 'next-cloudinary';


interface MIntprops {
  url:string
  input:string
}

type CloudinaryUploadWidgetInfo = {
  url:string
}
const Minter = ({url, input}:MIntprops) => {
  const { publicKey, wallet, connect, connected } = useWallet();

  const text = input.split(" ")
  const [status, setStatus] = useState<string>()
  const [resource, setResource] = useState<string | CloudinaryUploadWidgetInfo | undefined>();


  const handleMint = useCallback(async () => {
    if (connected && wallet) {
      const uploadedImageUrl = await uploader(url); // Get the uploaded image URL
      if (uploadedImageUrl) {
        await mintNFT(wallet, uploadedImageUrl, input); // Use the image URL for minting
      } else {
        console.error('Failed to upload image.');
      }
    } else {
      console.error('Wallet not connected!');
    }
  }, [wallet, connected, url]);

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
</div>
  )
}

export default dynamic (() => Promise.resolve(Minter), {ssr: false})