import React from 'react'
import { useNavigate } from 'react-router-dom'

function ItemContent({name,image,path,data}) {
  const navigate = useNavigate()
  return (
    <div class="hover:cursor-pointer flex flex-col group bg-[#171717]  border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition w-[25%] mx-[2.5%] h-auto my-2" onClick={()=>navigate(path,{state:data})}>
    <div class="relative pt-[50%] sm:pt-[60%] lg:pt-[70%]  rounded-t-xl overflow-hidden">
      <img draggable={false} class="w-[100%] h-auto absolute -top-8 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl" src={image} alt="Image Description"/>
    </div>
    <div class="px-4 md:px-4 md:py-1">
      <h3 class="text-lg font-bold text-gray-200">
        {name}
      </h3>
    </div>
  </div>
  )
}

export default ItemContent