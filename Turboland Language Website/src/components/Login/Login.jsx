import React, { useState } from "react";
import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";
import FormSelect from "./FormSelect";
import UEP from "../../assets/UEP.jpeg";
import Logo from "../../assets/AppLogo.jpeg"
import { appWindow } from '@tauri-apps/api/window';
function Login() {
  const [typeForm, setTypeForm] = useState(undefined);
  const [loading, setLoading] = useState(false)
    const handleClose = async () => {
      await appWindow.close();
    };
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-home bg-contain">
      <button onClick={handleClose} className="absolute top-5 right-5"><img src="https://www.svgrepo.com/show/273966/close.svg" width={50} height={50} /></button>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex justify-evenly items-center bg-[#171717] py-2 rounded-br-2xl rounded-bl-2xl">
          <img draggable={false} src={UEP} width={150} height={150} />{" "}
          <div className="flex flex-col text-white text-2xl text-center ">
            <p>República Bolivariana de Venezuela</p>
            <p>Ministerio del Poder Popular para la Educación</p>
            <p>U.E.P. "Arqui. Mons. Rafael Arias Blanco"</p>
            <p>Maracaibo Estado Zulia</p>
          </div>{" "}
          <img draggable={false} src={Logo} width={150} height={150} />
        </div>
        <h1 className="text-7xl text-[#171717] font-bold text-center w-[80%] mx-auto [text-shadow:_1px_4px_0_rgb(0_0_0_/_40%)] absolute left-0 right-0 top-0 bottom-14 h-[20%] my-auto ">
          Welcome to turboland language website
        </h1>
      </div>
      {!typeForm ? <FormSelect setTypeForm={setTypeForm} /> : false}
      {typeForm === "Student" ? (
        <StudentForm setLoading={setLoading} loading={loading} setTypeForm={setTypeForm} />
      ) : (
        false
      )}
      {typeForm === "Teacher" ? (
        <TeacherForm setLoading={setLoading} loading={loading} setTypeForm={setTypeForm} />
      ) : (
        false
      )}
    </div>
  );
}

export default Login;
