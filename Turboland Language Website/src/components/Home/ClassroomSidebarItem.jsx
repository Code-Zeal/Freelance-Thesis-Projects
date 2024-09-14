import React from 'react'
import { useNavigate } from 'react-router-dom'
import Flag from 'react-world-flags'
function ClassroomSidebarItem({name,id,icon,classroomQuery}) {
  const navigation = useNavigate()
  return (
    <li>
        <button class={classroomQuery?" w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-400 text-neutral-700 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
        :
        "w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-300 text-sm text-gray-900 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white"} onClick={()=>navigation("/home?classroomQuery="+id)}>
        <Flag code={ icon } width={24} height={24} />
          {name}
        </button>
      </li>
  )
}

export default ClassroomSidebarItem