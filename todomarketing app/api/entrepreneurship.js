import axios from "axios";

export const GetAllEntrepreneurships = async () => {
  try {
    const { data, status } = await axios({
      method: "get",
      url: "{backend-url}/entrepreneurship/getAllEntrepreneurships",
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
export const GetMyEntrepreneurships = async (id) => {
  try {
    const { data, status } = await axios("{backend-url}/entrepreneurship/getMyEntrepreneurships?userOwner="+id);

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

export const GetEntrepreneurship = async (id) => {
  try {
    const { data, status } = await axios({
      method: "get",
      url: "{backend-url}/entrepreneurship/getEntrepreneurship?entrepreneurshipId="+id,
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

export const NewEntrepreneurship = async ( name, description, delivery, userOwner) => {
  try {
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/entrepreneurship/newEntrepreneurship",
      data:{name, description, delivery, userOwner}
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