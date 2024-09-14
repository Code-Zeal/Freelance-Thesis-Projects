import React from 'react'
//[{title:"NÚMEROS ORDINALES Y CARDINALES EN INGLÉS",url:"https://www.youtube.com/watch?v=TIRR-U2FPeg"},{title:"Aprende el ABECEDARIO en inglés ",url:"https://www.youtube.com/watch?v=I2SaZnEjmZw"}]
function VideoItem({videoSelected,setVideoSelected,data}) {
  return (
    <button onClick={videoSelected?.url === data?.url? false:()=>setVideoSelected(data)} class={videoSelected?.url === data?.url?"hover:cursor-not-allowed flex group bg-gray-400 border shadow-sm rounded-xl overflow-hidden transition w-[98%] mx-[1%] h-auto my-2 items-center justify-center px-2":"hover:cursor-pointer flex group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition w-[98%] mx-[1%] h-auto my-2 items-center justify-center px-2"} >
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

export default VideoItem