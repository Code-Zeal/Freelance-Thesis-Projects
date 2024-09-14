import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddNoteModal from "./AddNoteModal";
import { deleteClassroom, updateClassroom } from "../../utils/api/classroom";
import { toast } from "sonner";

function MyNotes() {
  const navigate = useNavigate();
  const [tabla, setTabla] = useState(undefined)
  const [modal, setModal] = useState(false)
  const location = useLocation()

  const checkIfIdExists = (table,item) => {
      const itemId = item?.id;
      const alumnosAsistencia = table?.notasYAsistencias;
      for (const evaluation of alumnosAsistencia) {
        for (const alumno of evaluation?.alumnos) {
          if(alumno?.id === itemId){
            return alumno?.nota
          }
        }
      }
      
        return false; 
    }
    const checkEvaluationData = (table,item) => {
      const itemId = item?.id;
      const alumnosAsistencia = table?.notasYAsistencias;
      for (const evaluation of alumnosAsistencia) {
        return evaluation
      }
    }
  
    const handleSubmit = async(data)=>{
      let finalData = {
        "Notas":{...data,nota:""}
      }
      
          const {status} = await deleteClassroom("notasYAsistencias" ,finalData,location.state.cache.id)
          if(status === 200){
            toast.success("Nota asignada correctamente")
            setModal(false)
            navigate("/teacherDashboard")
          }else{
            toast.error("Ha ocurrido un error al asignar la nota")
          }
    }
  return (
    <div className="flex flex-col justify-between items-center bg-random1 bg-contain h-[100vh] w-full">
      {modal &&<AddNoteModal  setModal={setModal} data={modal} notasYAsistencias={location.state.cache.notasYAsistencias} id={location.state.cache.id} />}
      <button
        type="button"
        class="absolute flex flex-shrink-0 justify-center items-center gap-2 h-[50px] w-[120px] text-sm font-semibold rounded-lg border border-transparent bg-[#171717] border-blue-50 text-neutral-50 hover:border-blue-50 hover:text-blue-50 disabled:opacity-50 disabled:pointer-events-none top-5 left-5 hover:scale-110"
        onClick={() =>
          navigate("/teacherDashboard/Assistance", {
            state: { notasYAsistencias: location.state.cache },
          })
        }
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
        Mis notas
      </h1>
      <div className="flex justify-evenly w-full  h-[80%]">
        <div className="bg-[#849652] border-[4px] border-[#171717] rounded-lg p-3 flex flex-col items-center justify-center h-[95%] w-[90%] overflow-visible">
          <div class="flex flex-col w-full h-full bg-[#EAE3D9] rounded-lg">
          {!tabla ? (
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg shadow overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[70%]"
                          >
                            Evaluación
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[15%]"
                          >
                            Alumnos
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[15%] "
                          >
                            Detalles
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        {location?.state?.cache?.evaluaciones && [...location?.state?.cache?.evaluaciones,]?.sort((a, b) => a?.title.localeCompare(b?.title))?.map(
                          (item, index) => {
                            return (
                              <tr key={`filaNro ` + index}>
                                <td class="px-6 py-4 text-sm font-medium text-gray-800 w-[70%] break-words">
                                  {item.title}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-800 w-[15%] break-words ">
                                  {location?.state?.cache?.alumnos
                                    ? location?.state?.cache?.alumnos?.length
                                    : 0}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-800 w-[15%] break-words ">
                                  <button className="bg-[#171717] text-white px-3 text-lg rounded-lg" onClick={()=>setTabla({...item,alumnos:location?.state?.cache?.alumnos,notasYAsistencias:location?.state?.cache?.notasYAsistencias?.Notas})}>
                                    Ver
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>


            ) : (


              <div class="-m-1.5 overflow-x-auto">
                <button className="mt-5 ml-5 bg-white px-3 py-1 rounded-lg flex justify-center items-center hover:scale-105" onClick={()=>setTabla(undefined)}> <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-undo-2 pr-1"
        >
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>Volver</button>
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg shadow overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[30%]"
                          >
                           Nombre
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[55%]"
                          >
                            Evaluación
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[15%] "
                          >
                            Nota
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        {location.state?.cache?.alumnos?.sort((a, b) => a.name.localeCompare(b.name))?.map((item, index) => {
                        
                          let data = checkEvaluationData(tabla,item)

                          return (
                            <tr key={`filaNro ` + index}>
                              <td class="px-6 py-4 text-sm font-medium text-gray-800 w-[30%] break-words">
                                {item?.name}
                              </td>
                              <td class="px-6 py-4 text-sm text-gray-800 w-[55%] break-words ">
                                {tabla?.title}
                              </td>
                              <td class="px-6 py-4 text-sm text-gray-800 w-[15%] break-words">
                                {checkIfIdExists(tabla, item) ? (
                                  <div className="flex items-center gap-1">
                                    <span>{checkIfIdExists(tabla, item)}</span>

                                    <button
                                     onClick={() => handleSubmit({
                                      ...tabla,
                                      user: item,
                                      evaluation: data,
                                    })
                                        
                                      }
                                      className="bg-red-700 text-white px-2 py-1 rounded-lg hover:bg-red-800 hover:scale-105"
                                    >
                                      <img
                                        draggable={false}
                                        src="https://www.svgrepo.com/show/523070/trash-bin-trash.svg"
                                        alt="delete"
                                        width={30}
                                        height={30}
                                      />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() =>
                                      setModal({
                                        ...tabla,
                                        user: item,
                                        evaluation: data,
                                      })
                                    }
                                    className="bg-green-950 text-white px-3 py-1 rounded-lg hover:bg-green-800 hover:scale-105"
                                  >
                                    Agregar Nota
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyNotes;
