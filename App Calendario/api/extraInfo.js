const getTips = () => {
  try {
    const datos = require("./bd/tips.json");
    return datos;
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};
const getArticles = () => {
  try {
    const datos = require("./bd/articles.json");
    return datos;
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};
export { getTips, getArticles };
