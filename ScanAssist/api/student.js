import axios from "axios";

export const getAllStudent = async () => {
  try {
    const { data, status } = await axios.get(`{backend-url}/student/getAllStudent`);
    if (status === 200) {
      return {
        status, 
        data,
      };
    } else {
      throw new Error(data)
    }
  } catch (error) {
    return {
      status: 500,
      error: error.message
    };
  }
};

export const AddAssistance = async (studentId,classId)=>{
  try {
    const {data,status} = await axios.post('{backend-url}/student/addAssistance', {studentId,classId});
    if(status === 200){
      return {data,status}
    }
  } catch (error) {
    console.error('Error sending form data:', error);
    return {error,status:500}
  }
}

export const NewStudent = async (name,parentEmail,profileImage,yearAndSection) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('parentEmail', parentEmail);
  formData.append('yearAndSection', yearAndSection);
  let arr = profileImage?.split(".")
  formData.append('file', {
    uri: profileImage,
    name: `prueba.${arr[arr.length - 1]}`,
    type: `image/${arr[arr.length - 1]}`,
  });
  console.log(formData);
  
  try {
    console.log("asd");
    const {data,status} = await axios.post('{backend-url}/student/newStudent', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("asd2");
    if(status === 200){
      return {status:status,data:data}
    }else{
      throw new Error()
    }
  } catch (error) {
    console.error('Error sending form data:', error);
    return{status:500,error}
  }
};

export const UpdateInfoStudent = async ( id,name,profileImage,parentEmail,yearAndSection) => {
  try {
    
    function isValidHttpUrl(string) {
      let url;
      
      try {
        url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
  const formData = new FormData();
  formData.append("id",id)
  formData.append('name', name);
  formData.append('parentEmail', parentEmail);
  formData.append('yearAndSection', yearAndSection);
  if (isValidHttpUrl(profileImage)) {
    // If it's a URL, send it as a string
    formData.append('profileImage', profileImage);
  } else {
    // If it's a file path, append it as a file
    const arr = profileImage.split(".");
    formData.append('file', {
      uri: profileImage,
      name: `prueba.${arr[arr.length - 1]}`,
      type: `image/${arr[arr.length - 1]}`,
    });
  }
  
  try {
    console.log("formData");
    const response = await axios.post('{backend-url}/student/updateInfo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    return {status:response.status,data:response.data}
  } catch (error) {
    console.error('Error sending form data:', error);
    return {status:500,error}
  }
} catch (error) {
  console.log(error);
  return {status:500,error}
  
}
};

export const DeleteStudent = async ( id) => {
  try {
    const { data, status } = await axios.delete(`{backend-url}/student/deleteStudent?id=`+id,);
    if (status === 200) {
      return {
        status,
        data,
      };
    } else {
      throw new Error(data)
    }
  } catch (error) {
    return {
      status: 500,
      error: error.message
    };
  }
};
