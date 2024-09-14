import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarGames from "./SideBarGames";
import { open } from '@tauri-apps/api/shell';
import { checkAssistant } from "../../utils/api/classroom";
import { studentStore } from "../../stores/student";

function Games() {
  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [error, setError] = useState(false);
  const [classRoomId, setClassRoomId] = useState(undefined)
  const {id,name,email,yearAndSection} = studentStore()

  let student = {id,name,email,yearAndSection}
  const check = async (idSelected)=>{
    await checkAssistant(student,classRoomId,"juegos",idSelected)
  }
  useEffect(() => {
  if(selected){
    check(selected?.id)
  }
  }, [selected])
  useEffect(() => {
    if (!selected && location?.state?.games) {
      setClassRoomId(location?.state?.id)
      setSelected(location?.state?.games[0]);
    }
  }, [selected]);

  const handleError = () => {
    console.log("error");
    setError(true);
  };

  return (
    <div className="bg-[#171717] w-full h-screen text-white flex">
      <SideBarGames
        setSelected={setSelected}
        selected={selected}
        data={location?.state?.games ? location?.state?.games : []}
      />
      <div
        className="w-[80%] bg-random2 bg-contain min-h-[100%] ml-auto text-white flex flex-col justify-center items-center "
      >
        {
          selected?.description &&
        <p className="text-base p-3 font-bold bg-[#171717] ">{selected?.description}</p>
        }
        {selected?.url&&
        <button onClick={() => open(selected?.url)} className="bg-[#171717] font-bold text-[#fff] py-2 px-3 my-3" >Link del juego</button>
        }
          <iframe src={selected?.url} style={{width: '100%', height: '100%'}} title="Evaluación" onError={handleError}></iframe>
      </div>
    </div>
  );
}

export default Games;
