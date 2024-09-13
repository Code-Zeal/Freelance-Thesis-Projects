import axios from "axios";

export const GetAllClassrooms = async (id) => {
  try {
    const { data, status } = await axios({
      method: "get",
      url: "{backend-url}/classroom/getAllClassrooms?id="+id,
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
export const NewClass = async (name, yearAndSection,id,schedule) => {
  try {
    
    schedule
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/classroom/newClass",
      data: {
        name,
        yearAndSection,
        id,
        schedule,
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

export const UpdateClass = async (id,name, yearAndSection,schedule,students,attendance) => {
  try {
    const { data, status } = await axios.patch("{backend-url}/classroom/updateClass",{id,name,yearAndSection,schedule,students,attendance});

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

export const DeleteClass = async (id) => {
  try {
    const { data, status } = await axios({
      method: "delete",
      url: "{backend-url}/classroom/removeClass",data:{
        id
      }
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