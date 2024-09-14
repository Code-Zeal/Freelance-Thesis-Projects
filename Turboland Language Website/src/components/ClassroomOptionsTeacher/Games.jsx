import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarGames from "./SideBarGames";
import { open } from '@tauri-apps/api/shell';
import NewGames from "./Add/NewGames";
import NewGamesModal from "./Add/NewGamesModal";
import DeleteGames from "./Delete/DeleteGames";

function Games() {
  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!selected && location?.state?.games) {
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
      <DeleteGames id={location?.state?.id} data={selected}/>
      {<NewGames setModal={setModal}/>}
      {selected ?<div
        className="w-[80%] bg-random2 bg-contain min-h-[100%] ml-auto text-white flex flex-col justify-center items-center relative"
      >
         {modal &&  <NewGamesModal data={location?.state?.games ? location?.state?.games : []} id={location?.state?.id}  setModal={setModal}/>}
        <p className="text-base p-3 font-bold bg-[#171717] ">{selected?.description}</p>
        <button onClick={() => open(selected?.url)} className="bg-[#171717] font-bold text-[#fff] py-2 px-3 my-3" >Link del juego</button>
          <iframe src={selected?.url} style={{width: '100%', height: '100%'}} title="Evaluación" onError={handleError}></iframe>
      </div>:<div
        className="w-[80%] bg-random2 bg-contain min-h-[100%] ml-auto text-white flex flex-col justify-center items-center relative"
      > {modal &&  <NewGamesModal notasYAsistencias={location?.state?.notasYAsistencias} data={location?.state?.games ? location?.state?.games : []} id={location?.state?.id}  setModal={setModal}/>}</div>
    }
    </div>
  );
}

export default Games;
