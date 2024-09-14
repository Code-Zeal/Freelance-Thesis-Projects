import "dotenv/config";
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
import User from "../models/User.js";
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'turbolandlanguagewebsite@gmail.com',
      pass: process.env.APP_PASS
  }
});
const handlebarOptions = {
  viewEngine: {
      extName: '.hbs',
      partialsDir: path.resolve('./templates/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./templates/'),
  extName: '.hbs',
};
transporter.use('compile', hbs(handlebarOptions));

export const sendNotificationEmail = async (to, classroom, evaluation,note) => {
  try {
    await transporter.sendMail({
      from: 'turbolandlanguagewebsite@gmail.com',
      to:to?.toLowerCase(),
      subject:"Notificación Turboland Language Website",
      template: 'sendNote', // Nombre de la plantilla
      context: { classroom, evaluation,note } // Datos para la plantilla
      //rdha rdka aena bgju
    });
    
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export const sendEmail = async (req, res) => {
  const {email, classroom, evaluation,note } = req.body;
  try {
    if (classroom && email && evaluation && note) {
      await sendNotificationEmail(email?.toLowerCase(), classroom, evaluation,note);
      return res
      .status(200).send("Email sent successfully!")
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
