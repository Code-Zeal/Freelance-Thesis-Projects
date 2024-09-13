import axios from "axios";
import storage from "../storage/user";

export const LoginRequest = async (email, password,typeAccount) => {
  try {
    const { data, status, } = await axios({
      method: "post",
      url: "{backend-url}/auth/login",
      data: {
        email,
        password,
        typeAccount:typeAccount === "Cliente"?"client":"entrepreneur"
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
      error:error.response.data.error,
    };
  }
};

export const RegisterRequest = async (
  name,
  email,
  password,
  cellphone,
  typeAccount,
  delivery,
    branches,
    description
) => {
  try {
    
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/auth/register",
      data: {
        name,
        email,
        password,
        cellphone,
        typeAccount:typeAccount === "Cliente"?"client":"entrepreneur",
        delivery,
        branches,
        description
      },
      headers: {
        "Content-Type": "application/json",
      },
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
