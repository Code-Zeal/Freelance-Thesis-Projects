export default function start(bot,msg,opciones_inicio) {
  try {
    const now = new Date();
    const options = {
      timeZone: "America/Caracas",
      hour: "numeric",
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat("es-VE", options);
    const hour = formatter.format(now);

    let saludo;
    if (hour >= 6 && hour < 12) {
      saludo = "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      saludo = "Buenas tardes";
    } else {
      saludo = "Buenas noches";
    }
    //le decimos al bot que escuche el comando de /start (inicio)
    const chatId = msg.chat.id;
    //declaramos el id del chat para saber a quien enviarle el mensaje, en este caso
    //respondemos a la persona que nos escribe, por eso guardamos el id del chat

    bot.sendMessage(
      chatId,
      `${saludo} ¿En qué puedo ayudarle?`,
      opciones_inicio
    );
    //aqui estamos respondiendo a /start (botón de inicio), el saludo dependerá del horario y le pasamos
    //las opciones
  } catch (error) {
    console.log(error);
  }
}