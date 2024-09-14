import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarThemes from "./SideBarThemes";
import ThemeBox from "./ThemeBox";
import ThemeSelected from "./ThemeSelected";
import { studentStore } from "../../stores/student";
import { checkAssistant } from "../../utils/api/classroom";
function Themes() {
  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [themeSelected, setThemeSelected] = useState(undefined);
  const [classRoomId, setClassRoomId] = useState(undefined)
  const {id,name,email,yearAndSection} = studentStore()

  let student = {id,name,email,yearAndSection}
  const check = async (id)=>{
    await checkAssistant(student,classRoomId,"temas",id)
  }
  useEffect(() => {
  if(ThemeSelected){
    check(themeSelected?.id)
  }
  }, [themeSelected])
  
  useEffect(() => {
    if (!selected && location?.state?.temas) {
      setClassRoomId(location?.state?.id)
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
      <div
        className="w-[80%] relative ml-auto flex justify-start items-start flex-wrap p-5 overflow-auto"
      >
       {themeSelected ? 
            <ThemeSelected data={themeSelected} setTheme={setThemeSelected}/> : selected?.data?.map((tema,index)=>{
          return (
            <ThemeBox key={`tema Nro`+ index} data={tema} setTheme={setThemeSelected}/>
          )
        })}
      </div>
    </div>
  );
}

export default Themes;
