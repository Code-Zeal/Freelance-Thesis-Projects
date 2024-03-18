import AsyncStorage from "@react-native-async-storage/async-storage";

const guardarInformacion = async (checkboxData) => {
  try {
    const userPreferencesString = await AsyncStorage.getItem("feeling");
    const userPreferences = userPreferencesString
      ? JSON.parse(userPreferencesString)
      : {};

    userPreferences.checkboxData = checkboxData;

    await AsyncStorage.setItem("feeling", JSON.stringify(userPreferences));
  } catch (error) {
    console.error("No se pudo guardar la información en AsyncStorage", error);
  }
};

const obtenerConsejos = async () => {
  try {
    const userPreferencesString = await AsyncStorage.getItem("feeling");
    const userPreferences = userPreferencesString
      ? JSON.parse(userPreferencesString)
      : {};
    const estadoUsuario = userPreferences?.checkboxData?.selectedStatus || [];
    const sintomasUsuario =
      userPreferences?.checkboxData?.selectedSymptoms || [];
    const actividadesUsuario =
      userPreferences?.checkboxData?.selectedTraining || [];
    const consejosJson = require("./bd/advices.json");
    const consejosFiltrados = consejosJson.filter((consejo) => {
      if (
        estadoUsuario.length === 0 &&
        sintomasUsuario.length === 0 &&
        actividadesUsuario.length === 0
      ) {
        // Si no se han seleccionado estados, síntomas o actividades, incluir el consejo
        return true;
      }
      let coincidenciaEstado = false;
      let coincidenciaSintomas = false;
      let coincidenciaActividades = false;
      if (estadoUsuario.length !== 0) {
        coincidenciaEstado = estadoUsuario.some((estado) =>
          consejo.estado.includes(estado)
        );
      }
      if (sintomasUsuario.length !== 0) {
        coincidenciaSintomas = sintomasUsuario.some((sintoma) =>
          consejo.estado.includes(sintoma)
        );
      }
      if (actividadesUsuario.length !== 0) {
        coincidenciaActividades = actividadesUsuario.some((actividad) =>
          consejo.estado.includes(actividad)
        );
      }

      return (
        coincidenciaEstado || coincidenciaSintomas || coincidenciaActividades
      );
    });
    const consejosSinFiltrados = consejosJson.filter((consejo) => {
      if (
        estadoUsuario.length === 0 &&
        sintomasUsuario.length === 0 &&
        actividadesUsuario.length === 0
      ) {
        // Si no se han seleccionado estados, síntomas o actividades, incluir el consejo
        return true;
      }
      let coincidenciaEstado = false;
      let coincidenciaSintomas = false;
      let coincidenciaActividades = false;
      if (estadoUsuario.length !== 0) {
        coincidenciaEstado = estadoUsuario.some(
          (estado) => !consejo.estado.includes(estado)
        );
      }
      if (sintomasUsuario.length !== 0) {
        coincidenciaSintomas = sintomasUsuario.some(
          (sintoma) => !consejo.estado.includes(sintoma)
        );
      }
      if (actividadesUsuario.length !== 0) {
        coincidenciaActividades = actividadesUsuario.some(
          (actividad) => !consejo.estado.includes(actividad)
        );
      }

      return (
        coincidenciaEstado || coincidenciaSintomas || coincidenciaActividades
      );
    });
    const Consejos = [...consejosFiltrados, ...consejosSinFiltrados];

    return Consejos;
  } catch (error) {
    console.error("Error al obtener los consejos", error);
    return [];
  }
};

export { guardarInformacion, obtenerConsejos };
