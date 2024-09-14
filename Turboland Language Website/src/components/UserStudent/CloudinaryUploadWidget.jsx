import { createContext, useEffect, useState } from "react";
import { updateStudent } from "../../utils/api/student";
import { toast } from "sonner";
import { studentStore } from "../../stores/student";

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId,email }) {
  const [loaded, setLoaded] = useState(false);
  const {setProfilePic} = studentStore()
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
       async (error, result) => {
          if (!error && result && result.event === "success") {
            const {responseData, status} = await updateStudent("profileImage",result.info.secure_url,email)
    if(status !== 200){
      toast.warning("Ha ocurrido un problema al intentar cambiar tu foto de perfil")
      return
    }else{
      toast.success("Foto de perfil actualizada correctamente")
      setProfilePic(result.info.secure_url)
      setPublicId(result.info.public_id);
      myWidget.close();
    }
          }
        }
      );
      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
     {loaded === true? <button
        id="upload_widget"
        className="px-3 mb-5 py-2 bg-white text-[#171717] "
        onClick={initializeCloudinaryWidget}
      >
        Cambiar imagen
      </button>:<button
        className="px-3 mb-5 py-2 bg-gray-600 text-[#171717] "
        disabled
      >
        Cargando...
      </button>}
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
