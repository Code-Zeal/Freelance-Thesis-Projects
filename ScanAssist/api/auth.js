import axios from "axios";
import storage from "../storage/user";

export const LoginRequest = async (email, password) => {
  try {
    const { data, status } = await axios.post("{backend-url}/auth/loginTeacher",{email,password});

    if (status === 200) {
      storage.save({
        key: 'user',
        data,
        expires:null
      });
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

export const RegisterRequest = async (
  name,
  email,
  password,
  cellPhone
) => {
  try {
    
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/auth/registerTeacher",
      data: {
        name,
        email,
        password,
        cellPhone
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (status === 200) {
      storage.save({
        key: 'user',
        data,
        expires:null
      });
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
