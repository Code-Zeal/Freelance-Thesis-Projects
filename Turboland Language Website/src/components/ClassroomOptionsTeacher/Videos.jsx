import React, { useEffect, useState } from 'react'
import SideBarVideos from './SideBarVideos'
import { useLocation } from "react-router-dom";
import ReactPlayer from 'react-player'
import NewVideoModal from './Add/NewVideoModal';
import NewVideo from './Add/NewVideo';
import DeleteVideo from './Delete/DeleteVideo';

function Videos() {
  const location = useLocation();
  const [videoSelected, setVideoSelected] = useState(undefined)
  const [modal, setModal] = useState(false)

  useEffect(() => {
  if(!videoSelected && location?.state?.videos){
    setVideoSelected(location?.state?.videos[0])
  }
  }, [videoSelected])
  
  return (
    <div className='bg-[#171717] w-full h-screen text-white flex'>
      <SideBarVideos setVideoSelected={setVideoSelected} videoSelected={videoSelected} data={location?.state?.videos}/>
      <DeleteVideo id={location?.state?.id} data={videoSelected}/>
      {<NewVideo setModal={setModal}/>}

      <div className='w-[75%] bg-random1 bg-contain ml-auto text-white flex justify-center items-center relative'>
      {modal &&  <NewVideoModal notasYAsistencias={location?.state?.notasYAsistencias} data={location?.state?.videos ? location?.state?.videos : []} id={location?.state?.id}  setModal={setModal}/>}
        <ReactPlayer controls={true} light={true} width={"90%"} height={"65%"} url={videoSelected?.url} />
      </div>
    </div>
  )
}

export default Videos
