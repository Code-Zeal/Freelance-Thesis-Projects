import e from "express";
import { EntrepreneurshipModel, User } from "../associations.js";

export const Login = async (req, res) => {
  try {
    const { email, password,typeAccount } = req.body;
    if (email && password && typeAccount) {
      const usuario = await User.findOne({ where: { email } });
      
      if (usuario) {
        const contraseñaValida = usuario.dataValues.password === password;
        const tipoDeCuentaValido = usuario.dataValues.typeAccount === typeAccount
        if (contraseñaValida) {
          if(tipoDeCuentaValido){
            return res.status(200).json(usuario.dataValues);
          }else{
            throw new Error("El tipo de cuenta es incorrecto");
          }
        } else {
          throw new Error("Contraseña incorrecta");
        }
      } else {
        throw new Error("Usuario/correo no encontrado");
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

export const Register = async (req, res) => {
  try {
    const { name, email, password, cellphone, typeAccount,delivery,branches,description } = req.body;
    
    
    if(typeAccount === "client"){

      if (name && email && password && cellphone ) {
        const usuario = await User.findOne({ where: { email } });
        if (usuario) {
          return res
          .status(404)
          .json({ message: "Ya existe una cuenta con este correo" });
      }
      const newUser = await User.create({
        name,
        email,
        password,
        cellphone,
        typeAccount,
      });
      if (newUser) {
        return res.status(200).send(newUser.dataValues);
      } else {
        throw new Error("Error al crear la cuenta");
      }
    } else {
      throw new Error("Campos inválidos");
    }
  }else{
    if (name && email && password && cellphone && delivery && branches && description) {
      const usuario = await User.findOne({ where: { email } });
      if (usuario) {
        return res
        .status(404)
        .json({ message: "Ya existe una cuenta con este correo" });
    }
    const newUser = await User.create({
      name,
      email,
      password,
      cellphone,
      typeAccount,
      description
    });
      const emprendimiento = await EntrepreneurshipModel.findOne({ where: { userOwner:newUser.dataValues.id } });
      if (emprendimiento) {
        return res
        .status(404)
        .json({ message: "Ya existe una cuenta con este correo" });
    }
    
    const newEmprendimiento = await EntrepreneurshipModel.create({
      name,
      delivery,
      branches:JSON.parse(branches),
      userOwner:newUser.dataValues.id,
      createdAt:Date.now(),
      entrepreneurshipDate:Date.now(),
      description
    });
    if (newUser && newEmprendimiento) {
      return res.status(200).send(newUser.dataValues);
    } else {
      throw new Error("Error al crear la cuenta");
    }
  } else {
    throw new Error("Campos inválidos");
  }
  }
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Error del servidor", error });
  }
};
