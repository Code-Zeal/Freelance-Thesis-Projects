import axios from "axios";

export const getTeacherInfo = async (id) => {
  try {
    const { data, status } = await axios.get(
      `{backend-url}/teacher/getInfo?id=` + id
    );
    if (status === 200) {
      return {
        status,
        data,
      };
    } else {
      throw new Error(data);
    }
  } catch (error) {
    return {
      status: 500,
      error: error.message,
    };
  }
};

export const UpdateInfoTeacher = async (
  id,
  name,
  email,
  cellPhone
) => {
  try {
    const { data, status } = await axios.patch(
      `{backend-url}/teacher/updateInfo`,
      { id,name, email, cellPhone }
    );
    if (status === 200) {
      return {
        status,
        data,
      };
    } else {
      throw new Error(data);
    }
  } catch (error) {
    return {
      status: 500,
      error: error.message,
    };
  }
};
