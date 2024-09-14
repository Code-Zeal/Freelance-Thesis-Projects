import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarAudios from "./SideBarAudios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { checkAssistant } from "../../utils/api/classroom";
import { studentStore } from "../../stores/student";
function Audios() {
  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [classRoomId, setClassRoomId] = useState(undefined)
  const {id,name,email,yearAndSection} = studentStore()

  let student = {id,name,email,yearAndSection}
  const check = async (idSelected)=>{
    await checkAssistant(student,classRoomId,"librosPDF",idSelected)
  }
  useEffect(() => {
  if(selected){
    check(selected?.id)
  }
  }, [selected])
  useEffect(() => {
    if (!selected && location?.state?.audios) {
      setClassRoomId(location?.state?.id)
      setSelected(location?.state?.audios[0]);
    }
  }, [selected]);
  return (
    <div className="bg-[#171717] w-full h-screen text-white flex">
      <SideBarAudios
        setSelected={setSelected}
        selected={selected}
        data={location?.state?.audios}
      />
      <div
        className="w-[80%] bg-random2 bg-contain ml-auto text-white flex justify-center 
      items-center"
      >
        <AudioPlayer
        showDownloadProgress
          autoPlay={false}
          className="w-[80%] rounded-xl bg-[#ff943d] text-[#000]"
          src={"{backend-url}"+selected?.url}
          
        />
      </div>
    </div>
  );
}

export default Audios;
