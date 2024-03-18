export default handleBackButton = (navigation) => {
  // Obtener el nombre de la pantalla actual
  const currentRouteName = navigation;

  // Definir las pantallas que pueden utilizar la tecla "Back"
  const allowedScreens = ["Inicio", "Calendario"];

  // Verificar si la pantalla actual está en la lista de pantallas permitidas
  if (allowedScreens.includes(currentRouteName)) {
    // Permitir que la tecla "Back" vuelva a la pantalla anterior
    return true;
  }

  // Bloquear la tecla "Back" en otras pantallas
  return false;
};
