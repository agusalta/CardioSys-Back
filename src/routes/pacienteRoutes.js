import express from "express";
import multer from "multer";
import {
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
  getTotalPacientes,
  getPacientesNuevosEsteMes,
  importPacientesFromCSV,
} from "../controllers/pacienteController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

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

// Importar pacientes desde CSV
router.post("/import", upload.single("file"), importPacientesFromCSV);

export default router;
