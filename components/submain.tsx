import React from 'react'
import dynamic from 'next/dynamic'
import Headers from './header'
import ImageProvider from './image'
import MyComponent from './buttonProvider'
const Submain = () => {
  return (
    <div>
        <header>
              <nav className="flex justify-between items-center sm:pt-5 sm:px-11 p-4">
                <h1 className="text-white sm:text-4xl font-sans font-bold text-lg  ">Minter</h1>
                <div>
                  <MyComponent/>
                </div>
               
              
                
              </nav>
          <Headers/>
      
        </header>
        <ImageProvider/>
    

       </div>
  )
}

export default dynamic (() => Promise.resolve(Submain), {ssr: false})