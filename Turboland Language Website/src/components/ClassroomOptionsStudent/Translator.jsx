import React from 'react'
import SideBarTranslation from './SideBarTranslation'

function Translator() {
  return (
    <div className='bg-[#171717] w-full h-screen text-white flex'>
      <SideBarTranslation/>
      <div className='w-[85%] bg-random1 bg-contain ml-auto text-white'>
        <iframe src="https://www.bing.com/translator" style={{width: '100%', height: '100%'}} title="Bing Translator"></iframe>
      </div>
    </div>
  )
}

export default Translator
