import Classroom from "../models/Classroom.js";
import Teacher from "../models/Teacher.js";

export const GetInfo = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const usuario = await Teacher.findOne({ where: { id } });

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

export const GetAllClassrooms = async (req, res) => {
  const {email} = req.body
  try {
    if(email){
      const classrooms = await Classroom.findAll({where:{profesor:email}});

      if (classrooms) {
        return res.status(200).json(classrooms);
      } else {
        return res.status(200).json([]);
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


export const UpdateInfo = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      cellPhone
    } = req.body;
    const updateFields = {};
    
    if (cellPhone) {
      updateFields.cellPhone = cellPhone;
    }
    if (name) {
      updateFields.name = name;
    }
    if (email) {
      updateFields.email = email;
    }
    if (id) {
     
      const usuario = await Teacher.findByPk(id);
      
      const updatedUser = await usuario.update(updateFields);
      if (updatedUser) {
        return res.status(200).json(updatedUser.dataValues);
      } else {
        throw new Error("Error al crear la cuenta");
      }
    } else {
      throw new Error("id de Usuario requerido");
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error });
  }
};
