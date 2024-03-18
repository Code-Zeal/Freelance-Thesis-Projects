const GetArticles = () => {
  try {
    const datos = require("./bd/articles.json");
    return datos;
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};

export default GetArticles;
