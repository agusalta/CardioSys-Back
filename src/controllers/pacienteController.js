import * as pacienteModel from "../models/pacienteModel.js";

// Crear un nuevo paciente
export const createPaciente = (req, res) => {
  const pacienteData = req.body;

  pacienteModel.createPaciente(pacienteData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear el paciente", details: err });
    }
    res.status(201).json({
      message: "Paciente creado exitosamente",
      insertId: results.insertId,
    });
  });
};

// Obtener todos los pacientes
export const getAllPacientes = (req, res) => {
  pacienteModel.getAllPacientes((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los pacientes" });
    }
    res.status(200).json(results);
  });
};

// Obtener un paciente por ID
export const getPacienteById = (req, res) => {
  const { id } = req.params;
  pacienteModel.getPacienteById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener el paciente" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.status(200).json(results[0]);
  });
};

// Actualizar un paciente
export const updatePaciente = (req, res) => {
  const { id } = req.params;
  const pacienteData = req.body;

  console.log("ID recibido para actualización:", id);
  console.log("Datos del paciente a actualizar:", pacienteData);

  pacienteModel.updatePaciente(id, pacienteData, (err, results) => {
    if (err) {
      console.error("Error al actualizar paciente:", err);
      return res
        .status(500)
        .json({ error: "Error al actualizar el paciente", err });
    }

    console.log("Resultados de la actualización:", results);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.status(200).json({ message: "Paciente actualizado correctamente" });
  });
};

// Eliminar un paciente
export const deletePaciente = (req, res) => {
  const { id } = req.params;
  pacienteModel.deletePaciente(id, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar el paciente:" + err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.status(200).json({ message: "Paciente eliminado correctamente" });
  });
};
