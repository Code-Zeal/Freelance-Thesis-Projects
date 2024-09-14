import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const LearningModel = sequelize.define(
  "Learning",
  {
    courses: DataTypes.ARRAY(
      DataTypes.JSONB("courses", {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.ENUM("client", "entrepreneurship"),
        videos: DataTypes.ARRAY(
          DataTypes.JSONB("videos", {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            video: DataTypes.STRING,
          })
        ),
      })
    ),
    tips: DataTypes.ARRAY(
      DataTypes.JSONB("tips", {
        tip: DataTypes.STRING,
        type: DataTypes.ENUM("client", "entrepreneurship"),
      })
    ),
    articles: DataTypes.ARRAY(
      DataTypes.JSONB("articles", {
        title: DataTypes.STRING,
        type: DataTypes.ENUM("client", "entrepreneurship"),
        content: DataTypes.STRING,
      })
    ),
    advices: DataTypes.ARRAY(
      DataTypes.JSONB("advices", {
        title: DataTypes.STRING,
        type: DataTypes.ENUM("client", "entrepreneurship"),
        content: DataTypes.STRING,
      })
    ),
  },
  { timestamps: false }
);

export default LearningModel;
