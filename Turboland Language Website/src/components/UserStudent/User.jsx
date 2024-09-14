import React, { useEffect, useState } from 'react'
import SideBarClass from './SideBarClass'
import { useLocation } from "react-router-dom";
import { getMyClassrooms } from '../../utils/api/classroom';
import { studentStore } from '../../stores/student';
import { useNavigate } from 'react-router-dom';
import TuPerfil from './TuPerfil';
function User() {

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
  return (
    <main className='bg-[#171717] w-full h-screen text-white flex'>
    <SideBarClass classroomQuery={classroomQuery} setShow={setShow} classrooms={classrooms} navigate={navigate}/>
    <div className='w-[85%] ml-auto text-white'>
      <TuPerfil/>
      </div>
    </main>
  )
}

export default User