import axios from "axios";

export const GetAllPosts = async () => {
  try {
    const { data, status } = await axios({
      method: "get",
      url: "{backend-url}/post/getAll",
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

export const GetMyPosts = async (userId) => {
  try {
    const { data, status } = await axios({
      method: "get",
      url: "{backend-url}/post/getMyPosts?userId="+userId,
    });

    if (status === 200 || status === 304) {
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

export const SavePost = async (userId,postId) => {
  try {
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/post/savePost",
      data: {
        userId,postId
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
export const DeleteSavedPost = async (userId,postId) => {
  try {
    const { data, status } = await axios({
      method: "delete",
      url: "{backend-url}/post/removeSavedPost",
      data: {
        userId,postId
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

export const FavoritePost = async (userId,postId) => {
  try {
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/post/addFavoritesPost",
      data: {
        userId,postId
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
export const DeleteFavoritePost = async (userId,postId) => {
  try {
    const { data, status } = await axios({
      method: "delete",
      url: "{backend-url}/post/removeFavoritePost",
      data: {
        userId,postId
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

export const LikedPost = async (userId,postId) => {
  try {
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/post/addLikedPost",
      data: {
        userId,postId
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
export const DeleteLikedPost = async (userId,postId) => {
  try {
    const { data, status } = await axios({
      method: "delete",
      url: "{backend-url}/post/removeLikedPost",
      data: {
        userId,postId
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

export const AddCommentPost = async (userId,postId,comment) => {
  try {
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/post/addCommentPost",
      data: {
        userId,postId,comment
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
export const CreatePostApi = async (title, description, media, url, entrepreneurshipId) => {
  let formData = new FormData();
  let arr = url?.split(".")
  formData.append('file', {
    uri: url,
    name: media === "imagen"?`prueba.${arr[arr.length - 1]}`:`video.mp4`,
    type: media === "imagen"?`image/${arr[arr.length - 1]}`:`video/mp4`,
});

  formData.append('title', title);
  formData.append('description', description);
  formData.append('media', media);
  formData.append('entrepreneurshipId', entrepreneurshipId);

  try {
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/post/newPost",
      data: formData,
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
      return {
        status,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error,
    };
  }
};

