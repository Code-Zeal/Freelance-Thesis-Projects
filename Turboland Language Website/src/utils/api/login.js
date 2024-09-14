import axios from "axios";

export const loginStudent = async (name, lastName, section, email) => {
  try {
    const response = await axios.post(
      "{backend-url}/auth/login",
      {
        name: name + " " + lastName,
        email,
        yearAndSection: section,
      }
    );
    if (response.status === 200) {
      return {responseData:response.data,status:response.status};
    } else {
      return {responseData:undefined,status:response.status};
      throw new Error("Error al iniciar sesión");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginTeacher = async (email, password) => {
  try {
    const response = await axios.post(
      "{backend-url}/auth/loginTeacher",
      {
        email,
        password,
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
};
