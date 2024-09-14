import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import SideBarTests from './SideBarTests';

function Tests() {
  const location = useLocation();
  const [testSelected, setTestSelected] = useState(undefined)

  useEffect(() => {
  if(!testSelected && location?.state?.tests){
    setTestSelected(location?.state?.tests[0])
  }
  }, [testSelected])
  
  return (
    <div className='bg-[#171717] w-full h-screen text-white flex'>
      <SideBarTests setTestSelected={setTestSelected} testSelected={testSelected} data={location?.state?.tests}/>
      <div className='w-[80%] ml-auto bg-random2 bg-contain text-white flex justify-center items-center'>
      <iframe src={testSelected?.url} style={{width: '100%', height: '100%'}} title="Evaluación"></iframe>
      </div>
    </div>
  )
}

export default Tests
