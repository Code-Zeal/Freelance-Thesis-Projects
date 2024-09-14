export const opciones_inicio = (questionId) => {
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Introducción",   callback_data: "/introduccion," + questionId }],
        [{ text: "Marco Teórico", callback_data: "/marco_teorico," + questionId }],
        [{ text: "Metodología", callback_data: "/metodologia," + questionId }],
        [{ text: "Resultados", callback_data: "/resultados," + questionId }],
        [{ text: "Discusión", callback_data: "/discusion," + questionId }],
        [{ text: "Conclusiones", callback_data: "/conclusiones," + questionId }],
        [{ text: "Otro", callback_data: "/pregunta_libre," + questionId }],
      ],
    }),
  };
};