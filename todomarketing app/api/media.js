import axios from "axios";
import * as FileSystem from 'expo-file-system';
export const GetMyGallery = async (userId) => {
  try {
    const { data, status } = await axios({
      method: "get",
      url: "{backend-url}/media/getMyGallery?userId=" + userId,
    });

    if (status === 200) {
      return {
        status,
        data,
      };
    } else {
      return {
        status,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const DeleteFile = async (id,navigation) => {
  try {
    await axios.delete("{backend-url}/media/DeleteFile?id="+id,)
    .then((response) => navigation.navigate("Gallery"))
    .catch((error) => {
      console.error(error);
    }); 
  } catch (error) {
    console.error(error);
  }
};
export const UpdateFile = async (file,mediaId)=>{
  try {
    let formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: `photo.png`,
      type: `image/Png`,
    });
    formData.append('mediaId', mediaId);
  
    // Enviar el archivo al servidor
    await fetch('{backend-url}/media/updateFile', { 
      method: 'PATCH',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
    })
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    }); 
  } catch (error) {
    console.error(error);
  }
}

export const RemoveBG = async (file) => {
  try {
    // Divide el nombre del archivo para obtener la extensión y el nombre
    let arrDot = file.split(".");
    let arrSlash = file.split("/");
    let extension = arrDot[arrDot.length - 1];
    let name = arrSlash[arrSlash.length - 1];

    // Crear FormData y añadir el archivo
    let formData = new FormData();
    formData.append('file', {
      uri: file,
      name: name,
      type: `image/${extension}`, // Asegúrate de que la extensión es correcta (por ejemplo, 'jpeg' en lugar de 'jpg')
    });

    // Enviar el archivo al servidor
    const response = await fetch('{backend-url}/media/removeBg', {
      method: 'POST',
      body: formData,
      // No establezcas el 'Content-Type'. `fetch` lo hará automáticamente.
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error('Error subiendo el archivo', error);
  }
};

export const GenerateImage = async () => {
  try {
    
    const response = await axios.post("{backend-url}/extra/createImage")
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const image = response.data;
      return image
    }
  } catch (error) {
    console.error(error);
  }
}


export const ChangeBackground = async (image, backgroundImage) => {
  try {
    const response = await fetch("{backend-url}/extra/addBackground", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        frontImage: image,
        backgroundImage: backgroundImage
      })
    });

    if (response.ok) {
      return response;
    } else {
      console.error('Error en la solicitud:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};