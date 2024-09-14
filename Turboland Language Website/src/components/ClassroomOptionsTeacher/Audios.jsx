import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarAudios from "./SideBarAudios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import NewAudiosModal from "./Add/NewAudiosModal";
import NewAudios from "./Add/NewAudios";
import DeleteAudios from "./Delete/DeleteAudios";
function Audios() {
  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!selected && location?.state?.audios) {
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

      <DeleteAudios id={location?.state?.id} data={selected}/>

      {<NewAudios setModal={setModal}/>}

      <div
        className="w-[80%] bg-random2 bg-contain ml-auto text-white flex justify-center 
      items-center relative"
      >
         {modal &&  <NewAudiosModal notasYAsistencias={location?.state?.notasYAsistencias} data={location?.state?.audios ? location?.state?.audios : []} id={location?.state?.id}  setModal={setModal}/>}
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
