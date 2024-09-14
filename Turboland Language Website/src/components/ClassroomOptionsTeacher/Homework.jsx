import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarHomework from "./SideBarHomework";
import NewHomeworkModal from "./Add/NewHomeworkModal";
import NewHomework from "./Add/NewHomework";
import DeleteHomework from "./Delete/DeleteHomework";
function Homework() {
  const location = useLocation();
  const [selected, setSelected] = useState(undefined);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!selected && location?.state?.homeworks) {
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
      <DeleteHomework id={location?.state?.id} data={selected}/>
      {<NewHomework setModal={setModal}/>}
      <div
        className="w-[80%] bg-random1 bg-contain ml-auto text-white flex justify-center 
      items-center relative"
      >
         {modal &&  <NewHomeworkModal notasYAsistencias={location?.state?.notasYAsistencias} data={location?.state?.homeworks ? location?.state?.homeworks : []} id={location?.state?.id}  setModal={setModal}/>}
         <iframe src={selected?.url} style={{width: '100%', height: '100%'}} title="Evaluación"></iframe>
      </div>
    </div>
  );
}

export default Homework;
