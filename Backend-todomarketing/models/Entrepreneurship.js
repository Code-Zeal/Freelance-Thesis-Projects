import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database.js";
import { v4 } from "uuid";
const EntrepreneurshipModel = sequelize.define(
  "Entrepreneurship",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delivery: {
      type: DataTypes.ENUM(
        "national",
        "international",
        "city",
        "neighborhood",
        "none"
      ),
      allowNull: false,
    },
    branches: {
      type: DataTypes.ARRAY(
        DataTypes.JSONB("branches", {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          cellphone: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
          },
          email: { type: DataTypes.STRING, allowNull: true },
          rif: { type: DataTypes.STRING, allowNull: true },
          socialMedias: {
            type: DataTypes.JSONB("socialMedias", {
              instagram: DataTypes.JSON,
              facebook: DataTypes.JSON,
              whatsApp: DataTypes.JSON,
              telegram: DataTypes.JSON,
              twitter: DataTypes.JSON,
            }),
            allowNull: true,
          },
          location: { type: DataTypes.JSON, allowNull: true },
          branchPhotos: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
          },
        })
      ),
      allowNull: true,
    },
    gallery: {
      type: DataTypes.ARRAY(
        DataTypes.JSONB("gallery", {
          type: DataTypes.STRING,
          url: DataTypes.STRING,
          name: DataTypes.STRING,
        })
      ),
      allowNull: true,
    },
    posts: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
    userOwner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entrepreneurshipDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

export default EntrepreneurshipModel;
