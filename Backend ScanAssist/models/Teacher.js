import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Teacher = sequelize.define(
  "Teacher",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cellPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classrooms:{
      type: DataTypes.JSON,
      allowNull: true,
    }
    
  },
  {}
);

export default Teacher;
