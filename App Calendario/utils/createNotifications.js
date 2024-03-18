import * as Notifications from "expo-notifications";
const createNotification = async (titulo, cuerpo, fechaProgramada) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: cuerpo,
      },

      trigger: fechaProgramada,
    });
    // console.log("Notificación guardada exitosamente.");
  } catch (error) {
    console.log("Error al guardar la notificación:", error);
  }
};

const checkScheduledNotifications = async () => {
  try {
    const notificaciones =
      await Notifications.getAllScheduledNotificationsAsync();
    // console.log("Notificaciones guardadas:", notificaciones[1]);
  } catch (error) {
    console.log("Error al obtener las notificaciones guardadas:", error);
  }
};
const clearAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    // console.log("Todas las notificaciones programadas han sido eliminadas.");
  } catch (error) {
    console.log("Error al eliminar las notificaciones programadas:", error);
  }
};
const combineDateAndTime = (date, time) => {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  const combinedDate = new Date(year, month - 1, day, hour, minute);
  return combinedDate;
};
const getNotificationHour = (name) => {
  switch (name) {
    case "Desayuno":
      return "08:00";
    case "Almuerzo":
      return "12:00";
    case "Merienda":
      return "16:00";
    case "Cena":
      return "18:00";
    default:
      return "00:00";
  }
};
const createNotificationsFromObject = async (notificationsObject) => {
  try {
    await clearAllNotifications();
    for (const date in notificationsObject) {
      const notifications = notificationsObject[date];
      for (const notification of notifications) {
        const { name } = notification;
        const hour = getNotificationHour(name);
        const scheduledDate = combineDateAndTime(date, hour);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: name,
            body: "¡Es hora de " + name.toLowerCase() + "!",
          },
          trigger: scheduledDate,
        });
        // console.log("Notificación creada para", name, "a las", hour);
      }
    }
  } catch (error) {
    console.log("Error al crear las notificaciones:", error);
  }
};
const createWaterNotification = async () => {
  try {
    const titulo = "Recordatorio de agua";
    const cuerpo = "Recuerda tomar agua regularmente";

    // Obtener la fecha y hora actual
    const ahora = new Date();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: cuerpo,
      },
      trigger: {
        seconds: 5,
      },
    });
    // Crear notificaciones para las próximas 7 veces, cada 2 horas
    for (let i = 0; i < 7; i++) {
      const fechaProgramada = new Date(
        ahora.getTime() + 2 * 60 * 60 * 1000 * i // Agregar 2 horas por cada iteración
      );

      await Notifications.scheduleNotificationAsync({
        content: {
          title: titulo,
          body: cuerpo,
        },
        trigger: {
          date: fechaProgramada,
        },
      });
    }

    console.log("Notificaciones programadas exitosamente.");
  } catch (error) {
    console.log("Error al programar las notificaciones:", error);
  }
};
export {
  createNotification,
  checkScheduledNotifications,
  clearAllNotifications,
  createNotificationsFromObject,
  createWaterNotification,
};
