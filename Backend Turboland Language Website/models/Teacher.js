import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Teacher = sequelize.define(
  "Teacher",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export default Teacher;
