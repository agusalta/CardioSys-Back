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

export const getEstudiosMasRealizados = (req, res) => {
  estudioModel.getEstudiosMasRealizados((err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener estudios realizados",
        details: err,
      });
    }
    res.status(200).json(results);
  });
};

export const getEstudioByFechas = (req, res) => {
  const { FechaInicio, FechaFin } = req.body;
  estudioModel.getEstudioByFechas(FechaInicio, FechaFin, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener estudios por fechas",
        details: err,
      });
    }
    res.status(200).json(results);
  });
};

export const getTotalRecaudado = (req, res) => {
  estudioModel.getTotalRecaudado((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results[0] || 0);
  });
};

export const getEstudioById = (req, res) => {
  const { id } = req.params;

  estudioModel.getEstudioById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener estudios por ID de paciente",
        details: err,
      });
    }
    res.status(200).json(results[0]);
  });
};

export const createNuevoEstudio = (req, res) => {
  const estudioData = req.body;

  estudioModel.createEstudio(estudioData, (err, results) => {
    if (err) {
      console.error("Error al crear estudio:", err);
      return res
        .status(500)
        .json({ error: "Error al crear estudio", details: err });
    }

    if (results && results.insertId) {
      return res.status(201).json({
        message: "Estudio creado exitosamente",
        data: {
          ...estudioData,
          ID_Estudio: results.insertId,
        },
      });
    } else {
      return res.status(500).json({ error: "No se generó un ID válido" });
    }
  });
};

export const updateEstudio = (req, res) => {
  const { id } = req.params;

  const estudioData = req.body; // Primero asignamos el valor de req.body

  if (!estudioData || !estudioData.ID_Paciente || !estudioData.ID_TipoEstudio) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios del estudio" });
  }

  estudioModel.updateEstudio(id, estudioData, (err, results) => {
    if (err) {
      console.error("Error al actualizar el estudio:", err);
      return res
        .status(500)
        .json({ error: "Error al actualizar estudio", details: err });
    }
    res.status(200).json({ message: "Estudio actualizado exitosamente" });
  });
};

export const deleteEstudio = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID del estudio es inválido" });
  }

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
