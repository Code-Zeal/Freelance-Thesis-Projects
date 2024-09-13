import app from "./server.js";
import sequelize from "./database.js";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import router from "./routes/index.js";
import 'dotenv/config';
import { fileURLToPath } from "url";
import 'dotenv/config';
import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";
import Classroom from "./models/Classroom.js";
import Media from "./models/Media.js";
import cron from "node-cron"
import moment from "moment-timezone"
import { checkAttendances } from "./middlewares/attendance.js";


//cron Task:
cron.schedule('0 0 19 * * 1-5', async () => {
  console.log("Iniciando tarea cron...");
  const nowInVenezuela = moment().tz('America/Caracas').format('HH:mm');
  console.log(`Tarea ejecutada a las ${nowInVenezuela} en la zona horaria de Venezuela.`);
  await checkAttendances();
  console.log("Tarea cron finalizada.");
}, {
  timezone: "America/Caracas"
});
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};
app.use(cors(corsOptions));
morgan.token("host", function (req, res) {
  return req.hostname;
});
app.use(
  morgan("common")
);
// generateAndSaveCarnet({ id:43, name:"Marcelo Rafael Garcia Manosalva", profileImage:"https://img.freepik.com/fotos-premium/foto-documento-o-identificacion-pasaporte-hombre-caucasico-maduro-traje_262388-3596.jpg?w=360", yearAndSection:"5to A", parentEmail:"codeseazeal@gmail.com" })
app.use(express.json());
app.use("/", router);
const port = process.env.PORT || 3000;
app.use('/data', express.static("/data"));

sequelize
  .sync({ logging: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`La aplicación está escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar la aplicación:", error);
  });
