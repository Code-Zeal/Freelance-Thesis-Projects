import axios from "axios";
import FormData from "form-data";

export const getSavedPosts = async (id) => {
  try {
    const { data, status } = await axios.get(
      `{backend-url}/user/getSavedPost?id=${id}`
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
export const getFavoritesPost = async (id) => {
  try {
    const { data, status } = await axios.get(
      `{backend-url}/user/getFavoritesPost?id=${id}`
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
export const getLikedPost = async (id) => {
  try {
    const { data, status } = await axios.get(
      `{backend-url}/user/getLikedPost?id=${id}`
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
export const getUserInfo = async (id) => {
  try {
    const { data, status } = await axios.get(
      `{backend-url}/user/getInfo?id=${id}`
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

export const startFollowing = async (userId, entrepreneurshipId) => {
  try {
    const { data, status } = await axios.post(
      `{backend-url}/user/startFollow`,
      {
        userId: userId?.toString(),
        entrepreneurshipId: entrepreneurshipId?.toString(),
      }
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

export const stopFollowing = async (userId, entrepreneurshipId) => {
  try {
    const { data, status } = await axios.post(
      `{backend-url}/user/stopFollowing`,
      {
        userId,
        entrepreneurshipId,
      }
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

export const updateUserInfo = async (id, key, value) => {
  try {
    let dataSend;

    if (key === "profileImage" || key === "coverImage") {
      let ext = value.split(".");
      ext = ext[ext.length - 1];
      // Crear un objeto FormData
      dataSend = new FormData();
      // Añadir el id, la clave y el archivo de imagen al objeto FormData
      dataSend.append("id", id);
      dataSend.append("file", {
        uri: value,
        name: `image.${ext}`,
        type: `image/${ext}`,
      });
      dataSend.append(key, true);
    } else {
      dataSend = new FormData();
      dataSend.append("id", id);
      dataSend.append(key, value);
    }
    const { data, status } = await axios({
      method: "patch",
      url: "{backend-url}/user/updateInfo",
      data: dataSend,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (status === 200) {
      return {
        status,
        data,
      };
    } else {
      throw new Error({ data, status });
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: error.message,
    };
  }
};

export const ChangeTypeAccount = async (
  id,
  description,
  delivery,
  branches
) => {
  try {
    const { data, status } = await axios.post(
      `{backend-url}/user/changeTypeAccount`,
      {
        id,
        description,
        delivery,
        branches,
      }
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
