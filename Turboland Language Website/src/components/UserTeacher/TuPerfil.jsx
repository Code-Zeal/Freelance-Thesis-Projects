import React, { useState } from "react";
import { studentStore } from "../../stores/student";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { teacherStore } from "../../stores/teacher";
import { updateTeacher } from "../../utils/api/teacher";
import { toast } from "sonner";
function TuPerfil() {
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dx2me9gqm");
  // Replace with your own upload preset
  const [isEditing, setIsEditing] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [uploadPreset] = useState("hauiebsf");
  const [uwConfig] = useState({
    language: "es",
    text: {
      es: {
        queue: {
          title: "Cola de Subida",
          title_uploading_with_counter: "Subiendo {{num}} archivos",
          title_processing_with_counter: "Procesando {{num}} archivos",
          title_uploading_processing_with_counters:
            "Subiendo {{uploading}} archivos, procesando {{processing}} archivos",
          title_uploading: "Subiendo archivos",
          mini_title: "Subido",
          mini_title_uploading: "Subiendo",
          mini_title_processing: "Procesando",
          show_completed: "Mostrar completados",
          retry_failed: "Reintentar fallidos",
          abort_all: "Cancelar todo",
          upload_more: "Subir más",
          done: "Hecho",
          mini_upload_count: "{{num}} subidos",
          mini_failed: "{{num}} fallidos",
          statuses: {
            uploading: "Subiendo...",
            processing: "Procesando...",
            timeout:
              "Un archivo grande se está subiendo actualmente. Puede tardar un tiempo en aparecer en su entorno de producto.",
            error: "Error",
            uploaded: "Hecho",
            aborted: "Cancelado",
          },
        },
        url: {
          inner_title: "URL pública del archivo a subir: ",
          input_placeholder:
            "http://remote.site.example/images/remote-image.jpg",
        },
        menu: {
          files: "Mis archivos",
          web: "Url de imagen",
          camera: "Cámara",
          gsearch: "Buscar imagen",
          gdrive: "Google Drive",
          dropbox: "Dropbox",
          facebook: "Facebook",
          instagram: "Instagram",
          shutterstock: "Shutterstock",
          getty: "gettyimages",
          istock: "iStock",
          unsplash: "Unsplash",
        },
        or: "O",
        local: {
          browse: "Subir",
          dd_title_single: "Arrastre y suelte un archivo aquí",
          dd_title_multi: "Arrastre y suelte los activos aquí",
          drop_title_single: "Suelte un archivo para cargarlo",
          drop_title_multiple: "Archivos para cargar",
        },
        crop: {
          title: "Crop your image",
        },
      },
    },
    cloudName,
    uploadPreset,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const { id, name, email, yearAndSection, profilePic, classrooms,setEmail } =
  teacherStore();
  const onSaveEdit = async()=>{
    if(emailInput?.length > 0){
     const {status} = await updateTeacher("newEmail",emailInput, email)
     if(status !== 200){
      toast.info("Ha ocurrido un error al actualizar el correo")
    }else{
      toast.success("Correo actualizado correctamente")
      setEmail(emailInput)
      setEmailInput("")
      setIsEditing(false)
    }
    }
  }
  const myImage = cld.image(publicId);
  const updateData = () => {};
  return (
    <div className="border-2 border-[#fff] flex flex-col justify-center items-center w-full">
      <div className="border-b-2 border-[#fff] mx-auto w-full text-center">
        <h1 className="text-2xl">TU PERFIL</h1>
      </div>

      <div className="border-b-2 border-[#fff] mx-auto w-full text-center">
        <img
          draggable={false}
          src={
            profilePic
              ? profilePic
              : "https://www.svgrepo.com/show/532362/user.svg"
          }
          className="bg-white my-10 mx-auto rounded-full w-[150px] h-[150px] "
        />
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          setPublicId={setPublicId}
          email={email}
        />
      </div>

      <div className="py-3 flex text-xl border-b-2 border-[#fff] mx-auto w-full text-center justify-start items-center pl-[30%]">
        <span>{"Nombre: "}{name}</span>
      </div>
      <div className="py-3 flex text-xl border-b-2 border-[#fff] mx-auto w-full text-center justify-start items-center pl-[30%]">
        <span>{"Gmail: "}{!isEditing ? (
          <span>{email}</span>
        ) : (
          <input
            className="bg-[#171717] text-[#fff] border-2 border-[#fff] p-2 mx-2"
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        )}</span>
       
        {!isEditing ? (
          <button
            className="px-3 py-2 bg-[white] text-[#171717] ml-10"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        ) : (
          <div>
            <button onClick={onSaveEdit} className="px-3 py-2 bg-green-500 text-[#171717] ml-10">
              Guardar
            </button>{" "}
            <button
              className="px-3 py-2 bg-red-600 text-[#171717] ml-10"
              onClick={() => {
                setEmailInput("");
                setIsEditing(false);
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TuPerfil;
