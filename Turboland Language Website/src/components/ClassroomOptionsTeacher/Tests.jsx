import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import SideBarTests from './SideBarTests';
import NewTestModal from './Add/NewTestModal';
import NewTest from './Add/NewTest';
import DeleteTest from './Delete/DeleteTest';

function Tests() {
  const location = useLocation();
  const [testSelected, setTestSelected] = useState(undefined)
  const [modal, setModal] = useState(false)

  useEffect(() => {
  if(!testSelected && location?.state?.tests){
    setTestSelected(location?.state?.tests[0])
  }
  }, [testSelected])
  
  return (
    <div className='bg-[#171717] w-full h-screen text-white flex'>
      <SideBarTests setTestSelected={setTestSelected} testSelected={testSelected} data={location?.state?.tests}/>
        <DeleteTest id={location?.state?.id} data={testSelected}/>
        {<NewTest setModal={setModal}/>}
      <div className='relative w-[80%] ml-auto bg-random2 bg-contain text-white flex justify-center items-center'>
      {modal &&  <NewTestModal notasYAsistencias={location?.state?.notasYAsistencias} data={location?.state?.tests ? location?.state?.tests : []} id={location?.state?.id}  setModal={setModal}/>}
      <iframe src={testSelected?.url} style={{width: '100%', height: '100%'}} title="Evaluación"></iframe>
      </div>
    </div>
  )
}

export default Tests
