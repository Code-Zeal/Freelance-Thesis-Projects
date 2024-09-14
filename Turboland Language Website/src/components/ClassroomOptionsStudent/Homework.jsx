import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarHomework from "./SideBarHomework";
import { studentStore } from "../../stores/student";
import { checkAssistant } from "../../utils/api/classroom";
function Homework() {
  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [classRoomId, setClassRoomId] = useState(undefined)
  const {id,name,email,yearAndSection} = studentStore()

  let student = {id,name,email,yearAndSection}
  const check = async (idSelected)=>{
    await checkAssistant(student,classRoomId,"tareasYPracticas",idSelected)
  }
  useEffect(() => {
  if(selected){
    check(selected?.id)
  }
  }, [selected])
  useEffect(() => {
    if (!selected && location?.state?.homeworks) {
      setClassRoomId(location?.state?.id)
      setSelected(location?.state?.homeworks[0]);
    }
  }, [selected]);
  return (
    <div className="bg-[#171717] w-full h-screen text-white flex">
      <SideBarHomework
        setSelected={setSelected}
        selected={selected}
        data={location?.state?.homeworks ? location?.state?.homeworks : []}
      />
      <div
        className="w-[80%] bg-random1 bg-contain ml-auto text-white flex justify-center 
      items-center"
      >
         <iframe src={selected?.url} style={{width: '100%', height: '100%'}} title="Evaluación"></iframe>
      </div>
    </div>
  );
}

export default Homework;
