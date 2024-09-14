import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Classroom = sequelize.define("Classroom", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  code:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  temas: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  evaluaciones: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  tareasYPracticas: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  videos: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  juegos: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  librosPDF: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  traductor: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  audios: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  notasYAsistencias: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  alumnos:{
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  
  },
  profesor:{
    type: DataTypes.STRING,
    allowNull: false,
  
  }
});

export default Classroom;
