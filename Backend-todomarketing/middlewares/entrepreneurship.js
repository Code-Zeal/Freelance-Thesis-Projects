import { v4 } from "uuid";
import { EntrepreneurshipModel, User } from "../associations.js";

export const NewEntrepreneurship = async (req, res) => {
  try {
    const { name, description, delivery, userOwner } = req.body;
    if (name && delivery && userOwner) {
      const newEntrepreneurship = await EntrepreneurshipModel.create({
        name,
        description,
        delivery,
        userOwner,
      });

      if (newEntrepreneurship) {
        return res.status(200).json(newEntrepreneurship.dataValues);
      } else {
        throw new Error("Error al crear emprendimiento");
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

export const NewBranch = async (req, res) => {
  try {
    const { name, cellphone, rif, socialMedias, location, entrepreneurshipId } =
      req.body;
    if (name && rif && location && entrepreneurshipId) {
      const entrepreneurship = await EntrepreneurshipModel.findOne({
        where: { id: entrepreneurshipId },
      });
      let branch = [];
      if (entrepreneurship.dataValues.branches) {
        branch = [
          ...entrepreneurship.dataValues.branches,
          { id: v4(), name, cellphone, rif, socialMedias, location },
        ];
      } else {
        branch = [{ id: v4(), name, cellphone, rif, socialMedias, location }];
      }
      const updatedEntrepreneurship = await entrepreneurship.update({
        branches: branch,
      });

      if (updatedEntrepreneurship) {
        return res.status(200).json(updatedEntrepreneurship.dataValues);
      } else {
        throw new Error("Error al crear Branch");
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

export const GetBranch = async (req, res) => {
  try {
    const { entrepreneurshipId, branchId } = req.body;
    if (branchId && entrepreneurshipId) {
      const entrepreneurship = await EntrepreneurshipModel.findOne({
        where: { id: entrepreneurshipId },
      });
      const branches = entrepreneurship.dataValues.branches;
      const foundBranch = branches.find((branchO) => {
        return branchO.id === branchId;
      });
      if (foundBranch) {
        return res.status(200).json(foundBranch);
      } else {
        throw new Error("Sucursal no encontrada");
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

export const GetEntrepreneurship = async (req, res) => {
  try {
    const { entrepreneurshipId } = req.query;
    if (entrepreneurshipId) {
      const entrepreneurship = await EntrepreneurshipModel.findOne({
        where: { id: entrepreneurshipId },
      });

      if (entrepreneurship) {
        return res.status(200).json(entrepreneurship.dataValues);
      } else {
        throw new Error("Emprendimiento no encontrado");
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
export const GetMyBranches = async (req, res) => {
  try {
    const { userOwner } = req.body;
    if (userOwner) {
      const entrepreneurships = await EntrepreneurshipModel.findAll({
        where: { userOwner },
      });
      const branches = entrepreneurships.map((entrepreneurship) => {
        return {
          id: entrepreneurship.id,
          name: entrepreneurship.name,
          branches: entrepreneurship.branches,
        };
      });
      if (branches && branches.length > 0) {
        return res.status(200).json(branches);
      } else {
        return res.status(404).send("Sucursales no encontradas");
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
export const GetMyEntrepreneurships = async (req, res) => {
  try {
    const { userOwner } = req.query;
    if (userOwner) {
      const entrepreneurships = await EntrepreneurshipModel.findAll({
        where: { userOwner },
      });

      if (entrepreneurships && entrepreneurships.length > 0) {
        return res.status(200).json(entrepreneurships);
      } else {
        return res.status(404).send("Emprendimientos no encontrados");
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
export const GetAllEntrepreneurships = async (req, res) => {
  try {
    const entrepreneurships = await EntrepreneurshipModel.findAll({
      include: [
        {
          model: User,
        }
      ]
    });

    if (entrepreneurships && entrepreneurships.length > 0) {
      return res.status(200).json(entrepreneurships);
    } else {
      return res.status(404).send("No existen emprendimientos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
export const EditMyEntrepreneurship = async (req, res) => {
  try {
    const { id, name, description, delivery } = req.body;
    const updateFields = {};
    if (delivery) {
      updateFields.delivery = delivery;
    }
    if (name) {
      updateFields.name = name;
    }
    if (description) {
      updateFields.description = description;
    }
    if (id) {
      const entrepreneurship = await EntrepreneurshipModel.findOne({
        where: { id },
      });
      const updatedEntrepreneurship = await entrepreneurship.update(
        updateFields
      );
      if (updatedEntrepreneurship) {
        return res.status(200).json(updatedEntrepreneurship.dataValues);
      } else {
        throw new Error("Error al modificar el emprendimiento");
      }
    } else {
      throw new Error("id de emprendimiento requerido");
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

export const editMyBranch = async (req, res) => {
  try {
    const {
      branchId,
      entrepreneurshipId,
      name,
      rif,
      location,
      cellphone,
      socialMedias,
    } = req.body;
    const updateFields = { id: branchId };
    if (socialMedias) {
      updateFields.socialMedias = socialMedias;
    }
    if (cellphone) {
      updateFields.cellphone = cellphone;
    }
    if (location) {
      updateFields.location = location;
    }
    if (rif) {
      updateFields.rif = rif;
    }
    if (name) {
      updateFields.name = name;
    }
    if (entrepreneurshipId && branchId) {
      const entrepreneurship = await EntrepreneurshipModel.findOne({
        where: { id: entrepreneurshipId },
      });
      const branchToModify = entrepreneurship.dataValues.branches.find(
        (branch) => {
          return branch.id === branchId;
        }
      );
      const branches = entrepreneurship.dataValues.branches.filter((branch) => {
        return branch.id !== branchId;
      });
      let updatedBranchesData = [];
      if (branches) {
        updatedBranchesData = [
          ...branches,
          { ...branchToModify, ...updateFields },
        ];
      } else {
        updatedBranchesData = [{ ...branchToModify, ...updateFields }];
      }
      const updatedBranches = await entrepreneurship.update({
        branches: updatedBranchesData,
      });
      if (updatedBranches) {
        return res.status(200).json(updatedBranches.dataValues);
      } else {
        throw new Error("Error al modificar la sucursal");
      }
    } else {
      throw new Error("id de emprendimiento y sucursal requeridos");
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error });
  }
};
