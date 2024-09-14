import React from 'react'
import { deleteClassroom } from '../../../utils/api/classroom';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function DeleteHomework({id,data}) {
  const navigate = useNavigate();
  const handleSubmit = async()=>{
    if(data){
        const {status} = await deleteClassroom("tareasYPracticas",data,id)
        if(status === 200){
          toast.success("Tarea o practica eliminada correctamente")
          navigate("/teacherDashboard")
        }else{
          toast.error("Ha ocurrido un error al eliminar la tarea o practica")
        }
      
    }
  }
  return (
    <div onClick={handleSubmit}  className='absolute bottom-5 right-[6%] size-24 py-2 px-2.5 z-[999999] bg-red-600 text-sm text-gray-900 rounded-xl hover:bg-red-400 dark:bg-neutral-700 dark:text-white hover:scale-105'>
      <img draggable={false} className=' hover:cursor-pointer w-full h-full rounded-full'  src="https://www.svgrepo.com/show/523070/trash-bin-trash.svg" alt="delete" />
    </div>
  )
}

export default DeleteHomework