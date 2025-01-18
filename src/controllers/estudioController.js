import * as estudioModel from "../models/estudioModel.js";

export const getAllEstudios = (req, res) => {
  estudioModel.getEstudios((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener estudios", details: err });
    }
    res.status(200).json(results);
  });
};

export const getEstudiosByPacienteId = (req, res) => {
  const { id } = req.params;
  estudioModel.getEstudiosByPacienteId(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener estudios por ID de paciente",
        details: err,
      });
    }
    res.status(200).json(results);
  });
};

export const createNuevoEstudio = (req, res) => {
  const estudioData = req.body;
  estudioModel.createEstudio(estudioData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear estudio", details: err });
    }
    res
      .status(201)
      .json({ message: "Estudio creado exitosamente", data: results });
  });
};

export const updateEstudio = (req, res) => {
  const { id } = req.params;
  const estudioData = req.body;
  estudioModel.updateEstudio(id, estudioData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al actualizar estudio", details: err });
    }
    res.status(200).json({ message: "Estudio actualizado exitosamente" });
  });
};

export const deleteEstudio = (req, res) => {
  const { id } = req.params;

  estudioModel.deleteEstudio(id, (err, results) => {
    if (err) {
      console.error("Error al eliminar el estudio:", err);
      return res
        .status(500)
        .json({ error: "Error al eliminar estudio", details: err.sqlMessage });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Estudio no encontrado" });
    }

    res.status(200).json({ message: "Estudio eliminado exitosamente" });
  });
};
