const GetTips = () => {
  try {
    const datos = require("./bd/tips.json");
    return datos;
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};

export default GetTips;
