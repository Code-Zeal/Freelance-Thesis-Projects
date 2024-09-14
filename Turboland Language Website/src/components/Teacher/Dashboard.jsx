import React, { useEffect, useState } from 'react'
import SideBarClass from './SideBarClass'
import { useLocation } from "react-router-dom";
import {  destroyClassroom, getTeacherClassrooms } from '../../utils/api/classroom';
import { useNavigate } from 'react-router-dom';
import JoinClassModal from './JoinClassModal';
import { teacherStore } from '../../stores/teacher';
import ContentContainer from './ContentContainer';
import { toast } from 'sonner';
function Dashboard() {
  const [show, setShow] = useState(false)
  const [modal, setModal] = useState(false)
  const [classrooms, setClassrooms] = useState(undefined)
  const [classSelected, setClassSelected] = useState(undefined)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classroomQuery = queryParams.get('classroomQuery');
  const {id} = teacherStore()

  const onDeleteClass = async ()=>{
    setModal(false)
   const {status} = await destroyClassroom(classroomQuery)
   if(status === 200){
    toast.success("Clase eliminada correctamente")
    window.location.reload()
  }else{
    toast.error("Ha ocurrido un error al eliminar la clase")
  }
  }
  const getClassroomInfo = async()=>{
    try {
      const {responseData,status}= await getTeacherClassrooms(id)
      if(status !== 200){
        setClassrooms([])
      }else{
        setClassrooms(responseData)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();

  useEffect(() => {
    if(id){
      getClassroomInfo()
    }
    
  }, [id])
  useEffect(() => {
    
  if(classroomQuery && classrooms?.length > 0){
    const classR = classrooms.find((el)=>el?.id.toString() === classroomQuery.toString())
    setClassSelected(classR)
  }
  }, [classroomQuery,classrooms])
  useEffect(() => {
    if(!classroomQuery && classrooms){
      navigate("/teacherDashboard?classroomQuery="+classrooms[0]?.id)
    }

  }, [classroomQuery,classrooms])
  return (
    <main className="bg-[#171717] w-full h-screen text-white flex">
      <SideBarClass
      classSelected={classSelected}
        setModal={setModal}
        classroomQuery={classroomQuery}
        setShow={setShow}
        classrooms={classrooms ? classrooms : []}
        navigate={navigate}
      />
      <div className="w-[85%] ml-auto text-white bg-contain  bg-random1 flex">
        {modal && (
          <div
            id="hs-slide-down-animation-modal"
            class="hs-overlay  size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
          >
            <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0  ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
              <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                <div class="flex justify-between items-center py-3 px-4 border-b">
                  <h3 class="font-bold text-gray-800">Eliminar clase</h3>
                  <button
                    onClick={() => setModal(false)}
                    type="button"
                    class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    data-hs-overlay="#hs-slide-down-animation-modal"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      class="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
                <div class="p-4 overflow-y-auto">
                  <p class="mt-1 text-gray-800">
                    Está seguro/a de que quiere eliminar la clase? esta acción
                    no se puede deshacer y se perderá todo el contenido subido
                  </p>
                </div>
                <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                  <button
                  onClick={()=>onDeleteClass()}
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    data-hs-overlay="#hs-slide-down-animation-modal"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={()=>setModal(false)}
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    NO ELIMINAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
       {classSelected ? (
          <ContentContainer
            id={classSelected?.id}
            classSelected={classSelected}
          />
        ) : !classSelected && classrooms?.length > 0 ? (
          <h2 className="text-black  text-[6vw] font-bold ml-auto mr-auto mt-auto mb-auto flex flex-col justify-center items-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                fill="#000000"
              />
            </svg>{" "}
            Selecciona una clase
          </h2>
        ) : !classSelected && classrooms?.length < 1 ? (
          <h2 className="text-black  text-[6vw] font-bold ml-auto mr-auto mt-auto mb-auto flex flex-col justify-center items-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                fill="#000000"
              />
            </svg>{" "}
            Crea una clase
          </h2>
        ) : (
          <h2 className="text-black  text-[6vw] font-bold ml-auto mr-auto mt-auto mb-auto flex flex-col justify-center items-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 1V5"
                stroke="#DF1463"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M19.4246 18.9246L16.5961 16.0962"
                stroke="#1C1C1C"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M22.5 11.5L18.5 11.5"
                stroke="#1C1C1C"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M12 18V22"
                stroke="#1C1C1C"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M7.40381 6.90381L4.57538 4.07538"
                stroke="#1C1C1C"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M5.5 11.5L1.5 11.5"
                stroke="#1C1C1C"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M7.40381 16.0962L4.57538 18.9246"
                stroke="#1C1C1C"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
            Cargando...
          </h2>
        )}
      </div>
      <JoinClassModal show={show} setShow={setShow} />
    </main>
  );
}

export default Dashboard