const getFeeling = (type) => {
  try {
    const datos = require("./bd/status.json");
    return datos[type];
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};

export default getFeeling;
