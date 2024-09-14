import { DataTypes } from "sequelize";
import sequelize from "./database.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import EntrepreneurshipModel from "./models/Entrepreneurship.js";
import Media from "./models/Media.js";

const SavedPosts = sequelize.define("SavedPosts", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: "id",
    },
  },
});

const FavoritesPosts = sequelize.define("FavoritesPosts", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: "id",
    },
  },
});
const LikedPosts = sequelize.define("LikedPosts", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: "id",
    },
  },
});

User.belongsToMany(Post, { through: SavedPosts });
Post.belongsToMany(User, { through: SavedPosts });

User.belongsToMany(Post, { through: FavoritesPosts });
Post.belongsToMany(User, { through: FavoritesPosts });

User.belongsToMany(Post, { through: LikedPosts });
Post.belongsToMany(User, { through: LikedPosts });

// Asociaciones para EntrepreneurshipModel
EntrepreneurshipModel.belongsTo(User, { foreignKey: "userOwner" });
User.hasMany(EntrepreneurshipModel, { foreignKey: "userOwner" });

EntrepreneurshipModel.belongsToMany(Post, { through: "EntrepreneurshipPosts" });
Post.belongsToMany(EntrepreneurshipModel, { through: "EntrepreneurshipPosts" });

export { User, Post, SavedPosts, FavoritesPosts,LikedPosts, EntrepreneurshipModel,Media};
