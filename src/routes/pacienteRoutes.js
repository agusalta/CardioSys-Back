import express from "express";
import {
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
  getTotalPacientes,
  getPacientesNuevosEsteMes,
} from "../controllers/pacienteController.js";

const router = express.Router();

// Crear un nuevo paciente
router.post("/", createPaciente);

// Obtener todos los pacientes
router.get("/", getAllPacientes);

// Obtener un paciente por ID
router.get("/:id", getPacienteById);

// Obtener el total de pacientes
router.get("/get/count", getTotalPacientes);

// Obtener el total de pacientes nuevos este mes
router.get("/get/month", getPacientesNuevosEsteMes);

// Actualizar un paciente por ID
router.put("/:id", updatePaciente);

// Eliminar un paciente por ID
router.delete("/:id", deletePaciente);

export default router;
