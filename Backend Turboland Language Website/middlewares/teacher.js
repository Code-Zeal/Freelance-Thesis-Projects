import Classroom from "../models/Classroom.js";
import Teacher from "../models/Teacher.js";
import User from "../models/User.js";

export const GetInfo = async (req, res) => {
  try {
    const { email,password } = req.body;
    if (email && password) {
      const usuario = await Teacher.findOne({ where: { email:email?.toLowerCase(),password } });

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
  const { id } = req.query;

  try {
    if (id) {
      const classrooms = await Classroom.findAll({ where: { profesor: id } });

      if (classrooms.length > 0) {
        // Crear una lista de promesas para obtener los datos de los alumnos de cada salón
        const classroomPromises = classrooms.map(async (classroom) => {
          // Obtener los IDs de los alumnos de este salón
          const studentIds = classroom.alumnos;

          // Obtener los datos de los alumnos usando sus IDs
          const students = await User.findAll({
            where: {
              id: studentIds
            }
          });

          // Reemplazar el campo alumnos con los datos completos de los alumnos
          return {
            ...classroom.toJSON(),
            alumnos: students
          };
        });

        // Esperar a que todas las promesas se resuelvan
        const classroomsWithStudents = await Promise.all(classroomPromises);

        return res.status(200).json(classroomsWithStudents);
      } else {
        return res.status(200).json([]);
      }
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};


export const UpdateInfo = async (req, res) => {
  try {
    const {
      name,
      email,
      newEmail,
      profileImage,
      password
    } = req.body;
    const updateFields = {};
    if (profileImage) {
      updateFields.profileImage = profileImage;
    }
    if (password) {
      updateFields.password = password;
    }
    if (name) {
      updateFields.name = name;
    }
    if (newEmail) {
      updateFields.email = newEmail?.toLowerCase();
    }
    if (email) {
      const usuario = await Teacher.findOne({ where: { email:email?.toLowerCase() } });
      console.log(usuario);
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
