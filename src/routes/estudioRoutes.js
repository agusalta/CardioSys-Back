// routes/estudioRoutes.js
import express from "express";
import {
  getAllEstudios,
  createNuevoEstudio,
  updateEstudio,
  deleteEstudio,
  getEstudiosByPacienteId,
} from "../controllers/estudioController.js";

const router = express.Router();

router.get("/", getAllEstudios); // Obtener todos los estudios
router.get("/:id", getEstudiosByPacienteId); // Obtener todos los estudios de un paciente
router.post("/", createNuevoEstudio); // Crear un nuevo estudio
router.put("/:id", updateEstudio); // Actualizar un estudio por ID
router.delete("/:id", deleteEstudio); // Eliminar un estudio por ID

export default router;
