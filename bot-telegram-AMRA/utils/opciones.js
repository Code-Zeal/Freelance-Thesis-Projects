// declarando opciones

export const opciones_inicio = {
  //opciones vienen siendo las interacciones luego de "En que puedo ayudarte?"
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Horario", callback_data: "/section,horario" }],
      //por ejemplo esta interacción se llama Horario y ejecuta el comando /section,horario el cual te responderá algo
      [{ text: "Constancias", callback_data: "/section,constancias" }],
      [{ text: "Misa", callback_data: "/section,misa" }],
      [{ text: "Fiesta", callback_data: "/section,fiesta" }],
      [{ text: "Boletín", callback_data: "/section,boletin" }],
      [{ text: "Guardias", callback_data: "/month,guardias" }],
      [{ text: "Convivencias", callback_data: "/section,convivencias" }],
      [{ text: "Visitas al santísimo", callback_data: "/week,santisimo" }],
      [{ text: "Eucaristías", callback_data: "/eucaristias" }],
      [{ text: "Oración de la mañana", callback_data: "/oracion" }],
    ],
  }),
};

export const opciones_horario = {
  A: {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información del lunes",
            callback_data: "/actividad1,A",
          },
        ],
        [
          {
            text: "Más información del martes",
            callback_data: "/actividad2,A",
          },
        ],
        [
          {
            text: "Más información del miércoles",
            callback_data: "disabled",
            callback_game: {},
          },
        ],
        [
          {
            text: "Más información del jueves",
            callback_data: "/actividad4,A",
          },
        ],
        [
          {
            text: "Más información del viernes",
            callback_data: "/actividad5,A",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información del lunes",
            callback_data: "/actividad1,B",
          },
        ],
        [
          {
            text: "Más información del martes",
            callback_data: "/actividad2,B",
          },
        ],
        [
          {
            text: "Más información del miércoles",
            callback_data: "disabled",
            callback_game: {},
          },
        ],
        [
          {
            text: "Más información del jueves",
            callback_data: "/actividad4,B",
          },
        ],
        [
          {
            text: "Más información del viernes",
            callback_data: "/actividad5,B",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
export const opciones_constancias = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre primaria",
            callback_data: "/constancia1,A",
          },
        ],
        [
          {
            text: "Más información sobre secundaria",
            callback_data: "/constancia2,A",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre primaria",
            callback_data: "/constancia1,B",
          },
        ],
        [
          {
            text: "Más información sobre secundaria",
            callback_data: "/constancia2,B",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
export const opciones_misa = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre misa del Lunes",
            callback_data: "/misa1,A",
          },
        ],
        [
          {
            text: "Más información sobre misa del Jueves",
            callback_data: "/misa2,A",
          },
        ],
        [
          {
            text: "Más información sobre misa del Domingo",
            callback_data: "/misa3,A",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre misa del Lunes",
            callback_data: "/misa1,B",
          },
        ],
        [
          {
            text: "Más información sobre misa del Jueves",
            callback_data: "/misa2,B",
          },
        ],
        [
          {
            text: "Más información sobre misa del Domingo",
            callback_data: "/misa3,B",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
export const opciones_fiesta = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre el carnaval",
            callback_data: "/fiesta1,A",
          },
        ],
        [
          {
            text: "Más información sobre semana santa",
            callback_data: "/fiesta2,A",
          },
        ],
        [
          {
            text: "Más información sobre Pre defensa del grupo 6",
            callback_data: "/fiesta3,A",
          },
        ],
        [
          {
            text: "Más información sobre defensa de tesis",
            callback_data: "/fiesta4,A",
          },
        ],
        [
          {
            text: "Más información sobre la graduación",
            callback_data: "/fiesta5,A",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre el carnaval",
            callback_data: "/fiesta1,B",
          },
        ],
        [
          {
            text: "Más información sobre semana santa",
            callback_data: "/fiesta2,B",
          },
        ],
        [
          {
            text: "Más información sobre Pre defensa del grupo 6",
            callback_data: "/fiesta3,B",
          },
        ],

        [
          {
            text: "Más información sobre defensa de tesis",
            callback_data: "/fiesta4,B",
          },
        ],

        [
          {
            text: "Más información sobre la graduación",
            callback_data: "/fiesta5,B",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
export const opciones_boletin = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre el boletín",
            callback_data: "/boletin1,A",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre el boletín",
            callback_data: "/boletin1,B",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};

export const opciones_guardias = {
  //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre las guardias",
            callback_data: "/guardias1",
          },
        ],
        [{ text: "Volver a elegir mes", callback_data: "/month,guardias" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
};

export const opciones_convivencias = {
  //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Volver a elegir sección",
            callback_data: "/section,convivencias",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
};
export const opciones_santisimo = {
  //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información",
            callback_data: "/santisimo1",
          },
        ],
        [{ text: "Volver a elegir semana", callback_data: "/week,santisimo" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
};
export const opciones_eucaristias = {
  //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información",
            callback_data: "/eucaristias1",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
};
export const opciones_oracion = {
  //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información",
            callback_data: "/oracion1",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
};