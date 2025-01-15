import express from "express";
import {
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
} from "../controllers/pacienteController.js";

const router = express.Router();

// Crear un nuevo paciente
router.post("/", createPaciente);

// Obtener todos los pacientes
router.get("/", getAllPacientes);

// Obtener un paciente por ID
router.get("/:id", getPacienteById);

// Actualizar un paciente por ID
router.put("/:id", updatePaciente);

// Eliminar un paciente por ID
router.delete("/:id", deletePaciente);

export default router;
