import GetUserPreferences from "./getUserPreferences";

const GetNextFood = () => {
  try {
    const datos = require("./bd/plans.json");
    //pendiente arreglar
    return datos;
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};

export default GetNextFood;
