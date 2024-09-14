import { EntrepreneurshipModel, FavoritesPosts, LikedPosts, Post, SavedPosts, User } from "../associations.js";

export const GetInfo = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const usuario = await User.findOne({ where: { id } });

      if (usuario) {
        return res.status(200).json(usuario.dataValues);
      } else {
        throw new Error("Usuario no encontrado");
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

export const GetSavedPost = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const savedPosts = await SavedPosts.findAll({
        where: { userId: id, UserId: id },
      });

      if (savedPosts) {
        const postIds = savedPosts.map((post) => post.postId);
        const posts = await Post.findAll({ where: { id: postIds } });
        return res.status(200).json(posts);
      } else {
        return res.status(200).json([]);
      }
    } else {
      return res
        .status(404)
        .json({ message: "Error, campo id invalido: " + id });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const GetFavoritesPost = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const savedPosts = await FavoritesPosts.findAll({
        where: { userId: id, UserId: id },
      });

      if (savedPosts) {
        const postIds = savedPosts.map((post) => post.postId);
        const posts = await Post.findAll({ where: { id: postIds } });
        return res.status(200).json(posts);
      } else {
        return res.status(200).json([]);
      }
    } else {
      return res
        .status(404)
        .json({ message: "Error, campo id invalido: " + id });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const GetLikedPost = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const savedPosts = await LikedPosts.findAll({
        where: { userId: id, UserId: id },
      });

      if (savedPosts) {
        const postIds = savedPosts.map((post) => post.postId);
        const posts = await Post.findAll({ where: { id: postIds } });
        return res.status(200).json(posts);
      } else {
        return res.status(200).json([]);
      }
    } else {
      return res
        .status(404)
        .json({ message: "Error, campo id invalido: " + id });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};


export const UpdateInfo = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      password,
      cellphone,
      dni,
      followers,
      following,
      description,
      category,
      typeAccount,
      profileImage,
      coverImage,
      accountsFollowing,
      tutorialChat,
      tutorialProfile,
      youLikeTheApp
    } = req.body;
    const file = req.file
    const updateFields = {};
    if (accountsFollowing) {
      updateFields.accountsFollowing = accountsFollowing;
    }if (tutorialChat) {
      updateFields.tutorialChat = tutorialChat;
    }if (tutorialProfile) {
      updateFields.tutorialProfile = tutorialProfile;
    }if (youLikeTheApp) {
      updateFields.youLikeTheApp = youLikeTheApp;
    }
    if (profileImage) {
      updateFields.profileImage = file.path;
    }
    if (coverImage) {
      console.log(coverImage);
      console.log(file.path);
      updateFields.coverImage = file.path;
    }
    if (followers) {
      updateFields.followers = followers;
    }
    if (following) {
      updateFields.following = following;
    }
    if (description) {
      updateFields.description = description;
    }
    if (category) {
      updateFields.category = category;
    }
    if (name) {
      updateFields.name = name;
    }
    if (email) {
      updateFields.email = email;
    }
    if (password) {
      updateFields.password = password;
    }
    if (cellphone) {
      updateFields.cellphone = cellphone;
    }
    if (dni) {
      updateFields.dni = dni;
    }
    if (typeAccount) {
      updateFields.typeAccount = typeAccount;
    }
    if (id) {
      const usuario = await User.findOne({ where: { id } });
      const updatedUser = await usuario.update(updateFields);
      if (updatedUser) {
        return res.status(200).json(updatedUser.dataValues);
      } else {
        throw new Error("Error al crear la cuenta");
      }
    } else {
      throw new Error("id de Usuario requerido");
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

export const StartFollow = async (req, res) => {
  try {
    const { userId, entrepreneurshipId } = req.body;

    if (userId && entrepreneurshipId) {
  

      // Encontrar el dueño del emprendimiento
      const entrepreneurshipOwner = await User.findByPk(entrepreneurshipId);
      
      if (!entrepreneurshipOwner) {
        return res.status(404).json({ message: "Dueño del emprendimiento no encontrado" });
      }

      // Encontrar el usuario que desea seguir el emprendimiento
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar si el usuario ya está siguiendo el emprendimiento
      const accountsFollowing = user.accountsFollowing || [];
      console.log(accountsFollowing);
      console.log(entrepreneurshipId);
      
      
      if (accountsFollowing.some(account => account.entrepreneurshipId == entrepreneurshipId)) {
        return res.status(400).json({ message: "El usuario ya sigue este emprendimiento" });
      }

      // Incrementar el número de seguidores del emprendimiento
      entrepreneurshipOwner.followers = (entrepreneurshipOwner.followers || 0) + 1;
      await entrepreneurshipOwner.save();

      // Incrementar el número de cuentas que el usuario sigue
      user.following = (user.following || 0) + 1;

      // Actualizar el campo accountsFollowing del usuario
      const newFollow = { entrepreneurshipId, date: new Date() };
      user.accountsFollowing = [...accountsFollowing, newFollow];
      await entrepreneurshipOwner.save();
      await user.save();


      return res.status(200).json({ message: "Usuario ahora sigue al emprendimiento" });
    } else {
      return res.status(404).json({ message: "Error, campos inválidos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

export const StopFollowing = async (req, res) => {
  try {
    const { userId, entrepreneurshipId } = req.body;

    if (userId && entrepreneurshipId) {

      // Encontrar el dueño del emprendimiento
      const entrepreneurshipOwner = await User.findByPk(entrepreneurshipId);
      
      if (!entrepreneurshipOwner) {
        return res.status(404).json({ message: "Dueño del emprendimiento no encontrado" });
      }

      // Encontrar el usuario que desea dejar de seguir el emprendimiento
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar si el usuario está siguiendo el emprendimiento
      const accountsFollowing = user.accountsFollowing || [];
      
      if (!accountsFollowing.some(account => account.entrepreneurshipId == entrepreneurshipId)) {
        return res.status(400).json({ message: "El usuario no sigue este emprendimiento" });
      }

      // Decrementar el número de seguidores del emprendimiento
      entrepreneurshipOwner.followers = Math.max((entrepreneurshipOwner.followers || 0) - 1, 0);
      await entrepreneurshipOwner.save();

      // Decrementar el número de cuentas que el usuario sigue
      user.following = Math.max((user.following || 0) - 1, 0);

      // Actualizar el campo accountsFollowing del usuario
      user.accountsFollowing = accountsFollowing.filter(account => account.entrepreneurshipId != entrepreneurshipId);
      await user.save();

      return res.status(200).json({ message: "Usuario ha dejado de seguir el emprendimiento" });
    } else {
      return res.status(404).json({ message: "Error, campos inválidos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

export const ChangeTypeAccount = async (req, res) => {
  try {
    const {
      id,
      description,
      delivery,
      branches
    } = req.body;
    
    if (id) {
      let updateUser = {typeAccount:"entrepreneur"}
      const usuario = await User.findOne({ where: { id } });

      
      const createdEntrepreneurship = await EntrepreneurshipModel.create({
        name:usuario.dataValues.name,
        description,
        delivery,
        branches:JSON.parse(branches),
        createdAt:Date.now(),
        entrepreneurshipDate:Date.now(),
        userOwner:id
      })
      console.log(createdEntrepreneurship);
      
      updateUser.entrepreneurs = [createdEntrepreneurship?.dataValues?.id]
      const updatedUser = await usuario.update(updateUser);
      if (updatedUser && createdEntrepreneurship) {
        return res.status(200).json(updatedUser.dataValues);
      } else {
        throw new Error("Error al crear la cuenta");
      }
    } else {
      throw new Error("id de Usuario requerido");
    }
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Error del servidor", error });
  }
};
