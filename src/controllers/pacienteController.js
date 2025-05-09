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
      ID_Paciente: results.insertId,
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

// Obtener el total de pacientes
export const getTotalPacientes = (req, res) => {
  pacienteModel.getTotalPacientes((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Obtener el total de pacientes nuevos este mes
export const getPacientesNuevosEsteMes = (req, res) => {
  pacienteModel.getPacientesNuevosEsteMes((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Actualizar un paciente
export const updatePaciente = (req, res) => {
  const { id } = req.params;
  const pacienteData = req.body;

  pacienteModel.updatePaciente(id, pacienteData, (err, results) => {
    if (err) {
      console.error("Error al actualizar paciente:", err);
      return res
        .status(500)
        .json({ error: "Error al actualizar el paciente", err });
    }

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

// Importar pacientes desde CSV
export const importPacientesFromCSV = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No se ha proporcionado ningún archivo CSV" });
  }

  const csvData = req.file.buffer.toString();
  const lines = csvData.split("\n");
  const headers = lines[0].split(",").map((header) => header.trim());

  // Validar headers requeridos
  const requiredHeaders = [
    "Nombre",
    "Apellido",
    "DNI",
    "Email",
    "Telefono",
    "FechaNacimiento",
    "Sexo",
  ];

  const missingHeaders = requiredHeaders.filter(
    (header) => !headers.includes(header)
  );

  if (missingHeaders.length > 0) {
    return res.status(400).json({
      error: "El archivo CSV no tiene el formato correcto",
      missingHeaders: missingHeaders,
    });
  }

  const pacientes = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Skip empty lines

    const values = lines[i].split(",").map((value) => value.trim());
    const paciente = {};

    headers.forEach((header, index) => {
      paciente[header] = values[index] || null;
    });

    pacientes.push(paciente);
  }

  pacienteModel.importPacientes(pacientes, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al importar los pacientes",
        details: err,
      });
    }

    res.status(201).json({
      message: "Proceso de importación completado",
      summary: {
        total: pacientes.length,
        success: results.success.length,
        errors: results.errors.length,
      },
      details: {
        success: results.success.map((item) => ({
          nombre: item.paciente.Nombre,
          apellido: item.paciente.Apellido,
          dni: item.paciente.DNI,
        })),
        errors: results.errors.map((item) => ({
          nombre: item.paciente.Nombre,
          apellido: item.paciente.Apellido,
          dni: item.paciente.DNI,
          error: item.error,
        })),
      },
    });
  });
};
