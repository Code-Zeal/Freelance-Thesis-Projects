import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckPending from "../../assets/CheckPending";

function MyNotes() {
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <div className="flex flex-col justify-between items-center bg-random1 bg-contain h-[100vh] w-full">
      <button
        type="button"
        class="absolute flex flex-shrink-0 justify-center items-center gap-2 h-[50px] w-[120px] text-sm font-semibold rounded-lg border border-transparent bg-[#171717] border-blue-50 text-neutral-50 hover:border-blue-50 hover:text-blue-50 disabled:opacity-50 disabled:pointer-events-none top-5 left-5 hover:scale-110"
        onClick={() =>
          navigate("/home/Assistance", {
            state: { notasYAsistencias: location?.state?.cache },
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
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="border rounded-lg shadow overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[30%]"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[60%]"
                        >
                          Evaluación
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase w-[10%] "
                        >
                          Nota
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {location?.state?.notas?.map((item, index) => {
                        return (
                          <tr key={`filaNr ` + index}>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 w-[30%] break-words">
                              {item?.id}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-800 w-[60%] break-words ">
                              {item?.evaluation}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-800 w-[10%] break-words">
                              {item?.alumnos?.nota?item?.alumnos?.nota:<CheckPending texto="Pendiente por nota" />}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyNotes;
