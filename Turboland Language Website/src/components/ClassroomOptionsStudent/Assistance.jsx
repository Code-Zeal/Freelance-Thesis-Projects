import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { studentStore } from '../../stores/student';

function Assistance() {
 
  
  const navigate = useNavigate()
  const location = useLocation();
  const [notas, setNotas] = useState(undefined)
  const [asistencias, setAsistencias] = useState(undefined)
  const {id} = studentStore()
  function obtenerAsistencias(asistencias, id) {
    return asistencias.map(asistencia => {
      const alumno = asistencia?.alumnos?.find(alumno => alumno?.id === id);
      if (alumno) {
        return { ...asistencia, alumnos: alumno };
      } else {
        return { ...asistencia, alumnos: { id: id, estado: 'none' } };
      }
    });
  }
  useEffect(() => {
    if(location?.state?.notasYAsistencias && id){
      if(location?.state?.notasYAsistencias?.Notas?.length > 0){
        setNotas(obtenerAsistencias(location?.state?.notasYAsistencias?.Notas,id))
      }
      if (location?.state?.notasYAsistencias?.Asistencias?.length > 0){
        setAsistencias(obtenerAsistencias(location?.state?.notasYAsistencias?.Asistencias,id))
      }
    }
 
  }, [location,id])
  
  
  return (
    <div className="flex flex-col justify-between items-center bg-random1 bg-contain h-[100vh] w-full">
      <button
          type="button"
          class="absolute flex flex-shrink-0 justify-center items-center gap-2 h-[50px] w-[120px] text-sm font-semibold rounded-lg border border-transparent bg-[#171717] border-blue-50 text-neutral-50 hover:border-blue-50 hover:text-blue-50 disabled:opacity-50 disabled:pointer-events-none top-5 left-5 hover:scale-110"
          onClick={() => navigate("/home")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-undo-2"
          >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
          </svg>
          <span>Volver</span>
        </button>
      <h1 className="bg-[#171717] text-white rounded-tl-lg rounded-br-lg px-10 py-3 mt-6 text-3xl font-semibold">
        Asistencia y Notas
      </h1>
      <div className="flex justify-evenly w-full  h-[80%]">

        <button onClick={()=>navigate("/home/Assistance/MyAssistance",{state:{asistencias,cache:location?.state?.notasYAsistencias}})} className="bg-[#849652]  border-[8px] border-[#171717] rounded-lg p-5  hover:scale-105 flex flex-col items-center justify-center h-[500px]">
          <img draggable={false}
          width={350}
          height={350}
            src="https://cdn-icons-png.flaticon.com/512/3197/3197877.png"
          />
          <div className="w-full text-center bg-[#171717] py-5 rounded-tl-lg rounded-br-lg mt-3">
            <span className="text-[#fff] text-xl font-semibold ">
              Verifica tu asistencia aquí!!
            </span>
          </div>
        </button>

        <button onClick={()=>navigate("/home/Assistance/MyNotes",{state:{notas,cache:location?.state?.notasYAsistencias}})} className="bg-[#849652] border-[8px] border-[#171717] rounded-lg p-5  hover:scale-105 h-[500px]">
          <img draggable={false}
          width={350}
          height={350}
            src="https://cdn-icons-png.flaticon.com/512/3965/3965068.png"
          />
          <div className="w-full text-center bg-[#171717] py-5 rounded-tl-lg rounded-br-lg mt-3">
            <span className="text-[#fff] text-xl font-semibold ">
              Ve tus notas aquí!!
            </span>
          </div>
        </button>

      </div>
    </div>
  );
}

export default Assistance