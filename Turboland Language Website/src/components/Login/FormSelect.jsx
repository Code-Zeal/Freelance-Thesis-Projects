import React from "react";

function FormSelect({ setTypeForm }) {
  return (
    <div className="w-[60%] h-[40%] mx-auto flex flex-col justify-center items-center ">
      <div className="w-full mx-auto flex flex-col justify-center items-center border-[3px] border-[#171717] rounded-lg gap-6 py-6">

      <button
        type="button"
        className="w-[60%] justify-center py-3 px-4 inline-flex items-center gap-x-2 text-2xl font-semibold rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => setTypeForm("Student")}
      >
        Estudiante
      </button>
      <button
        type="button"
        className="w-[60%] justify-center py-3 px-4 inline-flex items-center gap-x-2 text-2xl font-semibold rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => setTypeForm("Teacher")}
      >
        Profesor
      </button>
        </div>
    </div>
  );
}

export default FormSelect;
