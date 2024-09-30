"use client"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
//import submain from "./submain";

import React from 'react'
import Submain from "./submain";

const MainComponent = () => {
    const [isMounted, setIsMounted] = useState(false);  

  useEffect(() => {  
    setIsMounted(true);  
  }, []);  

  return (
  <div>{isMounted && <Submain/>}</div>
  )
 
}

export default dynamic (() => Promise.resolve(MainComponent), {ssr: false})
