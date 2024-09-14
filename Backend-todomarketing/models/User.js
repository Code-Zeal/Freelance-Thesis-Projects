import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    followers: {
      type: DataTypes.INTEGER,
      defaultValue:0,
      allowNull: true,
    },
    following: {
      type: DataTypes.INTEGER,
      defaultValue:0,
      allowNull: true,
    },
    accountsFollowing: {
      type: DataTypes.JSONB,
      defaultValue:[],
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorialChat:{type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:false
    },
    tutorialProfile:{type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:false
    },
    youLikeTheApp:{type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue:0,
    },
    typeAccount: {
      type: DataTypes.ENUM(["client", "entrepreneur"]),
      allowNull: false,
    },
  },
  {}
);

export default User;
