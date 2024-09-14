import React, { useState } from 'react'

function NewVideo({setModal}) {
  
  return (
    <div onClick={()=>setModal(true)} className='absolute bottom-5 left-[6%] size-24 py-2 px-2.5 z-[999999] bg-gray-300 text-sm text-gray-900 rounded-xl hover:bg-gray-100 dark:bg-neutral-700 dark:text-white'>
      <img draggable={false} className='hover:scale-105 hover:cursor-pointer w-full h-full rounded-full'  src="https://www.svgrepo.com/show/524226/add-circle.svg" alt="add" />
    </div>
  )
}

export default NewVideo