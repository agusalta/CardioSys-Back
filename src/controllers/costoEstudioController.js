// controllers/costoEstudioController.js
import * as costoEstudioModel from "../models/costoEstudioModel.js";

export const getAllCostoEstudios = (req, res) => {
  costoEstudioModel.getCostoEstudios((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener costos de estudio", details: err });
    }
    res.status(200).json(results);
  });
};

export const createNuevoCostoEstudio = (req, res) => {
  const costoEstudioData = req.body;
  costoEstudioModel.createCostoEstudio(costoEstudioData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear costo de estudio", details: err });
    }
    res
      .status(201)
      .json({ message: "Costo de estudio creado exitosamente", data: results });
  });
};

export const updateCostoEstudio = (req, res) => {
  const { id } = req.params;
  const costoEstudioData = req.body;
  costoEstudioModel.updateCostoEstudio(id, costoEstudioData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al actualizar costo de estudio", details: err });
    }
    res
      .status(200)
      .json({ message: "Costo de estudio actualizado exitosamente" });
  });
};

export const deleteCostoEstudio = (req, res) => {
  const { id } = req.params;
  costoEstudioModel.deleteCostoEstudio(id, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar costo de estudio", details: err });
    }
    res
      .status(200)
      .json({ message: "Costo de estudio eliminado exitosamente" });
  });
};
