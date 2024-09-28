'use client'

import React, { useMemo } from 'react';  
import {  
    ConnectionProvider,  
    WalletProvider,  
} from '@solana/wallet-adapter-react';  
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {  
    PhantomWalletAdapter,  
} from '@solana/wallet-adapter-wallets';  
import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";



require('@solana/wallet-adapter-react-ui/styles.css');

    const SolanaWalletProvider = ({children}:{children:React.ReactNode}) => {
       
          const network = WalletAdapterNetwork.Devnet
          const endpoint = useMemo(()=>clusterApiUrl(network),[network]); // Use 'mainnet-beta' for production
      
          // Memoize wallets to avoid unnecessary re-renders
          const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);
      
        return (
          
               <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
              <WalletModalProvider>
                {children}
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
          
         
        )
      }
      
      
      export default dynamic (() => Promise.resolve(SolanaWalletProvider), {ssr: false})