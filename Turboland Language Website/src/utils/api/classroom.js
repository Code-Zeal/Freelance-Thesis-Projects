import axios from "axios";

export const getMyClassrooms = async (id)=>{
  try {
    const response = await axios.get(
      "{backend-url}/user/getMyClassrooms?id="+id
    );
    if (response.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getTeacherClassrooms = async (id)=>{
  try {
    const response = await axios.get(
      "{backend-url}/teacher/getAllClassrooms?id="+id
    );
    if (response.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const joinClassroom = async (code,id)=>{
  try {
    const response = await axios.patch(
      "{backend-url}/classroom/joinClass",{
        code,id
      }
    );
    if (response.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const createClassroom = async (nombre, logo,id,code)=>{
  try {
    const response = await axios.post(
      "{backend-url}/classroom/newClass",{
        nombre, logo,id,code
      }
    );
    if (response.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const updateClassroom = async (key, value,id,file =false,notasYAsistencias)=>{
  try {
    let response
    if(!file){
      
      response = await axios.patch(
        "{backend-url}/classroom/updateClass",{
          id,
          "notasYAsistencias":notasYAsistencias?notasYAsistencias:null,
        [key]:value
        }
        );
        }else{
          const formData = new FormData();
    formData.append('id', id);
    formData.append('notasYAsistencias', JSON.stringify(notasYAsistencias));
    formData.append(key, JSON.stringify(value));
    formData.append('file', file);
    response = await axios.patch(
      "{backend-url}/classroom/updateClass",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  }
    if (response?.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const deleteClassroom = async (key, value,id)=>{
  try {
    const response = await axios.patch(
        "{backend-url}/classroom/DeleteDataClass",{
          id,
        [key]:value,
        }
        );
    if (response?.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const destroyClassroom = async (id)=>{
  try {
    const response = await axios.delete(
        "{backend-url}/classroom/removeClass?id="+id
        );
    if (response?.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}


export const checkAssistant = async (student,classId,key,value)=>{
  // URL a la que se va a hacer la petición
const url = '{backend-url}/classroom/AssistantChecker';

// Datos que se van a enviar en el body de la petición
const data = { student, classId, [key]:value };

try {
  const response = await axios.post(url, data);
  return response.data;
} catch (error) {
  // Manejar errores
  console.error('Hubo un problema con la petición:', error);
  throw error;
}
}