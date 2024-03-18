import { respuestas_secundarias, respuestas_volver } from "./controladores/callback_query.js";
import start from "./controladores/start.js";
import {opciones_boletin,opciones_constancias,opciones_convivencias,opciones_eucaristias,opciones_fiesta,opciones_guardias,opciones_horario,opciones_inicio,opciones_misa, opciones_oracion, opciones_santisimo} from "./utils/opciones.js"
import dotenv from "dotenv";
import express from "express";
import { convivenciasData, guardiasData, santisimoData } from "./utils/data.js";
import telegramBot from "node-telegram-bot-api";
dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(TELEGRAM_TOKEN, { polling: true });

const port = process.env.PORT || 8080;
const app = express();
app.get("/health", (req, res) => {
  res.sendStatus(200);
});

const sectionSelector = (name) => {
  return {
    //opciones vienen siendo las interacciones luego de "En que puedo ayudarte?"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Sección 'A'", callback_data: `/${name},A` }],
        //por ejemplo esta interacción se llama Horario y ejecuta el comando /horario el cual te responderá algo
        [{ text: "Sección 'B'", callback_data: `/${name},B` }],
      ],
    }),
  };
};

const monthSelector = (name) => {
  return {
    //opciones vienen siendo las interacciones luego de "En que puedo ayudarte?"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Enero", callback_data: `/${name},enero` }],
        //por ejemplo esta interacción se llama Horario y ejecuta el comando /horario el cual te responderá algo
        [{ text: "Febrero", callback_data: `/${name},febrero` }],
        [{ text: "Marzo", callback_data: `/${name},marzo` }],
      ],
    }),
  };
};
const weekSelector = (name) => {
  return {
    //opciones vienen siendo las interacciones luego de "En que puedo ayudarte?"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Primera semana", callback_data: `/${name},semana1` }],
        //por ejemplo esta interacción se llama Horario y ejecuta el comando /horario el cual te responderá algo
        [{ text: "Segunda semana", callback_data: `/${name},semana2` }],
        [{ text: "Tercera semana", callback_data: `/${name},semana3` }],
        [{ text: "Cuarta semana", callback_data: `/${name},semana4` }],
      ],
    }),
  };
};



bot.onText(/\/start$/, (msg) => {
  start(bot,msg,opciones_inicio)
});
//
//
//
//
//Escuchando comandos principales = /horario, /misa, etc...
//
//
//
//
bot.on("callback_query", (callbackQuery) => {
  //escuchando todas las acciones que vienen de presionar botones

  const messageId = callbackQuery.message.message_id;
  //el id del mensaje lo podemos usar para editar/borrar mensajes
  const chatId = callbackQuery.message.chat.id;
  const comando = callbackQuery.data;
  //este es el comando enviado, por ejemplo /horario o /misa
  let section = comando.split(",")
  section = section.length > 1 ? section[1]:section[0]
  console.log(section);
  console.log(comando.startsWith("/guardias"));
  if (comando.startsWith("/section")) {
    bot.editMessageText(`Seleccione una sección`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: sectionSelector(section).reply_markup,
    });
  }else if (comando.startsWith("/month")) {
    bot.editMessageText(`Seleccione un mes`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: monthSelector(section).reply_markup,
    });
  }else if (comando.startsWith("/week")) {
    bot.editMessageText(`Seleccione semana del mes`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: weekSelector(section).reply_markup,
    });
  } else if (comando.startsWith("/horario")) {
    bot.editMessageText(
      `🏫 Información sobre horarios de la sección '${section}': \n\n🟢Lunes, de 7:00AM hasta 12:00PM\n\n🟢Martes, de 7:00AM hasta 5:00PM\n\n🔴Miércoles, no hay clases\n\n🟢Jueves, de 7:00AM hasta 9:00AM\n\n🟢Viernes, de 10:00AM hasta 12:00PM
      `,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_horario[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/constancias")) {
    bot.editMessageText(
      `Información sobre constancias de la sección ${section}...\n\n*Primaria - Lunes y Martes (3$)\n\n*Secundaria - Jueves y viernes (5$)`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa")) {
    bot.editMessageText(
      `Información sobre misas de la sección ${section}...\n\n*Lunes\n\n*Jueves\n\n*Domingo
      `,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta")) {
    bot.editMessageText(
      `Información sobre las fiestas de la sección ${section}...\n\n*Carnavales - 12/02/2024 al 13/02/2024\n\n*Semana santa - 24/03/2024 al 30/03/2024 \n\n*Pre defensas de tesis\n\n*Defensa de tesis - 27/02/2024 al 29/02/2024\n\n*Graduación`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/boletin")) {
    bot.editMessageText(
      `Información sobre boletin de la sección ${section}...\n\n*Viernes (10$)`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_boletin[section].reply_markup,
      }
    );
  }else if (comando.startsWith("/guardias")) {
    bot.editMessageText(
      guardiasData[section],
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_guardias.reply_markup,
      }
    );
  }else if (comando.startsWith("/convivencias")) {
    bot.editMessageText(
      `Información sobre convivencias de la sección ${section}...\n\n\n${convivenciasData[section]}`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_convivencias.reply_markup,
      }
    );
  }else if (comando.startsWith("/santisimo")) {
    bot.editMessageText(
      `Información sobre Horas de visita al Santísimo\n\n\n${santisimoData[section]}`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_santisimo.reply_markup,
      }
    );
  }else if (comando.startsWith("/eucaristias")) {
    bot.editMessageText(
      `Información sobre Cronograma de Eucaristías\nEnero - Abril 2024\n\n10-ENE Segundo Año\n\n24-ENE Quinto Grado\n\n31-ENE Equipo de Pastoral\n\n07-FEB Primer Año\n\n14-FEB Equipo de Pastoral\n\n21-FEB Sexto Grado\n\n28-FEB Sexto Año\n\n06-MAR Tercer Grado\n\n13-MAR Quinto Año\n\n20-MAR Cuarto Grado\n\n03-ABR Cuarto Año\n\n10-ABR Quinto Grado\n\n17-ABR Tercer Año\n\n24-ABR Sexto Grado`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_eucaristias.reply_markup,
      }
    );
  }else if (comando.startsWith("/oracion")) {
    bot.editMessageText(
      `Información sobre Cronograma de Oración de la mañana\nEnero - Abril 2024\n\n08-ENE Equipo de Pastoral\n\n16-ENE Segundo Año A\n\n22-ENE Segundo Grado A\n\n29-ENE Primer Año A\n\n05-FEB Primer Grado A\n\n19-FEB Sexto Año B\n\n26-FEB Sexto Grado B\n\n04-MAR Quinto Año B\n\n11-MAR Quinto Grado B\n\n18-MAR Cuarto Año B\n\n01-ABR Cuarto Grado B\n\n08-ABR Tercer Año B\n\n15-ABR Tercer Grado B\n\n22-ABR Segundo Año B\n\n29-ABR Segundo Grado B`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_oracion.reply_markup,
      }
    );
  } else if (comando === "/volver") {
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
    bot.editMessageText(`${saludo} ¿En qué puedo ayudarle?`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_inicio.reply_markup,
    });
  }
});
//
//
//
//
//Escuchando comandos secundarios = /actividad1, /misa1, etc...
//
//
//
//
bot.on("callback_query", (callbackQuery) => {
  respuestas_secundarias(bot,callbackQuery)
});
//
//
//
//
//Escuchando comandos de volver desde un comando secundario a un comando principal
//
//
//
//
bot.on("callback_query", (callbackQuery) => {
  respuestas_volver(bot,callbackQuery)
});

bot.onText(/^(\/sec_[^/]+|\/month_[^/]+|\/week_[^/]+|\/\w+|[^/]+)$/, (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (/^\/sec_/.test(text)) {
    const section = text.split("_")[1];
    try {
      bot.sendMessage(chatId, "Seleccione una sección", sectionSelector(section));
    } catch (error) {console.log(error);}
  } else if (/^\/month_/.test(text)) {
    const month = text.split("_")[1];
    try {
      bot.sendMessage(chatId, "Seleccione un mes", monthSelector(month));
    } catch (error) {console.log(error);}
  } else if (/^\/week_/.test(text)) {
    const week = text.split("_")[1];
    try {
      bot.sendMessage(chatId, "Seleccione semana del mes", weekSelector(week));
    } catch (error) {console.log(error);}
  } else {
    if(text === "/oracion"){
      try {
        bot.sendMessage(chatId, `Información sobre Cronograma de Oración de la mañana\nEnero - Abril 2024\n\n08-ENE Equipo de Pastoral\n\n16-ENE Segundo Año A\n\n22-ENE Segundo Grado A\n\n29-ENE Primer Año A\n\n05-FEB Primer Grado A\n\n19-FEB Sexto Año B\n\n26-FEB Sexto Grado B\n\n04-MAR Quinto Año B\n\n11-MAR Quinto Grado B\n\n18-MAR Cuarto Año B\n\n01-ABR Cuarto Grado B\n\n08-ABR Tercer Año B\n\n15-ABR Tercer Grado B\n\n22-ABR Segundo Año B\n\n29-ABR Segundo Grado B`, opciones_oracion);
      } catch (error) {console.log(error);}
    }else if(text === "/eucaristias"){
      try {
        bot.sendMessage(chatId, `Información sobre Cronograma de Eucaristías\nEnero - Abril 2024\n\n10-ENE Segundo Año\n\n24-ENE Quinto Grado\n\n31-ENE Equipo de Pastoral\n\n07-FEB Primer Año\n\n14-FEB Equipo de Pastoral\n\n21-FEB Sexto Grado\n\n28-FEB Sexto Año\n\n06-MAR Tercer Grado\n\n13-MAR Quinto Año\n\n20-MAR Cuarto Grado\n\n03-ABR Cuarto Año\n\n10-ABR Quinto Grado\n\n17-ABR Tercer Año\n\n24-ABR Sexto Grado`, opciones_eucaristias);
      } catch (error) {console.log(error);}
    }
    
  }
});
app.listen(port, () => {
  console.log(`Bot corriendo correctamente, puerto ${port}`);
});
