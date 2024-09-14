import React from 'react'

function TestItem({testSelected,setTestSelected,data}) {

  return (
    <button onClick={testSelected?.id === data?.id? false:()=>setTestSelected(data)} class={testSelected?.id === data?.id?"hover:cursor-not-allowed flex group bg-gray-400 border shadow-sm rounded-xl overflow-hidden transition w-[98%] mx-[1%] h-auto my-2 items-center justify-center px-2":"hover:cursor-pointer flex group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition w-[98%] mx-[1%] h-auto my-2 items-center justify-center px-2"} >
    <div class=" w-[80%]">
      <h3 class="text-sm font-semibold text-gray-800">
        {data.title}
      </h3>
    </div>
    <div class=" h-[40px] relative w-[20%] my-5">
      <img draggable={false} class="w-[20px] h-[40px] absolute top- start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl" src="https://www.svgrepo.com/show/509019/arrow-right.svg" alt="Image Description"/>
    </div>
  </button>
  )
}

export default TestItem