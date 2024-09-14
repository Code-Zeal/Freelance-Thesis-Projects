import app from "./server.js";
import sequelize from "./database.js";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import router from "./routes/index.js";
import 'dotenv/config';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import Teacher from "./models/Teacher.js";
import Classroom from "./models/Classroom.js";
import { sendNotificationEmail } from "./middlewares/extra.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
const port = process.env.PORT || 3000;
app.use('/data', express.static("/data"));
//  sendNotificationEmail("quinterodeilimar114@gmail.com","Inglés","Números de 1 al 100","20 pts")
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
