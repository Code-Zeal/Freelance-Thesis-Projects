import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { toast } from 'sonner';
import { updateClassroom } from '../../../utils/api/classroom';
import { useNavigate } from "react-router-dom";
function NewHomeworkModal({setModal,data,id,notasYAsistencias}) {
  const [titleTest, setTitleTest] = useState('');
  const [urlTest, setUrlTest] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async()=>{
    setLoading(true)
    if(titleTest && urlTest){
      let finalData = {
        "old":[...data],
        "new":{
          "id": self.crypto.randomUUID(),
        "title": titleTest,
        "url": urlTest
      }}
     
        const {status} = await updateClassroom("tareasYPracticas" ,finalData,id,false,notasYAsistencias)
        if(status === 200){
          toast.success("Tarea o practica creada correctamente")
          setModal(false)
          setLoading(false)
          navigate("/teacherDashboard")
        }else{
          setLoading(false)
          toast.error("Ha ocurrido un error al crear la tarea o practica")
        }
    }else{
      setLoading(false)
      toast.error("No puedes dejar ningún campo vacío")
    }
  }
  return (
    <div className='w-[75vw] h-[95vh] left-0 right-0 top-0 bottom-0 ml-auto mr-auto mt-auto mb-auto bg-gray-100 absolute z-50 text-black rounded-lg p-5 flex flex-col'>
          <div className="flex w-full justify-between mt-2 items-center">
          <h1 class="text-4xl dark:text-white">Crear nueva tarea o practica</h1>
          <button onClick={()=>setModal(false)} className="size-12 hover:scale-105"><img draggable={false} src="https://cdn-icons-png.flaticon.com/512/9068/9068699.png" alt="close" /></button>
          </div>
          
          <div class="relative">
          <input value={titleTest} onChange={(e)=>setTitleTest(e.target.value)} type="email" id="hs-floating-input-email" class="peer p-4 block w-full mr-auto mt-12 border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com"/>
          <label for="hs-floating-input-email" class="w-full mt-12 mr-auto left-0 right-0 absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] text-black peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Nombre de la tarea o practica</label>
      </div>
      <div class="relative">
          <input value={urlTest} onChange={(e)=>setUrlTest(e.target.value)} type="email" id="hs-floating-input-email" class="peer p-4 block w-full mr-auto mt-12 border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com"/>
          <label for="hs-floating-input-email" class="w-full mt-12 mr-auto left-0 right-0 absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] text-black peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Link de Google Form</label>
      </div>
      <button disabled={loading} onClick={handleSubmit} className="mt-auto bg-[#171717] text-white py-3 text-xl">{loading ? "Cargando...":"Crear"}</button>
          </div>
  )
}

export default NewHomeworkModal