import React, { useEffect, useState } from 'react'
import SideBarVideos from './SideBarVideos'
import { useLocation } from "react-router-dom";
import ReactPlayer from 'react-player'
import { studentStore } from '../../stores/student';
import { checkAssistant } from '../../utils/api/classroom';

function Videos() {
  const location = useLocation();
  const [videoSelected, setVideoSelected] = useState(undefined)
  const [classRoomId, setClassRoomId] = useState(undefined)
  const {id,name,email,yearAndSection} = studentStore()

  let student = {id,name,email,yearAndSection}
  const check = async (idSelected)=>{
    await checkAssistant(student,classRoomId,"tareasYPracticas",idSelected)
  }
  useEffect(() => {
  if(videoSelected){
    check(videoSelected?.id)
  }
  }, [videoSelected])

  useEffect(() => {
  if(!videoSelected && location?.state?.videos){
    setClassRoomId(location?.state?.id)
    setVideoSelected(location?.state?.videos[0])
  }
  }, [videoSelected])
  
  return (
    <div className='bg-[#171717] w-full h-screen text-white flex'>
      <SideBarVideos setVideoSelected={setVideoSelected} videoSelected={videoSelected} data={location?.state?.videos}/>
      <div className='w-[75%] bg-random1 bg-contain ml-auto text-white flex justify-center items-center'>
        <ReactPlayer controls={true} light={true} width={"90%"} height={"65%"} url={videoSelected?.url} />
      </div>
    </div>
  )
}

export default Videos
