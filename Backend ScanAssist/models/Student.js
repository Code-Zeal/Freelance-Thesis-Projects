import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearAndSection: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdfUrl:{
      type:DataTypes.STRING,
      allowNull:true
    }
  },
  {}
);

export default Student;
