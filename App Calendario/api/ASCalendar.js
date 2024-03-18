import moment from "moment";
import { GetPlan } from "./getPlans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verPreferencias } from "./ASUserPreferences";
async function Calendar() {
  const obtenerFechas = (cantidadDias) => {
    const fechas = [];
    const formatoFecha = "dddd YYYY-MM-DD"; // Formato deseado: Lunes 15/01/2024

    for (let i = 0; i < cantidadDias; i++) {
      const fecha = moment().add(i, "days").format(formatoFecha);
      fechas.push(fecha);
    }

    return fechas;
  };
  const loadItems = async () => {
    const fechas = obtenerFechas(7); // Obtener las próximas 7 fechas

    let infos = await verPreferencias();
    const plan = infos?.currentPlan ? infos?.currentPlan : false;
    const currPlan = await GetPlan(plan);

    try {
      const storedItems = await AsyncStorage.getItem("calendario");
      const itemsFromStorage = storedItems ? JSON.parse(storedItems) : {};

      fechas.forEach((el) => {
        let fecha = el.slice(-10);
        const itemsForDay = currPlan.comidas;
        let itemsToStorage = [];
        itemsForDay.forEach((timeDay) => {
          itemsToStorage = [
            ...itemsToStorage,
            { name: timeDay.nombre, extra: timeDay, date: fecha },
          ];
        });
        itemsFromStorage[fecha] = itemsToStorage;
      });
      await AsyncStorage.removeItem("calendario");
      await AsyncStorage.setItem(
        "calendario",
        JSON.stringify(itemsFromStorage)
      );
    } catch (error) {
      console.log("Error al guardar los datos del calendario:", error);
    }
  };
  await loadItems();
}

const getCalendar = async () => {
  try {
    const userPreferencesString = await AsyncStorage.getItem("calendario");
    const userPreferences = userPreferencesString
      ? JSON.parse(userPreferencesString)
      : null;

    if (userPreferences) {
      //console.log(userPreferences);
      return userPreferences;
    } else {
      return null;
    }
  } catch (error) {
    console.error("No se pudieron recuperar los planes del calendario", error);
    throw error;
  }
};
export { Calendar, getCalendar };
