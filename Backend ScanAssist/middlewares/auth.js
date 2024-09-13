import Teacher from "../models/Teacher.js";

export const LoginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (email && password) {
      console.log({ email,password });
      
      let usuario = await Teacher.findOne({ where: { email,password } });
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

export const RegisterTeacher = async (req, res) => {
  try {
    const { email, password, name,cellPhone } = req.body;
    if (email && password && name && cellPhone) {
    const newTeacher = await Teacher.create({ email, password, name,cellPhone });
    return res.status(200).json(newTeacher.dataValues);
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
