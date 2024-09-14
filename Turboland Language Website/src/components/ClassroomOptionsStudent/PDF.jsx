import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import SideBarPDF from './SideBarPDF';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { studentStore } from '../../stores/student';
import { checkAssistant } from '../../utils/api/classroom';
function PDF() {
  const workerUrl = `https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js`;
  const location = useLocation();
  const [pdfSelected, setPDFSelected] = useState(undefined)
  const [modal, setModal] = useState(false)
  const [classRoomId, setClassRoomId] = useState(undefined)
  const {id,name,email,yearAndSection} = studentStore()

  let student = {id,name,email,yearAndSection}
  const check = async (idSelected)=>{
    await checkAssistant(student,classRoomId,"librosPDF",idSelected)
  }
  useEffect(() => {
  if(pdfSelected){
    check(pdfSelected?.id)
  }
  }, [pdfSelected])
  useEffect(() => {
  if(!pdfSelected && location?.state?.pdf){
    setClassRoomId(location?.state?.id)
    setPDFSelected(location?.state?.pdf[0])
  }
  }, [pdfSelected])
  return (
    <div className='bg-[#171717] w-full h-screen text-white flex'>
     <Worker workerUrl={workerUrl}>
      <SideBarPDF setPDFSelected={setPDFSelected} pdfSelected={pdfSelected} data={location?.state?.pdf}/>

      <div className='w-[80%] bg-random1 bg-contain ml-auto text-white flex justify-center 
      items-center relative'>
        {
          pdfSelected?.url &&
      <Viewer  fileUrl={"{backend-url}"+pdfSelected?.url} />
        }
      </div>
        </Worker>
    </div>
  )
}
export default PDF
