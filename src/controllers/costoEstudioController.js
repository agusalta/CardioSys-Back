// controllers/costoEstudioController.js
import { error } from "console";
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

export const getCostoEstudioByIds = (req, res) => {
  const { ID_TipoEstudio, ID_Seguro } = req.body;

  if (!ID_TipoEstudio || !ID_Seguro) {
    return res.status(400).json({
      error:
        "Faltan datos requeridos: ID_TipoEstudio e ID_Seguro " + error.message,
    });
  }

  costoEstudioModel.getCostoEstudioByIds(
    ID_TipoEstudio,
    ID_Seguro,
    (err, costo) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al obtener costo de estudio", details: err });
      }

      res.status(200).json({ costo });
    }
  );
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
  const { ID_TipoEstudio, ID_Seguro, Costo } = req.body;

  // Validar que los datos estén presentes
  if (!ID_TipoEstudio || !ID_Seguro || Costo === undefined) {
    return res.status(400).json({
      error: "Faltan parámetros requeridos: ID_TipoEstudio, ID_Seguro y Costo",
    });
  }

  // Llamar al modelo para actualizar el costo
  costoEstudioModel.updateCostoEstudio(
    ID_TipoEstudio,
    ID_Seguro,
    Costo,
    (err, results) => {
      if (err) {
        console.error("Error al actualizar costo de estudio:", err);
        return res.status(500).json({
          error: "Error al actualizar el costo de estudio",
          details: err.message,
        });
      }

      res.status(200).json({
        message: "Costo de estudio actualizado exitosamente",
        updatedFields: {
          ID_TipoEstudio,
          ID_Seguro,
          Costo,
        },
        data: results,
      });
    }
  );
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
