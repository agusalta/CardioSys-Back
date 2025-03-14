// controllers/tipoEstudioController.js
import * as tipoEstudioModel from "../models/tipoEstudioModel.js";

export const getAllTipoEstudios = (req, res) => {
  tipoEstudioModel.getTipoEstudios((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener tipos de estudio", details: err });
    }
    res.status(200).json(results);
  });
};

export const getTipoEstudioById = (req, res) => {
  const { id } = req.params;
  tipoEstudioModel.getTipoEstudioById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener el tipo de estudio por Id",
        details: err,
      });
    }
    res.status(200).json(results[0]);
  });
};

export const getEstudioMasRealizadoEnElMes = (req, res) => {
  tipoEstudioModel.getEstudioMasRealizadoEnElMes((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          error: "Error al obtener el estudio mas realizado",
          details: err,
        });
    }
    res.status(200).json(results);
  });
};

export const createNuevoTipoEstudio = (req, res) => {
  const tipoEstudioData = req.body;
  tipoEstudioModel.createTipoEstudio(tipoEstudioData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear tipo de estudio", details: err });
    }
    res
      .status(201)
      .json({ message: "Tipo de estudio creado exitosamente", data: results });
  });
};

export const updateTipoEstudio = (req, res) => {
  const { id } = req.params;
  const tipoEstudioData = req.body;
  tipoEstudioModel.updateTipoEstudio(id, tipoEstudioData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al actualizar tipo de estudio", details: err });
    }
    res
      .status(200)
      .json({ message: "Tipo de estudio actualizado exitosamente" });
  });
};

export const deleteTipoEstudio = (req, res) => {
  const { id } = req.params;
  tipoEstudioModel.deleteTipoEstudio(id, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar tipo de estudio", details: err });
    }
    res.status(200).json({ message: "Tipo de estudio eliminado exitosamente" });
  });
};
