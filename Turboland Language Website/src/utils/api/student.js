import axios from "axios";
export const updateStudent = async (key, value, email) => {
  try {
    let data ={[key]:value,email}
     
    const response = await axios.patch(
      "{backend-url}/user/updateInfo",
      data
    );

    if (response.status === 200) {
      return { responseData: response.data, status: response.status };
    } else {
      throw new Error("Error al actualizar");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
