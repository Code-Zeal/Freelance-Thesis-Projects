import { DataTypes } from "sequelize";
import sequelize from "../database.js";
const Media = sequelize.define(
  "Media",
  {
    userOwner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: { 
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {}
);
export default Media