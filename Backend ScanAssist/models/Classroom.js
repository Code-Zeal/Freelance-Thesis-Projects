import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Classroom = sequelize.define(
  "Classroom",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearAndSection: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacher:{
      type:DataTypes.STRING,
      allowNull:false
    },
    students:{
      type:DataTypes.JSON,
      allowNull:true
    },
    schedule: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    attendance: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {}
);

export default Classroom;
