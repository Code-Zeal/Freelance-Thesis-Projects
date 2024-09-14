import React from 'react'


function SideBar({}) {
  
 
  
  return (
    <div id="docs-sidebar" class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-[15%] bg-white border-e border-gray-200 pt-2 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700 h-full">
  <div class="p-4 border-y-2 border-white">
  </div>
  <nav class="hs-accordion-group p-4 w-full flex flex-col flex-wrap" data-hs-accordion-always-open >
    <ul class="space-y-5 ">
        <button onClick={()=>setShow(true)} class="mt-20 mx-auto flex items-center py-2 px-2.5 bg-gray-300 text-sm text-gray-900 rounded-xl hover:bg-gray-100 dark:bg-neutral-700 dark:text-white">
          <img draggable={false} src="https://www.svgrepo.com/show/524226/add-circle.svg" alt="" width={50} height={50} />
        </button>
       
    </ul>
  </nav>
        
</div>
  )
}

export default SideBar