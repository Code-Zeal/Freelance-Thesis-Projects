import { Op } from "sequelize";
import sequelize from "../database.js";
import Classroom from "../models/Classroom.js";
import User from "../models/User.js";


export const GetInfo = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const usuario = await User.findOne({ where: { email:email?.toLowerCase() } });

      if (usuario) {
        return res.status(200).json(usuario.dataValues);
      } else {
        throw new Error("Usuario no encontrado");
      }
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const GetMyClassrooms = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const classrooms = await Classroom.findAll({ 
        where: { 
          alumnos: {
            [Op.contains]: [id]
          }
        } 
      });

      if (classrooms) {
        return res.status(200).json(classrooms);
      } else {
        return res.status(200).json([]);
      }
    } else {
      return res
      .status(404)
      .json({ message: "Error, campo id inválido: "+id,});
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
      name,
      email,
      newEmail,
      notify,
      profileImage,
      yearAndSection,
      classrooms,
    } = req.body;

    const updateFields = {};  
    if (profileImage) {
      updateFields.profileImage = profileImage
    }
    if (yearAndSection) {
      updateFields.yearAndSection = yearAndSection;
    }
    if (name) {
      updateFields.name = name;
    }
    if (newEmail) {
      updateFields.email = newEmail?.toLowerCase();
    }
    if (classrooms) {
      updateFields.classrooms = classrooms;
    }
    if (notify === false || notify === true) {
      updateFields.notify = notify;
    }
    if (email) {
      const usuario = await User.findOne({ where: { email:email?.toLowerCase() } });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      console.log("usuario encontrado");
      const updatedUser = await usuario.update(updateFields);
      if (!updatedUser) {
        throw new Error("Error al actualizar el usuario");
      }
      console.log("usuario actualizado");
      return res.status(200).json(updatedUser.dataValues);
    } else {
      throw new Error("Email de Usuario requerido");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

