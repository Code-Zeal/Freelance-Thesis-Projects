
import { Media } from "../associations.js";
import removebg from "remove.bg";
import fs from 'fs';
import path from 'path';
export const DeleteFile = async (req, res) => {
  try {
    const { id } = req.query;
    
    if (id) {
      const media = await Media.findOne({where: {id: id}});
      if (media) {

        fs.unlink(media.filePath, async (err) => {
          if (err) {
            throw err;
          }
          
          const deletedMedia = await Media.destroy({where: {id: id}});
          if (deletedMedia) {
            return res.status(200).json(deletedMedia);
          }
        });
      } else {
        throw new Error("No se encontró el medio");
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
export const SaveFile = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  console.log(req);
  try {
    const { userId } = req.body;
    const file = req.file; 

    if (userId && file) {


      const savedMedia = await Media.create({
        userOwner: userId,
        name: file.originalname, // Agrega la extensión al nombre del archivo
        type: file.mimetype,
        filePath: file.path,
      });

      if (savedMedia) {
        return res.status(200).json(savedMedia.dataValues);
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

export const RemoveBg = async (req, res) => {
  const keys = [
    "hQVGj2AjUBUZXvvhxHfdxF3T",
    "cSnzcp3eZE9vZUxabD724x7t",
    "KvKajkRTiWd7qXDd76GKsrBt",
    `gVNBy3K33WiamfJocfngaKbc`,
    `YFQLZmWg2jGV9Uzpg6K7hGfn`,
    `aQJ1DEnQ5FbdzRNdSSkXULUb`,
    `mFQc7BZKLaQodmp839CWFVPP`,
    `4sULy72EbXRLiJKbGp3QgBsq`,
    `nGeYCWCB45iAcCqD5R4JR3JU`,
    `LY5sMj5N1HqmbiXqsmnzcyAs`,
    `44orN4EBf4cpHLACajN3RnC9`,
    "e5Pjy596NrkATqjLccKfKCff",
    `5CW84km1MkG8B3ZfTER6q12s`,
  ];
  try {
    const file = req.file; 
    console.log(file);
    if ( file) {
      const handleRemoveBg = async (keys, imagePath, i = 0) => {
        try {
          const result = await removebg.removeBackgroundFromImageFile({
            path: imagePath,
            apiKey: keys[i],
            size: "auto",
            type: "product",
          });
          if (i > 13) {
            alert("Insufficient credits");
            throw new Error("Insufficient credits");
          }
          console.log("se eliminó el fondo correctamente");
          return result;
        } catch (error) {
          if (error[0]?.title === "Insufficient credits") {
            console.log(`creditos insuficientes key${i}`);
            return handleRemoveBg(keys, imagePath, i + 1);
          } else {
            console.log(error);
            return error;
          }
        }
      };

      const result = await handleRemoveBg(keys, file.path);
      const response = { uri: `data:${file.type};base64,${result.base64Image}` }
      return res.status(200).json(result);
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const UpdateFile = async (req, res) => {
  try {
    const {  mediaId } = req.body; 
    const file = req.file;

    if (mediaId && file) {
      const media = await Media.findOne({ where: { id: mediaId } });

      if (!media) {
        throw new Error("Archivo no encontrado");
      }

      // Elimina el archivo antiguo
      fs.unlinkSync(media.filePath);

      // Actualiza el archivo
      media.name = file.originalname;
      media.type = file.mimetype;
      media.filePath = file.path;

      // Guarda los cambios en la base de datos
      const savedMedia = await media.save();

      if (savedMedia) {
        return res.status(200).json(savedMedia.dataValues);
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


export const GetDetails = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const file = await Media.findOne({ where: { id} });

      if (file) {
        return res.status(200).json(file.dataValues);
      } else {
        return res.status(404).send("Archivo no encontrado");
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
export const GetMyGallery = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    if (userId) {
      const gallery = await Media.findAll({ where: { userOwner: userId } });

      if (gallery && gallery.length > 0) {
        // Asegúrate de reemplazar 'http://localhost:3000' con la URL base de tu servidor
        const baseUrl = '{backend-url}';

        // Modifica cada objeto de medios para incluir la URL completa del archivo
        const galleryWithFullUrls = gallery.map(media => ({
          ...media.dataValues,
          filePath: `${baseUrl}${media.filePath}`
        }));

        return res.status(200).json(galleryWithFullUrls);
      } else {
        return res.status(404).send("Galería vacía");
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
