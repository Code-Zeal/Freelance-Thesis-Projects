import Teacher from "../models/Teacher.js";
import User from "../models/User.js";

export const Login = async (req, res) => {
  try {
    const { name, email,yearAndSection} = req.body;
    if (name && email && yearAndSection) {
      let usuario = await User.findOne({ where: { email:email?.toLowerCase() } });

      if (!usuario) {
        // Si el usuario no existe, lo creamos
        usuario = await User.create({
          name,
          email:email?.toLowerCase(),
          yearAndSection,
          classrooms: [],
        });
      }

      return res.status(200).json(usuario.dataValues);
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
export const LoginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      let usuario = await Teacher.findOne({ where: { email:email?.toLowerCase(),password } });
      if(usuario){

        return res.status(200).json(usuario.dataValues);
      }else{
        return res
        .status(404)
        .send("Usuario no encontrado");
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
