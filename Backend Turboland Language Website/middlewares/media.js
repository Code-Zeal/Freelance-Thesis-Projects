import fs from 'fs';
import Classroom from "../models/Classroom.js";

export const DeleteFile = async (req, res) => {
  try {
    const { id, filePath } = req.query;

    if (id && filePath) {
      const classR = await Classroom.findByPk(id)

      if (!classR) {
        throw new Error("Clase no encontrada");
      }

      // Encuentra el PDF en librosPDF que coincide con filePath
      const pdfToDeleteIndex = classR.librosPDF.findIndex(pdf => pdf.filePath === filePath);

      if (pdfToDeleteIndex === -1) {
        throw new Error("PDF no encontrado");
      }

      // Elimina el archivo PDF
      fs.unlinkSync(classR.librosPDF[pdfToDeleteIndex].filePath);

      // Elimina el PDF de librosPDF
      classR.librosPDF.splice(pdfToDeleteIndex, 1);

      // Guarda los cambios en la base de datos
      const savedClassroom = await classR.save();

      if (savedClassroom) {
        return res.status(200).json(savedClassroom);
      }
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const SaveFile = async (req, res) => {
  try {
    const { id } = req.body;
    const file = req.file; 

    if (id && file) {
      // Buscar el Classroom por id
      const classroom = await Classroom.findByPk(id);

      if (!classroom) {
        throw new Error("No se encontró el Classroom");
      }

      // Agregar el nuevo PDF a librosPDF
      const newPdf = {
        name: file.originalname,
        type: file.mimetype,
        filePath: file.path,
      };

      classroom.librosPDF = [...classroom.librosPDF, newPdf];

      // Guardar los cambios
      const savedClassroom = await classroom.save();

      if (savedClassroom) {
        return res.status(200).json(savedClassroom);
      } 
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
