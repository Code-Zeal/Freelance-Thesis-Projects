import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearAllNotifications } from "../utils/createNotifications";
const actualizarPreferencias = async (pregunta, respuesta) => {
  try {
    const preguntasRespuestasString = await AsyncStorage.getItem(
      "preguntasRespuestas"
    );
    const preguntasRespuestas = preguntasRespuestasString
      ? JSON.parse(preguntasRespuestasString)
      : {};

    preguntasRespuestas[pregunta] = respuesta;

    await AsyncStorage.setItem(
      "preguntasRespuestas",
      JSON.stringify(preguntasRespuestas)
    );
  } catch (error) {
    console.error("No se pudo guardar la pregunta y respuesta", error);
  }
};
const actualizarPeso = async (nuevoPeso) => {
  try {
    const pesosAnterioresString = await AsyncStorage.getItem("Pesos");
    const pesosAnteriores = pesosAnterioresString
      ? JSON.parse(pesosAnterioresString)
      : {};

    const fechaActual = new Date().toISOString();
    const pesoNuevo = { fecha: fechaActual, valor: nuevoPeso };

    const nuevosPesos = { ...pesosAnteriores, [fechaActual]: pesoNuevo };

    await AsyncStorage.setItem("Pesos", JSON.stringify(nuevosPesos));
  } catch (error) {
    console.error("No se pudo guardar la pregunta y respuesta", error);
  }
};

const setCurrentPlan = async (name) => {
  try {
    const preguntasRespuestasString = await AsyncStorage.getItem(
      "preguntasRespuestas"
    );
    const preguntasRespuestas = preguntasRespuestasString
      ? JSON.parse(preguntasRespuestasString)
      : {};

    preguntasRespuestas["currentPlan"] = name;

    await AsyncStorage.setItem(
      "preguntasRespuestas",
      JSON.stringify(preguntasRespuestas)
    );
  } catch (error) {
    console.error("No se pudo guardar el plan", error);
  }
};
const verPreferencias = async () => {
  try {
    const userPreferencesString = await AsyncStorage.getItem(
      "preguntasRespuestas"
    );
    const userPreferences = userPreferencesString
      ? JSON.parse(userPreferencesString)
      : null;

    if (userPreferences) {
      // La información ha sido recuperada con éxito
      // console.log("Preferencias actuales:", userPreferences);

      // Retornar todo el objeto de preferencias si necesitas utilizarlo en otro lugar
      return userPreferences;
    } else {
      console.log("No hay preferencias almacenadas.");

      // Retornar null o un objeto vacío para manejar el caso de que no haya preferencias
      return null;
    }
  } catch (error) {
    console.error(
      "No se pudieron recuperar las preferencias del usuario",
      error
    );

    // Lanzar el error podría ser útil si quieres manejarlo en un nivel superior
    throw error;
  }
};
const limpiarStorage = async () => {
  try {
    await AsyncStorage.removeItem("Pesos");
    await AsyncStorage.removeItem("preguntasRespuestas");
    await AsyncStorage.removeItem("Calendario");
    await clearAllNotifications();
    // console.log("El almacenamiento se ha limpiado correctamente.");
  } catch (error) {
    // console.error("No se pudo limpiar el almacenamiento.", error);
  }
};
const obtenerPesosOrdenados = async () => {
  try {
    const pesosAnterioresString = await AsyncStorage.getItem("Pesos");
    const pesosAnteriores = pesosAnterioresString
      ? JSON.parse(pesosAnterioresString)
      : {};

    return pesosAnteriores;
  } catch (error) {
    console.error("Error al obtener los pesos anteriores", error);
    return null;
  }
};
export {
  actualizarPreferencias,
  actualizarPeso,
  setCurrentPlan,
  verPreferencias,
  limpiarStorage,
  obtenerPesosOrdenados,
};
