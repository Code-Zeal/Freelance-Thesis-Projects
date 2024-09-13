import Student from "../models/Student.js";
import QRCode from "qrcode"
import { v2 as cloudinary } from 'cloudinary';
import PDFDocument from "pdfkit";
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import Media from '../models/Media.js';
import { dirname } from "path";
import { fileURLToPath } from "url";
const uploadImage = async function (file) {
  // Configuración de Cloudinary
  cloudinary.config({
    cloud_name: "dwgzz322c",
    api_key: "943654753763816",
    api_secret: "RQVSSiByeoCE8wfuJWZBKsWUzPM",
  });

  // Subir una imagen
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: 'alumno' },
      (error, uploadResult) => {
        if (error) {
          console.log("Error al subir la imagen:", error);
          reject(error);
        } else {
          resolve(uploadResult.secure_url); // Devuelve la URL segura
        }
      }
    );

    if (file) {
      uploadStream.end(file.buffer);
    } else {
      console.log("Error: archivo no proporcionado");
      reject(new Error("Archivo no proporcionado"));
    }
  });
};
/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const generateAndSaveCarnet = async (usuario) => {
  const { id, name, profileImage, yearAndSection, parentEmail } = usuario;

  // Generar el código QR
  const qrCodeDataUrl = await QRCode.toDataURL(
    JSON.stringify({ id, name, yearAndSection, parentEmail }),
    { errorCorrectionLevel: 'H' }
  );
  const ptPX = (px)=> 3/4*px
  const doc = new PDFDocument({
    size: [ptPX(501), ptPX(800)],
    compress:false
  });

  // Ruta y nombre de archivo de ejemplo
  const filePath = path.join(__dirname, 'carnet-ejemplo.pdf');
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Función para agregar imagen desde una URL
  const addImageFromUrl = async (url, x, y, options = {},circle=false) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const image = Buffer.from(response.data, 'base64');
    if(circle){
      const { width, height } = options;
      const radius = Math.min(width, height) / 2; // Asegúrate de que el radio sea adecuado

      // Dibuja un círculo
      doc.save(); // Guarda el estado del contexto
      doc.circle(x + radius, y + radius, radius).clip(); // Crea un clipping path

      // Dibuja la imagen dentro del clipping path
      doc.image(image, x, y, { width, height });

      doc.restore(); // Restaura el estado del contexto
    }else{
      doc.image(image, x, y, options);
    }
  };

  // Agregar imágenes y texto al documento
  await addImageFromUrl('https://i.postimg.cc/YqrKcfQG/carnet1.png', 0, 0, { width: ptPX(501), height: ptPX(800) });
  await addImageFromUrl(profileImage, 94, 121, { width: ptPX(250), height: ptPX(250) },true);
  doc.font('Helvetica-Bold').fontSize(27).fillColor('white').text(name, ptPX(95), ptPX(480), { width: ptPX(310), align: 'center' });
  doc.font('Helvetica-Bold').fontSize(14).fillColor('white').text(id, ptPX(150), ptPX(634), { width: ptPX(200), align: 'left' });
  
  doc.font('Helvetica-Bold').fontSize(14).fillColor('white').text(yearAndSection, ptPX(285), ptPX(682), { width: ptPX(200),height:ptPX(20), align: 'left' });
  
  doc.font('Helvetica-Bold').fontSize(14).fillColor('white').text(parentEmail, ptPX(210), ptPX(730), { width: ptPX(270),height:ptPX(20), align: 'left' });
  doc.addPage({ size: [ptPX(501), ptPX(800)],
    compress:false});
    await addImageFromUrl('https://i.postimg.cc/59qdkkQW/carnet2.png', 0, 0, { width: ptPX(501), height: ptPX(800) });
    doc.image(qrCodeDataUrl, ptPX(140), ptPX(180), { width: ptPX(220), height: ptPX(220) });
    // Finalizar el documento
    doc.end();
    
    // Esperar a que se termine de escribir el archivo
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
      resolve(filePath);
    });
    writeStream.on('error', (error) => {
      reject(error);
    });
  });
};

*/






const generateAndSaveCarnet = async (usuario) => {
  const { id, name, profileImage, yearAndSection, parentEmail } = usuario;

  const qrCodeDataUrl = await QRCode.toDataURL(
    JSON.stringify({ id, name, yearAndSection, parentEmail }),
    { errorCorrectionLevel: 'H' }
  );

  const ptPX = (px)=> 3/4*px
  const doc = new PDFDocument({
    size: [ptPX(501), ptPX(800)],
    compress:false
  });

  const filePath = path.join('/data', `carnet-${id}.pdf`);
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  const addImageFromUrl = async (url, x, y, options = {},circle=false) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const image = Buffer.from(response.data, 'base64');
    if(circle){
      const { width, height } = options;
      const radius = Math.min(width, height) / 2; // Asegúrate de que el radio sea adecuado

      // Dibuja un círculo
      doc.save(); // Guarda el estado del contexto
      doc.circle(x + radius, y + radius, radius).clip(); // Crea un clipping path

      // Dibuja la imagen dentro del clipping path
      doc.image(image, x, y, { width, height });

      doc.restore(); // Restaura el estado del contexto
    }else{
      doc.image(image, x, y, options);
    }
  };


  await addImageFromUrl('https://i.postimg.cc/sDBQS5qM/carnet1.png', 0, 0, { width: ptPX(501), height: ptPX(800) });
  await addImageFromUrl(profileImage, 94, 121, { width: ptPX(250), height: ptPX(250) },true);
  doc.font('Helvetica-Bold').fontSize(27).fillColor('white').text(name, ptPX(95), ptPX(480), { width: ptPX(310), align: 'center' });
  doc.font('Helvetica-Bold').fontSize(14).fillColor('white').text(id, ptPX(150), ptPX(634), { width: ptPX(200), align: 'left' });
  
  doc.font('Helvetica-Bold').fontSize(14).fillColor('white').text(yearAndSection, ptPX(285), ptPX(682), { width: ptPX(200),height:ptPX(20), align: 'left' });
  
  doc.font('Helvetica-Bold').fontSize(14).fillColor('white').text(parentEmail, ptPX(210), ptPX(730), { width: ptPX(270),height:ptPX(20), align: 'left' });
  doc.addPage({ size: [ptPX(501), ptPX(800)],
    compress:false});
    await addImageFromUrl('https://i.postimg.cc/TYZycpvC/carnet2.png', 0, 0, { width: ptPX(501), height: ptPX(800) });
    doc.image(qrCodeDataUrl, ptPX(140), ptPX(180), { width: ptPX(220), height: ptPX(220) });
    // Finalizar el documento
    doc.end();

  writeStream.on('finish', async () => {
    await Media.create({
      userOwner: id,
      name: `carnet-${id}.pdf`,
      type: 'application/pdf',
      filePath: filePath,
    });
  });

  return filePath;
};
export const NewStudent = async (req, res) => {
  try {
    const { name, parentEmail, yearAndSection } = req.body;
    const file = req.file;

    if (name && file && parentEmail && yearAndSection) {
      let profileImage = await uploadImage(file);

      const usuario = await Student.create({
        name,
        profileImage,
        parentEmail,
        yearAndSection,
      });
      let response = await generateAndSaveCarnet(usuario.dataValues);
      if(response){
      usuario.pdfUrl = response
      await usuario.save()
      }
      
      return res.status(200).json(usuario.dataValues);
    } else {
      throw new Error('Campos inválidos');
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};


export const GetInfo = async (req, res) => {
  try {
      const usuarios = await Student.findAll();

      if (usuarios) {
        return res.status(200).json(usuarios);
      } else {
        throw new Error("Usuarios no encontrados");
      }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const GetStudent = async (req, res) => {
  try {
      const {id} = req.query
      const usuario = await Student.findByPk(id);

      if (usuario) {
        return res.status(200).json(usuario.dataValues);
      } else {
        throw new Error("Usuarios no encontrados");
      }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};



export const UpdateInfo = async (req, res) => {
  try {
    const {
      id,name,parentEmail,yearAndSection,profileImage
    } = req.body;
    console.log(req.body);
    
    const file = req.file
    console.log(file);
    const updateFields = {};
    if (name) {
      console.log("to bien1");
      updateFields.name = name;
    }
    if(file){
      console.log("to bien2");
      let profileImageUp = await uploadImage(file);
      updateFields.profileImage = profileImageUp;
    }else if(profileImage){
      console.log("to bien2");
      updateFields.profileImage = profileImage;
    }
    
    if (parentEmail) {
      console.log("to bien3");
      updateFields.parentEmail = parentEmail;
    }
    if (yearAndSection) {
      console.log("to bien4");
      updateFields.yearAndSection = yearAndSection;
    }
    if (id) {
      console.log("to bien5");
      updateFields.id = id
      const usuario = await Student.findOne({ where: { id } });
      console.log("to bien6");
      let response = await generateAndSaveCarnet(updateFields);
      console.log("to bien7");
      if(response){
        console.log("to bien8");
        updateFields.pdfUrl = response
      }
      console.log("to bien9");
      const updatedUser = await usuario.update(updateFields);
      console.log("to bien10");
      if (updatedUser) {
        console.log("to bien11");
        return res.status(200).json(updatedUser.dataValues);
      } else {
        console.log("error1");
        throw new Error("Error al crear la cuenta");
      }
    } else {
      console.log("error2");
      throw new Error("id de Usuario requerido");
    }
  } catch (error) {
    console.log("error3",error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

export const DeleteStudent = async (req, res) => {
  try {
    const {id} = req.query;
    if (id) {
      await Student.destroy({ where: { id } });
        return res.status(200).send("OK");
     
    } else {
      throw new Error("id de Usuario requerido");
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error });
  }
};
