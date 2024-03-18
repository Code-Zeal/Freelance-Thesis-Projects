const GetPlans = () => {
  try {
    const datos = require("./bd/plans.json");
    return [
      ...datos["planesBajarPeso"],
      ...datos["PlanesDiabetes"],
      ...datos["PlanesFitness"],
      ...datos["planesAumentarPeso"],
      ...datos["PlanesMadreAmamantando"],
      ...datos["PlanesColon"],
      ...datos["planesMantenerPeso"],
    ];
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};
const GetPlan = (name) => {
  try {
    const datos = require("./bd/plans.json");
    let objetoEncontrado = null;

    for (const key in datos) {
      if (datos.hasOwnProperty(key)) {
        const arrType = datos[key];
        objetoEncontrado = arrType.find((objeto) => {
          return objeto.nombre === name;
        });

        if (objetoEncontrado) {
          break; // Se encontró el objeto, se sale del bucle
        }
      }
    }

    console.log(objetoEncontrado);
    return objetoEncontrado;
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
    return null;
  }
};

export { GetPlans, GetPlan };
