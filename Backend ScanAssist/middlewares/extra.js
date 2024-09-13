import "dotenv/config";
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'apifood02@gmail.com',
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

export const sendNotificationEmail =async(to, student, yearAndSection,date,clase,teacher,tel,email)=>{
  try {
    await transporter.sendMail({
      from: 'ScanAssist@gmail.com',
      to:to?.toLowerCase(),
      subject:"Notificación de ScanAssist",
      template: 'sendNote', // Nombre de la plantilla
      context: { student, yearAndSection,date,clase,teacher,tel,email } // Datos para la plantilla
    });
    
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

