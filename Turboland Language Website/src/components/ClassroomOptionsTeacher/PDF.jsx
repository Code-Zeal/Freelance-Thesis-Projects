import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import SideBarPDF from './SideBarPDF';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import NewLibrosPDF from './Add/NewLibrosPDF';
import NewLibrosPDFModal from './Add/NewLibrosPDFModal';
import DeleteLibrosPDF from './Delete/DeleteLibrosPDF';
function PDF() {
  const workerUrl = `https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js`;
  const location = useLocation();
  const [pdfSelected, setPDFSelected] = useState(undefined)
  const [modal, setModal] = useState(false)

  useEffect(() => {
  if(!pdfSelected && location?.state?.pdf){
    setPDFSelected(location?.state?.pdf[0])
  }
  }, [pdfSelected])
  return (
    <div className='bg-[#171717] w-full h-screen text-white flex'>
     <Worker workerUrl={workerUrl}>
      <SideBarPDF setPDFSelected={setPDFSelected} pdfSelected={pdfSelected} data={location?.state?.pdf}/>


      <DeleteLibrosPDF id={location?.state?.id} data={pdfSelected}/>

      {<NewLibrosPDF setModal={setModal}/>}

      <div className='w-[80%] bg-random1 bg-contain ml-auto text-white flex justify-center 
      items-center relative'>
        {modal &&  <NewLibrosPDFModal notasYAsistencias={location?.state?.notasYAsistencias} data={location?.state?.pdf ? location?.state?.pdf : []} id={location?.state?.id}  setModal={setModal}/>}
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
