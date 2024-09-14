import React, { useEffect, useState } from 'react'
import SideBarClass from './SideBarClass'
import JoinClassModal from './JoinClassModal'
import { useLocation } from "react-router-dom";
import { getMyClassrooms } from '../../utils/api/classroom';
import { studentStore } from '../../stores/student';
import ContentContainer from './ContentContainer';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [show, setShow] = useState(false)
  const [classrooms, setClassrooms] = useState(undefined)
  const [classSelected, setClassSelected] = useState(undefined)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classroomQuery = queryParams.get('classroomQuery');
  const {id} = studentStore()
  const getClassroomInfo = async()=>{
    try {
      
      const {responseData,status}= await getMyClassrooms(id)
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
      navigate("/home?classroomQuery="+classrooms[0]?.id)
    }

  }, [classroomQuery,classrooms])
  return (
    <main className="bg-[#171717]  h-[100vh] w-full text-white flex">
      <SideBarClass
        classroomQuery={classroomQuery}
        setShow={setShow}
        classrooms={classrooms}
        navigate={navigate}
      />
      <div className="w-[85%] ml-auto text-white bg-contain  bg-random2 flex">
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
            Únete a una clase
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

export default Home