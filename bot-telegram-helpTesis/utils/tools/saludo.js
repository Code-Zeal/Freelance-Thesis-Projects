

export const saludo = ()=>{
  const now = new Date();
  const options = {
    timeZone: "America/Caracas",
    hour: "numeric",
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat("es-VE", options);
  const hour = formatter.format(now);
  if (hour >= 6 && hour < 12) {
    return "Buenos días";
  } else if (hour >= 12 && hour < 19) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
}