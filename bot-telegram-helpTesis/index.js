import express from "express";
import telegramBot from "node-telegram-bot-api";
import { opciones_inicio } from "./utils/keyboards/start.js";
import { saludo } from "./utils/tools/saludo.js";
import { IAQuestion } from "./utils/IA.js";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
dotenv.config();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

export const bot = new telegramBot(TELEGRAM_TOKEN, { polling: true });

const port = process.env.PORT || 8080;
const app = express();

const questionsStore = {}; 

bot.onText(/\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`${saludo()}, ¡Mucho gusto! Mi nombre es MentorIA. Estoy aquí para ayudarte con tu tesis.

A continuación te voy a proporcionar información sobre las tesis.

Una tesis normalmente está compuesta por los siguientes capítulos:

1. **Introducción**: 
- Planteamiento del problema
- Objetivos de la investigación
- Justificación
- Alcances y limitaciones

2. **Marco Teórico**: 
- Fundamentación teórica
- Antecedentes de la investigación
- Conceptos clave

3. **Metodología**: 
- Diseño de la investigación
- Población y muestra
- Técnicas e instrumentos de recolección de datos

4. **Resultados**: 
- Presentación de los datos
- Análisis de los resultados

5. **Discusión**: 
- Interpretación de los resultados
- Comparación con estudios previos
- Implicaciones teóricas y prácticas

6. **Conclusiones**: 
- Resumen de los hallazgos
- Recomendaciones
- Líneas futuras de investigación

¿En qué puedo asistirte? ¿Tienes alguna pregunta o inquietud específica?`
  );
});

bot.onText(/^(?!\/start$)/, async(msg) => {
  const chatId = msg.chat.id;
  const questionId = uuidv4();
  const question = msg.text;  // Guarda la pregunta con un ID único

  bot.sendMessage(chatId, "Generando respuesta, Espere por favor");
  const response = await IAQuestion(question);
  bot.sendMessage(chatId, response);
});


const commandStore = {
  "/definicion_tema": "¿Cómo puedo definir el tema de mi tesis?",
  "/formulacion_problema": "¿Cuál es la mejor manera de formular el problema de investigación?",
  "/marco_teorico": "¿Qué debe incluir el marco teórico de una tesis?",
  "/revision_literatura": "¿Cómo realizo una revisión de literatura efectiva?",
  "/metodologia": "¿Qué metodología debo usar para mi investigación?",
  "/objetivos": "¿Cómo formulo los objetivos de mi tesis?",
  "/hipotesis": "¿Cómo se plantea una hipótesis en una tesis?",
  "/recoleccion_datos": "¿Cuáles son las técnicas de recolección de datos más comunes?",
  "/analisis_datos": "¿Qué métodos puedo usar para analizar los datos recolectados?",
  "/resultados": "¿Cómo presento los resultados de mi investigación?",
  "/discusion": "¿Qué debe incluir la discusión de los resultados?",
  "/conclusiones": "¿Cómo redacto las conclusiones de mi tesis?",
  "/referencias": "¿Qué formato debo usar para las referencias bibliográficas?",
  "/anexos": "¿Qué tipo de información se incluye en los anexos?",
  "/presentacion": "¿Cómo preparo una buena presentación de mi tesis?"
};

bot.on("callback_query", async (query) => {
  const callbackData = query.data;
  const chatId = query.message.chat.id;
  const callbackKey = callbackData.split(",")[0];
  const id = callbackData.split(",")[1];

  // Verifica si el callbackKey está en el questionsStore
  if (commandStore[callbackKey]) {
    bot.sendMessage(chatId, "Generando respuesta, Espere por favor");

    // Genera la respuesta utilizando la IA
    const response = await IAQuestion(commandStore[callbackKey]);
    
    bot.sendMessage(chatId, response);
  } else {
    bot.answerCallbackQuery(query.id, { text: "Capítulo no reconocido." });
  }
});


const questions = {
  "/definicion_tema": "¿Cómo puedo definir el tema de mi tesis?",
  "/formulacion_problema": "¿Cuál es la mejor manera de formular el problema de investigación?",
  "/marco_teorico": "¿Qué debe incluir el marco teórico de una tesis?",
  "/revision_literatura": "¿Cómo realizo una revisión de literatura efectiva?",
  "/metodologia": "¿Qué metodología debo usar para mi investigación?",
  "/objetivos": "¿Cómo formulo los objetivos de mi tesis?",
  "/hipotesis": "¿Cómo se plantea una hipótesis en una tesis?",
  "/recoleccion_datos": "¿Cuáles son las técnicas de recolección de datos más comunes?",
  "/analisis_datos": "¿Qué métodos puedo usar para analizar los datos recolectados?",
  "/resultados": "¿Cómo presento los resultados de mi investigación?",
  "/discusion": "¿Qué debe incluir la discusión de los resultados?",
  "/conclusiones": "¿Cómo redacto las conclusiones de mi tesis?",
  "/referencias": "¿Qué formato debo usar para las referencias bibliográficas?",
  "/anexos": "¿Qué tipo de información se incluye en los anexos?",
  "/presentacion": "¿Cómo preparo una buena presentación de mi tesis?"
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const response = "¡Hola! Soy tu asistente para la elaboración de tesis. Aquí tienes una lista de comandos que puedes usar:\n\n" +
    Object.keys(questions).map(cmd => `${cmd} - ${questions[cmd]}`).join("\n");
  bot.sendMessage(chatId, response);
});

Object.keys(questions).forEach((cmd) => {
  bot.onText(new RegExp(`\\${cmd}`), (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, questions[cmd]);
  });
});
app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Bot corriendo correctamente, puerto ${port}`);
});
