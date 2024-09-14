import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarThemes from "./SideBarThemes";
import ThemeBox from "./ThemeBox";
import ThemeSelected from "./ThemeSelected";
import NewTheme from "./Add/NewTheme";
import NewThemeModal from "./Add/NewThemeModal";
function Themes() {

  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [themeSelected, setThemeSelected] = useState(undefined);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!selected && location?.state?.temas) {
      setSelected(location?.state?.temas[0]);
    }
  }, [selected]);
  return (
    <div className="bg-random1 bg-cover w-full h-screen text-white flex">
      <SideBarThemes
        setSelected={setSelected}
        selected={selected}
        data={location?.state?.temas ? location?.state?.temas : []}
      />
        {!themeSelected &&<NewTheme setModal={setModal}/>}
      <div
        className="w-[80%] relative ml-auto flex justify-start items-start flex-wrap p-5 overflow-auto"
      >
       {modal &&  <NewThemeModal notasYAsistencias={location?.state?.notasYAsistencias} data={location?.state?.temas ? location?.state?.temas : []} id={location?.state?.id} selected={selected} setModal={setModal}/>}
       {themeSelected ? 
            <ThemeSelected id={location?.state?.id}  data={themeSelected} setTheme={setThemeSelected}/> : selected?.data?.map((tema,index)=>{
          return (
            <ThemeBox key={`tema Nro`+ index} data={tema} setTheme={setThemeSelected}/>
          )
        })}
      </div>
    </div>
  );
}

export default Themes;
