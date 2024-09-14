import React, { useState } from "react";
import { studentStore } from "../../stores/student";
import { useNavigate } from "react-router-dom";
import { joinClassroom } from "../../utils/api/classroom";
import { toast } from "sonner";

function JoinClassModal({ show, setShow }) {
  const navigate = useNavigate()
  const [code, setCode] = useState("")

  const {id,name,email,profilePic}= studentStore()
  const joinClass = async()=>{
      if(code?.length > 0 && id){
        const {responseData,status} =await joinClassroom(code,id)
        if(status !== 200){
          toast.info("Ha ocurrido un error al intentar unirte a esa clase, verifica el código e inténtelo de nuevo.")
        }else{
          toast.success("Te has unido a la clase correctamente.")
          window.location.reload()
        }
      }
  }
  if (show)
    return (
      <div className="z-[9999] left-0 right-0 top-0 bottom-0 ml-auto mr-auto mt-auto mb-auto absolute w-[60%] h-[95%] bg-white  rounded-lg p-4 pt-14">
        <button className="text-gray-500 absolute right-4 top-5" onClick={() => setShow(false)}>
          <img draggable={false} src="https://www.svgrepo.com/show/286637/cancel-close.svg" alt="" width={30} height={30} />
        </button>
        <h2 className="text-gray-900 border-2  border-gray-800 p-3">
          Te estas uniendo a una nueva clase
        </h2>
        <p className="text-gray-900 border-2 border-t-0 border-gray-800 p-3">
          Sigue estos paso para obtener una nueva clase
        </p>
        <div className="text-gray-900 border-2 border-t-0 border-gray-800">
          <p className="p-3">Accediste como:</p>
          <div className="flex justify-between items-center px-5 pb-5">
            <div className="flex">
            <img draggable={false} src={profilePic?profilePic:"https://www.svgrepo.com/show/529293/user.svg"} alt="" width={80} height={80} className="border-2 border-black rounded-full p-0 w-[80px] h-[80px]" />
            <div className="flex flex-col justify-center items-start ml-3 ">
            <p className="text-gray-900 ">{name}</p>
            <p className="text-gray-900 ">{email}</p>
            </div>
            </div>
            <button onClick={()=>navigate("/")} className="border-2 border-black p-2">Cambiar de cuenta</button>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-gray-900 border-2 border-t-0 border-gray-800">
          <div className="w-full flex flex-col justify-center items-start p-3">

          <h2>Código de clase</h2>
          <p>Pídele a tu profesor/a el código de la clase, ingrésala aquí</p>
          </div>
          <input onChange={(e)=>setCode(e.target.value)} className="mt-5 border-2 border-black p-2 " type="text" placeholder="Ej: AB1231621789123456789" />
          <button onClick={joinClass} type="button" class="my-5 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
  Unirme
</button>
          <div className="w-full flex flex-col justify-center items-start p-3">

          <p>Para acceder con un código de la calase</p>
          <p>*Usa una cuenta autorizada</p>
          <p>*El código de la clase está conformado entre 6 a 8 letras y números, sin espacios y sin símbolos especiales </p>
          </div>
          
        </div>
      </div>
    );
}

export default JoinClassModal;
