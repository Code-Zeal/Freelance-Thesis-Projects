import React from 'react'

function ThemeBox({data,setTheme}) {
  return (
    <button onClick={()=>setTheme(data)} className="w-[30%] h-[30%] mx-auto  bg-[#171717] rounded-lg hover:scale-105" >
     <span className=' text-sm text-gray-200 w-[100%] break-words'>
      {data.title}
     </span>
      </button>
  )
}

export default ThemeBox