import axios from "axios";

export const TalkWithIA = async (text) => {
 try{
    const { data, status } = await axios({
      method: "post",
      url: "{backend-url}/extra/AskIA",
      data: {input:text},
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
    console.log(error);
    return {
      status: 500,
      error,
    };
  }
};
