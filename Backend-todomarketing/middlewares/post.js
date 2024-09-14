import { v4 } from "uuid";
import { Post, EntrepreneurshipModel, User, SavedPosts, FavoritesPosts, LikedPosts, Media } from "../associations.js";

export const NewPost = async (req, res) => {
  try {
    const file = req.file; 
    console.log(file);
    const { title, description, media, entrepreneurshipId } = req.body;
    console.log(req.body);

    if (title && description && (media || file) && entrepreneurshipId) {
      let mediaUrl = media;
      const entrepreneurshipIdInt = parseInt(entrepreneurshipId, 10);
      if (isNaN(entrepreneurshipIdInt)) {
        return res.status(400).json({ message: "ID de emprendimiento inválido" });
      }
      // Si hay un archivo subido, guardarlo y obtener la URL
      if (file) {
        const savedMedia = await Media.create({
          userOwner: entrepreneurshipIdInt, // O el campo adecuado para tu caso
          name: file?.originalname,
          type: file?.mimetype,
          filePath: file?.path,
        });

        if (!savedMedia) {
          throw new Error("Error al guardar el archivo media");
        }

        mediaUrl = savedMedia?.filePath; // O la URL que desees guardar
      }

      const entrepreneurship = await EntrepreneurshipModel.findOne({
        where: { id: entrepreneurshipId },
      });

      const createdPost = await Post.create({
        title,
        description,
        media: media,
        url:"{backend-url}"+mediaUrl,
        entrepreneurship: entrepreneurshipId,
      });

      if (createdPost) {
        let postData = [];
        if (entrepreneurship.dataValues.posts) {
          postData = [
            ...entrepreneurship.dataValues.posts,
            createdPost.dataValues.id,
          ];
        } else {
          postData = [createdPost.dataValues.id];
        }

        const updatedEntrepreneurship = await entrepreneurship.update({
          posts: postData,
        });

        if (updatedEntrepreneurship) {
          return res.status(200).json(createdPost.dataValues);
        } else {
          console.log("Error al actualizar posts en emprendimiento");
          throw new Error("Error al actualizar posts en emprendimiento");
        }
      } else {
        console.log("Error al crear Post");
        throw new Error("Error al crear Post");
      }
    } else {
      console.log("Error en algunos campos");
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
export const RemoveSavedPost = async (req, res) => {
  try {
    const {userId, postId} = req.body
    if (userId, postId) {
      const restSavedPosts = await SavedPosts.destroy({ where: { userId,postId,UserId:userId,PostId:postId } });
      if (restSavedPosts) {
          return res.status(200).json(restSavedPosts);
        } 
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const RemoveFavoritePost = async (req, res) => {
  try {
    const {userId, postId} = req.body
    if (userId, postId) {
      const restSavedPosts = await FavoritesPosts.destroy({ where: { userId,postId,UserId:userId,PostId:postId } });
      if (restSavedPosts) {
          return res.status(200).json(restSavedPosts);
        } 
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const RemoveLikedPost = async (req, res) => {
  try {
    const {userId, postId} = req.body
    if (userId, postId) {
      const restSavedPosts = await LikedPosts.destroy({ where: { userId,postId,UserId:userId,PostId:postId } });
      if (restSavedPosts) {
          return res.status(200).json(restSavedPosts);
        } 
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const SavePost = async (req, res) => {
  try {
    const {userId, postId} = req.body
    if (userId, postId) {
      const savedPost = await SavedPosts.create({
        userId, postId,UserId:userId,PostId:postId
      });
      if (savedPost) {
          return res.status(200).json(savedPost.dataValues);
        } 
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const AddFavoritesPost = async (req, res) => {
  try {
    const {userId, postId} = req.body
    if (userId, postId) {
      const savedPost = await FavoritesPosts.create({
        userId, postId,UserId:userId,PostId:postId
      });
      if (savedPost) {
          return res.status(200).json(savedPost.dataValues);
        } 
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const AddCommentPost = async (req, res) => {
  try {
    const { userId, postId, comment } = req.body;

    if (!userId || !postId || !comment) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    const newComment = { userId, text: comment, date: new Date() };
    post.comments = post.comments ? [...post.comments, newComment] : [newComment];

    await post.save();

    return res.status(200).json(post.dataValues);

  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

export const AddLikedPost = async (req, res) => {
  try {
    const {userId, postId} = req.body
    if (userId, postId) {
      const savedPost = await LikedPosts.create({
        userId, postId,UserId:userId,PostId:postId
      });
      if (savedPost) {
          return res.status(200).json(savedPost.dataValues);
        } 
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const EditPost = async (req, res) => {
  try {
    const { id, title, description, media, url } = req.body;
    const updateFields = {};
    if (title) {
      updateFields.title = title;
    }
    if (url) {
      updateFields.url = url;
    }
    if (media) {
      updateFields.media = media;
    }
    if (description) {
      updateFields.description = description;
    }
    if (id) {
      const post = await Post.findOne({ where: { id } });
      const updatedPost = await post.update(updateFields);
      if (updatedPost) {
        return res.status(200).json(updatedPost.dataValues);
      } else {
        throw new Error("Error al modificar la publicación");
      }
    } else {
      throw new Error("id de la publicación requerida");
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

export const GetDetails = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const post = await Post.findOne({ where: { id } });

      if (post) {
        return res.status(200).json(post.dataValues);
      } else {
        return res.status(404).send("post no encontrados");
      }
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
export const GetMyPosts = async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findOne({ where: { id: userId } });
      const entrepreneurships = await EntrepreneurshipModel.findAll({
        where: { userOwner: user.dataValues.id },
      });
      let postIds = [];
      entrepreneurships.map((entrepreneurship) => {
        postIds = postIds.concat(entrepreneurship.dataValues.posts);
        return;
      });
      console.log(postIds);
      const posts = await Post.findAll({
        where: {
          id: postIds,
        },
      });

      if (posts && posts.length > 0) {
        return res.status(200).json({posts:posts,user:user});
      } else {
        return res.status(404).send("posts no encontrados");
      }
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const GetAllPosts = async (req, res) => {
  try {
    let posts = await Post.findAll();
    if (posts && posts.length > 0) {
      // Convertir los posts a JSON
      posts = posts.map(post => post.toJSON());

      // Para cada post, buscar el entrepreneurship correspondiente
      for (let post of posts) {
        const entrepreneurship = await EntrepreneurshipModel.findByPk(post.entrepreneurship);
        if (entrepreneurship) {
          post.entrepreneurshipData = entrepreneurship;

          // Buscar los datos del userOwner
          const userOwner = await User.findByPk(entrepreneurship.userOwner);
          if (userOwner) {
            post.userData = userOwner.dataValues;
          }
        }

        // Para cada comentario en el post, buscar los datos del usuario
        if (post.comments && post.comments.length > 0) {
          for (let comment of post.comments) {
            const userComment = await User.findByPk(comment.userId);
            if (userComment) {
              comment.userData = userComment.dataValues;
            }
          }
        }
      }

      return res.status(200).json(posts);
    } else {
      return res.status(404).send("No existen posts");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};


export const DeletePost = async (req, res) => {
  try {
    const { postId, entrepreneurshipId } = req.body;
    if ((postId, entrepreneurshipId)) {
      const postDeleted = await Post.destroy({ where: { id: postId } });
      if (postDeleted) {
        const entrepreneurship = await EntrepreneurshipModel.findOne({
          where: { id: entrepreneurshipId },
        });
        let postIds = entrepreneurship.dataValues.posts.filter(
          (post) => post !== postId
        );
        const updatedEntrepreneurship = await entrepreneurship.update({
          posts: postIds,
        });
        if (updatedEntrepreneurship) {
          return res.status(200).json(postDeleted);
        } else {
          throw new Error("Error al actualizar posts de emprendimiento");
        }
      } else {
        throw new Error("Error al eliminar post");
      }
    } else {
      throw new Error("se requiere id del post e id del emprendimiento");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
