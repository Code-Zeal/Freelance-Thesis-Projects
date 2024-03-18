export function respuestas_volver(bot,callbackQuery) {
  //escuchando todas las acciones que vienen de presionar botones
  const opciones_actividad = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_constancias = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancia,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancia,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_misa = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a misas", callback_data: "/misa,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a misas", callback_data: "/misa,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_fiesta = {
    A: {
      //Botones que vienen en la opción de horario"
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a fiestas", callback_data: "/fiesta,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a fiestas", callback_data: "/fiesta,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_boletin = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a boletin", callback_data: "/boletin,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a boletin", callback_data: "/boletin,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_guardias ={
    //Botones que vienen en la opción de horario"   
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a elegir mes", callback_data: "/month,guardias" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };
  const opciones_santisimo ={
    //Botones que vienen en la opción de horario"   
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a elegir semana", callback_data: "/week,santisimo" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };
  const opciones_eucaristias ={
    //Botones que vienen en la opción de horario"   
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a la información", callback_data: "/eucaristias" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };
  const opciones_oracion ={
    //Botones que vienen en la opción de horario"   
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a la información", callback_data: "/oracion" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };
  const messageId = callbackQuery.message.message_id;
  //el id del mensaje lo podemos usar para editar/borrar mensajes
  const chatId = callbackQuery.message.chat.id;
  const comando = callbackQuery.data;
  //este es el comando enviado, por ejemplo /horario o /misa
  if (comando === "/actividad1") {
    bot.editMessageText(`Más información sobre actividad 1...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad.reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando === "/actividad2") {
    bot.editMessageText(`Más información sobre actividad 2...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad.reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando === "/actividad3") {
    bot.editMessageText(`Más información sobre actividad 3...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad.reply_markup,
    });
  } else if (comando.startsWith("/constancia1")) {
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes de primaria! Les informamos que podrán retirar las constancias de estudio los días lunes y martes. Para obtener la constancia, se requerirá un pago de 3 dólares por cada copia. Este monto ayudará a cubrir los gastos administrativos asociados. Asegúrense de traer el dinero exacto al momento de recoger la constancia. Agradecemos su colaboración y les recordamos que la constancia es un documento importante para futuros trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/constancia2")) {
    bot.editMessageText(
      `¡Anuncio importante para los estudiantes de secundaria y sus familias! Les informamos que podrán retirar las constancias de estudio los días jueves y viernes. Para obtener la constancia, se requerirá un pago de 5 dólares por cada copia. Este monto contribuirá a cubrir los costos administrativos y de impresión. Por favor, asegúrense de traer la cantidad exacta al momento de recoger la constancia. Agradecemos su comprensión y apoyo en esta gestión. La constancia de estudio será un documento valioso para futuras solicitudes y trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa1")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa del día lunes! Los invitamos a unirse a nosotros en un momento de fe y reflexión. Durante esta celebración, nos reuniremos para orar juntos, escuchar la palabra de Dios y fortalecer nuestra espiritualidad. Esperamos que esta misa sea un espacio de paz y renovación para todos. ¡Los esperamos con alegría!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa2")) {
    bot.editMessageText(
      `Les recordamos que el día jueves tendremos una misa especial. Los invitamos a unirse a nosotros en este encuentro de fe y comunidad. Durante la misa, compartiremos momentos de oración, reflexión y alabanza. Es una oportunidad para reafirmar nuestra conexión con lo divino y encontrar consuelo en la palabra de Dios. ¡Esperamos contar con su presencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa3")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa dominical! Los invitamos a unirse a nosotros en este sagrado día de adoración y comunión. Durante la misa, nos reuniremos como comunidad para celebrar la presencia de Dios en nuestras vidas. Escucharemos lecturas bíblicas, entonaremos himnos de alabanza y compartiremos juntos la Eucaristía. Esperamos que esta misa sea un momento de inspiración espiritual y renovación para todos. ¡Les esperamos con los brazos abiertos!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta1")) {
    bot.editMessageText(
      `¡Ven y únete al increíble Carnaval del Liceo del 12 de febrero al 13 de de abril de 2024! Sumérgete en un mundo de magia, color y diversión sin límites. Disfruta de deslumbrantes desfiles de carnaval, emocionantes juegos, competencias de disfraces, música en vivo y una amplia variedad de comida y bebida. Además, celebra la diversidad cultural y promueve el compañerismo a través de talleres y actividades educativas. ¡No te pierdas esta fiesta inolvidable!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta2")) {
    bot.editMessageText(
      `¡Ven y celebra la Semana Santa en grande del 24 al 30 de marzo de 2024! Sumérgete en una experiencia llena de tradición, espiritualidad y diversión. Disfruta de procesiones religiosas, actividades culturales, concursos, música en vivo y una variedad de deliciosos platos típicos. Además, aprovecha para reflexionar y conectar con tu espiritualidad en este tiempo especial. ¡No te pierdas esta emocionante celebración de la Semana Santa!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta3")) {
    bot.editMessageText(
      `¡Atención a todos! Les informamos que se acerca la predefensa del Grupo 6. Prepárense para mostrar todo su esfuerzo y conocimiento en esta importante etapa. Durante la predefensa, tendrán la oportunidad de presentar sus proyectos, responder preguntas y recibir retroalimentación valiosa. Asegúrense de estar preparados y demostrar su mejor trabajo. ¡Buena suerte a todos en esta próxima etapa crucial!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta4")) {
    bot.editMessageText(
      `¡Anuncio importante para todos los interesados! Les informamos que se acerca la emocionante defensa de tesis, que se llevará a cabo del 27 al 29 de febrero de 2024. Es el momento culminante en el que nuestros estudiantes presentarán sus proyectos de investigación y compartirán los resultados de sus arduos esfuerzos. Acompáñennos para presenciar presentaciones innovadoras, debates académicos y la brillantez de nuestras mentes creativas. ¡No se pierdan esta oportunidad de celebrar el conocimiento y el logro académico!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta5")) {
    bot.editMessageText(
      `¡Es un honor compartir con todos ustedes la emocionante noticia de nuestra próxima graduación! Después de años de arduo trabajo, dedicación y perseverancia, nuestros estudiantes están listos para dar un gran paso hacia el futuro. La graduación será un momento especial en el cual celebraremos sus logros, reconociendo su esfuerzo y determinación. Será una ceremonia llena de alegría, orgullo y promesas de nuevos comienzos. Acompáñenos para aplaudir a nuestros graduados y desearles éxito en sus futuras aventuras. ¡No se pierdan este memorable evento de celebración y trascendencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/boletin1")) {
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes! Les informamos que podrán retirar los boletines de calificaciones el día viernes. Para obtener el boletín, se requerirá un pago de 10 dólares por cada copia. Este monto ayudará a cubrir los costos de impresión y administración. Asegúrense de traer el dinero exacto al momento de recoger su boletín. Agradecemos su comprensión y apoyo en esta importante gestión.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_boletin[section].reply_markup,
      }
    );
  }else if (comando.startsWith("/guardias1")) {
    bot.editMessageText(
      `LAS GUARDIAS DEBE REALIZARSE EN LA FECHA INDICADA, EN EL CASO DE NO REALIZARLA POR ALGUNA EVENTUALIDAD SE REALIZA EN LA FECHA SIGUIENTE.\n\nEL PROFESOR, PROFESORA O MAESTRA QUE LE CORRESPONDA LA GUARDIA DEBE LLEGAR 6:45 AM PARA PREPARAR EL ESCENARIO Y COLOCAR LAS BANDERAS A MEDIA ASTA PEDIR EL FAVOR AL SR. GUIDO PARA COLOCARLAS, PARA CUANDO SE INICIE LA ACTIVIDAD NO SE PIERDA TIEMPO.\n\nSI EL PROFESOR, PROFESORA O MAESTRA NO ASISTE PARA LA FECHA INDICADA DE LA GUARDIA DEBE DEJAR ASIGNADA LA ACTIVIDAD A LOS ESTUDIANTES PARTICIPANTES.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_guardias.reply_markup,
      }
    );
  }else if (comando.startsWith("/santisimo1")) {
    bot.editMessageText(
      `Nota:\n\n- La visita al Santísimo por grupo será de 20 minutos.\n\n- La hora de visita para cada grupo de Bachillerato será diferente cada semana.\n\n- Cada grupo debe asistir a la visita del Santísimo con el Docente que le corresponda según su horario de clase.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_santisimo.reply_markup,
      }
    );
  }else if (comando.startsWith("/eucaristias1")) {
    bot.editMessageText(
      `NOTA:\nCada grupo debe asistir a la Eucaristía con el Docente que le corresponda según su horario`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_eucaristias.reply_markup,
      }
    );
  }else if (comando.startsWith("/oracion1")) {
    bot.editMessageText(
      `NOTA:\nLos estudiantes junto con su Docente de Aula / Guía, son responsables de la Oración`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_oracion.reply_markup,
      }
    );
  }
}


export function respuestas_secundarias(bot,callbackQuery){
  //escuchando todas las acciones que vienen de presionar botones
  const opciones_actividad = {
    A: {
      //Botones que vienen en la opción de horario"
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      //Botones que vienen en la opción de horario"
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_constancias = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancias,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancias,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_misa = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a misas", callback_data: "/misa,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a misas", callback_data: "/misa,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_fiesta = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a fiestas", callback_data: "/fiesta,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a fiestas", callback_data: "/fiesta,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_boletin = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a boletin", callback_data: "/boletin,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a boletin", callback_data: "/boletin,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_guardias ={
    //Botones que vienen en la opción de horario"   
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a elegir mes", callback_data: "/month,guardias" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };
  const opciones_santisimo ={
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a elegir semana", callback_data: "/week,santisimo" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };
  const opciones_eucaristias ={
    //Botones que vienen en la opción de horario"   
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a la información", callback_data: "/eucaristias" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };
  const opciones_oracion ={
    //Botones que vienen en la opción de horario"   
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a la información", callback_data: "/oracion" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
  
  };

  const messageId = callbackQuery.message.message_id;
  //el id del mensaje lo podemos usar para editar/borrar mensajes
  const chatId = callbackQuery.message.chat.id;
  const comando = callbackQuery.data;
  const section = comando.split(",")[1];

  //este es el comando enviado, por ejemplo /horario o /misa
  if (comando.startsWith("/actividad1")) {
    bot.editMessageText(`Materias del dia lunes:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando.startsWith("/actividad2")) {
    bot.editMessageText(`Materias del dia martes:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando.startsWith("/actividad4")) {
    bot.editMessageText(`Materias del dia jueves:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
  } else if (comando.startsWith("/actividad5")) {
    bot.editMessageText(`Materias del dia viernes:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
  } else if (comando.startsWith("/constancia1")) {
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes de primaria! Les informamos que podrán retirar las constancias de estudio los días lunes y martes. Para obtener la constancia, se requerirá un pago de 3 dólares por cada copia. Este monto ayudará a cubrir los gastos administrativos asociados. Asegúrense de traer el dinero exacto al momento de recoger la constancia. Agradecemos su colaboración y les recordamos que la constancia es un documento importante para futuros trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/constancia2")) {
    bot.editMessageText(
      `¡Anuncio importante para los estudiantes de secundaria y sus familias! Les informamos que podrán retirar las constancias de estudio los días jueves y viernes. Para obtener la constancia, se requerirá un pago de 5 dólares por cada copia. Este monto contribuirá a cubrir los costos administrativos y de impresión. Por favor, asegúrense de traer la cantidad exacta al momento de recoger la constancia. Agradecemos su comprensión y apoyo en esta gestión. La constancia de estudio será un documento valioso para futuras solicitudes y trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa1")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa del día lunes! Los invitamos a unirse a nosotros en un momento de fe y reflexión. Durante esta celebración, nos reuniremos para orar juntos, escuchar la palabra de Dios y fortalecer nuestra espiritualidad. Esperamos que esta misa sea un espacio de paz y renovación para todos. ¡Los esperamos con alegría!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa2")) {
    bot.editMessageText(
      `Les recordamos que el día jueves tendremos una misa especial. Los invitamos a unirse a nosotros en este encuentro de fe y comunidad. Durante la misa, compartiremos momentos de oración, reflexión y alabanza. Es una oportunidad para reafirmar nuestra conexión con lo divino y encontrar consuelo en la palabra de Dios. ¡Esperamos contar con su presencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa3")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa dominical! Los invitamos a unirse a nosotros en este sagrado día de adoración y comunión. Durante la misa, nos reuniremos como comunidad para celebrar la presencia de Dios en nuestras vidas. Escucharemos lecturas bíblicas, entonaremos himnos de alabanza y compartiremos juntos la Eucaristía. Esperamos que esta misa sea un momento de inspiración espiritual y renovación para todos. ¡Les esperamos con los brazos abiertos!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta1")) {
    bot.editMessageText(
      `¡Ven y únete al increíble Carnaval del Liceo del 12 de febrero al 13 de de abril de 2024! Sumérgete en un mundo de magia, color y diversión sin límites. Disfruta de deslumbrantes desfiles de carnaval, emocionantes juegos, competencias de disfraces, música en vivo y una amplia variedad de comida y bebida. Además, celebra la diversidad cultural y promueve el compañerismo a través de talleres y actividades educativas. ¡No te pierdas esta fiesta inolvidable!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta2")) {
    bot.editMessageText(
      `¡Ven y celebra la Semana Santa en grande del 24 al 30 de marzo de 2024! Sumérgete en una experiencia llena de tradición, espiritualidad y diversión. Disfruta de procesiones religiosas, actividades culturales, concursos, música en vivo y una variedad de deliciosos platos típicos. Además, aprovecha para reflexionar y conectar con tu espiritualidad en este tiempo especial. ¡No te pierdas esta emocionante celebración de la Semana Santa!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta3")) {
    bot.editMessageText(
      `¡Atención a todos! Les informamos que se acerca la predefensa del Grupo 6. Prepárense para mostrar todo su esfuerzo y conocimiento en esta importante etapa. Durante la predefensa, tendrán la oportunidad de presentar sus proyectos, responder preguntas y recibir retroalimentación valiosa. Asegúrense de estar preparados y demostrar su mejor trabajo. ¡Buena suerte a todos en esta próxima etapa crucial!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta4")) {
    bot.editMessageText(
      `¡Anuncio importante para todos los interesados! Les informamos que se acerca la emocionante defensa de tesis, que se llevará a cabo del 27 al 29 de febrero de 2024. Es el momento culminante en el que nuestros estudiantes presentarán sus proyectos de investigación y compartirán los resultados de sus arduos esfuerzos. Acompáñennos para presenciar presentaciones innovadoras, debates académicos y la brillantez de nuestras mentes creativas. ¡No se pierdan esta oportunidad de celebrar el conocimiento y el logro académico!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta5")) {
    bot.editMessageText(
      `¡Es un honor compartir con todos ustedes la emocionante noticia de nuestra próxima graduación! Después de años de arduo trabajo, dedicación y perseverancia, nuestros estudiantes están listos para dar un gran paso hacia el futuro. La graduación será un momento especial en el cual celebraremos sus logros, reconociendo su esfuerzo y determinación. Será una ceremonia llena de alegría, orgullo y promesas de nuevos comienzos. Acompáñenos para aplaudir a nuestros graduados y desearles éxito en sus futuras aventuras. ¡No se pierdan este memorable evento de celebración y trascendencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/boletin1")) {
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes! Les informamos que podrán retirar los boletines de calificaciones el día viernes. Para obtener el boletín, se requerirá un pago de 10 dólares por cada copia. Este monto ayudará a cubrir los costos de impresión y administración. Asegúrense de traer el dinero exacto al momento de recoger su boletín. Agradecemos su comprensión y apoyo en esta importante gestión.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_boletin[section].reply_markup,
      }
    );
  }else if (comando.startsWith("/guardias1")) {
    bot.editMessageText(
      `LAS GUARDIAS DEBE REALIZARSE EN LA FECHA INDICADA, EN EL CASO DE NO REALIZARLA POR ALGUNA EVENTUALIDAD SE REALIZA EN LA FECHA SIGUIENTE.\n\nEL PROFESOR, PROFESORA O MAESTRA QUE LE CORRESPONDA LA GUARDIA DEBE LLEGAR 6:45 AM PARA PREPARAR EL ESCENARIO Y COLOCAR LAS BANDERAS A MEDIA ASTA PEDIR EL FAVOR AL SR. GUIDO PARA COLOCARLAS, PARA CUANDO SE INICIE LA ACTIVIDAD NO SE PIERDA TIEMPO.\n\nSI EL PROFESOR, PROFESORA O MAESTRA NO ASISTE PARA LA FECHA INDICADA DE LA GUARDIA DEBE DEJAR ASIGNADA LA ACTIVIDAD A LOS ESTUDIANTES PARTICIPANTES.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_guardias.reply_markup,
      }
    );
  }else if (comando.startsWith("/santisimo1")) {
    bot.editMessageText(
      `Nota:\n\n- La visita al Santísimo por grupo será de 20 minutos.\n\n- La hora de visita para cada grupo de Bachillerato será diferente cada semana.\n\n- Cada grupo debe asistir a la visita del Santísimo con el Docente que le corresponda según su horario de clase.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_santisimo.reply_markup,
      }
    );
  }else if (comando.startsWith("/eucaristias1")) {
    bot.editMessageText(
      `NOTA:\nCada grupo debe asistir a la Eucaristía con el Docente que le corresponda según su horario`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_eucaristias.reply_markup,
      }
    );
  }else if (comando.startsWith("/oracion1")) {
    bot.editMessageText(
      `NOTA:\nLos estudiantes junto con su Docente de Aula / Guía, son responsables de la Oración`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_oracion.reply_markup,
      }
    );
  }
}