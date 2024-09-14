import React, { useEffect } from "react";
import ClassroomSidebarItem from "./ClassroomSidebarItem";
import { studentStore } from "../../stores/student";

function SideBarClass({ classrooms, setShow, classroomQuery, navigate }) {
  const {clearAllFields} = studentStore()
  let sorted = classrooms?.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  return (
    <div
      id="docs-sidebar"
      class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-[15%] bg-[#171717] border-e border-[#171717] pt-2 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700 h-full"
    >
      <div class="p-4 border-y-2 border-gray-200">
        <h2
          class="flex-none text-xl font-semibold text-gray-200"
          aria-label="Brand"
        >
          Clases en las que estas inscrito
        </h2>
      </div>
      <nav
        class="hs-accordion-group p-4 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul class="space-y-5 ">
          {sorted?.length > 0 ? (
            sorted?.map((classroom, index) => {
              return (
                <ClassroomSidebarItem
                  classroomQuery={
                    classroomQuery?.toString() === classroom?.id?.toString()
                  }
                  icon={classroom?.logo}
                  name={classroom?.nombre}
                  id={classroom?.id}
                  key={`ClassroomSidebarItem` + index}
                />
              );
            })
          ) : sorted?.length < 1 ? <p className="text-center">No estás en ninguna clase</p> :
            <p className="text-center">Cargando...</p>
          }
          <button
            onClick={() => setShow(true)}
            class="mt-20 mx-auto flex items-center py-2 px-2.5 bg-gray-300 text-sm text-gray-900 rounded-xl hover:bg-gray-100 dark:bg-neutral-700 dark:text-white"
          >
            <img draggable={false}
              src="https://www.svgrepo.com/show/524226/add-circle.svg"
              alt=""
              width={50}
              height={50}
            />
          </button>
        </ul>
        <div className="absolute bottom-3 left-0 right-0 ml-auto mr-auto flex items-center justify-center gap-2">
          <button
            onClick={() => navigate("/user")}
            class="py-2 px-2.5 bg-gray-300 text-sm text-gray-900 rounded-xl hover:bg-gray-100 dark:bg-neutral-700 dark:text-white w-[80px] h-[70px]"
          >
            <img draggable={false}
              src="https://www.svgrepo.com/show/532362/user.svg"
              alt=""
              width={50}
              height={50}
              className="ml-auto mr-auto"
            />
          </button>
          <button
            onClick={() =>{
              clearAllFields()
              navigate("/")}
          }
            class="py-2 px-2.5 bg-gray-300 text-sm text-gray-900 rounded-xl hover:bg-gray-100 dark:bg-neutral-700 dark:text-white w-[80px] h-[70px]"
          >
            <img draggable={false}
              src="https://www.svgrepo.com/show/509151/logout.svg"
              alt=""
              width={50}
              height={50}
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default SideBarClass;
