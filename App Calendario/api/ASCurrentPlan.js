import AsyncStorage from "@react-native-async-storage/async-storage";

const actualizarPlan = async (plan) => {
  try {
    const userPreferencesString = await AsyncStorage.getItem("userPreferences");
    const userPreferences = userPreferencesString
      ? JSON.parse(userPreferencesString)
      : {};

    userPreferences.currentPlan = plan;

    await AsyncStorage.setItem(
      "userPreferences",
      JSON.stringify(userPreferences)
    );
  } catch (error) {
    console.error(
      "No se pudo actualizar el plan actual en las preferencias del usuario",
      error
    );
  }
};
const obtenerCurrentPlan = async () => {
  try {
    const userPreferencesString = await AsyncStorage.getItem("userPreferences");
    const userPreferences = userPreferencesString
      ? JSON.parse(userPreferencesString)
      : {};

    const currentPlan = userPreferences.currentPlan;

    if (currentPlan) {
      // console.log("Plan actual:", currentPlan);
      return currentPlan;
    } else {
      //  console.log("No hay plan actual almacenado.");
      return null;
    }
  } catch (error) {
    console.error(
      "No se pudo recuperar el plan actual de las preferencias del usuario",
      error
    );
    throw error;
  }
};
export { actualizarPlan, obtenerCurrentPlan };
