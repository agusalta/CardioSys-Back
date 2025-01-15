import * as seguroModel from "../models/seguroModel.js";

export const getAllSeguros = (req, res) => {
  seguroModel.getSeguros((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener seguros", details: err });
    }
    res.status(200).json(results);
  });
};

export const createNuevoSeguro = (req, res) => {
  const seguroData = req.body;
  seguroModel.createSeguro(seguroData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear seguro", details: err });
    }
    res
      .status(201)
      .json({ message: "Seguro creado exitosamente", data: results });
  });
};

export const updateSeguro = (req, res) => {
  const { id } = req.params;
  const seguroData = req.body;
  seguroModel.updateSeguro(id, seguroData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al actualizar seguro", details: err });
    }
    res.status(200).json({ message: "Seguro actualizado exitosamente" });
  });
};

export const deleteSeguro = (req, res) => {
  const { id } = req.params;
  seguroModel.deleteSeguro(id, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar seguro", details: err });
    }
    res.status(200).json({ message: "Seguro eliminado exitosamente" });
  });
};
