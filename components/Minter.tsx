"use client"
import React from 'react'
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
  const { publicKey, wallet, connect } = useWallet();

  const text = input.split(" ")
  const [status, setStatus] = useState<string>()
  const [resource, setResource] = useState<string | CloudinaryUploadWidgetInfo | undefined>();


    

  return (
    <div>
    {url  && (
    <CldUploadWidget
    options={{ sources: [ 'url']
     }}
    onSuccess={(result, { widget }) => {
     console.log(result)  // { public_id, secure_url, etc }
    }}
    onQueuesEnd={(result, { widget }) => {
      widget.close();
    }}
    >

{({ open }) => {
    function handleOnClick() {
      setResource(undefined);
     uploader(url)
      open();
    }
    return (
      <button onClick={handleOnClick} className='bg-white m-3 w-[200px] 
      sm:w-[500px] text-center font-bold rounded text-black p-3'>
        mint
      </button>
    );
  }}


    </CldUploadWidget>)}
</div>
  )
}

export default dynamic (() => Promise.resolve(Minter), {ssr: false})