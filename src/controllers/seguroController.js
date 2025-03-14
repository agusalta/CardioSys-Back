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

export const getSeguroById = (req, res) => {
  const { id } = req.params;
  seguroModel.getSeguroById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener el seguro" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Seguro no encontrado" });
    }
    res.status(200).json(results[0]);
  });
};

export const getEmpresasDePrepagas = (req, res) => {
  seguroModel.getEmpresasDePrepagas((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener empresas de prepagos" });
    }
    res.status(200).json(results);
  });
};

export const getCantSegurosPorPaciente = (req, res) => {
  seguroModel.getCantSegurosPorPaciente((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener cantidad de seguros por paciente" });
    }
    res.status(200).json(results);
  });
};

export const getEmpresaDePrepagaPorId = (req, res) => {
  const { id } = req.params;
  seguroModel.getEmpresaDePrepagaPorId(id, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener empresa de prepago por ID" });
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
