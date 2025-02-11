// routes/estudioRoutes.js
import express from "express";
import {
  getAllEstudios,
  createNuevoEstudio,
  updateEstudio,
  deleteEstudio,
  getEstudiosByPacienteId,
  getEstudioById,
  getTotalRecaudado,
  getEstudioByFechas,
  getEstudiosMasRealizados,
} from "../controllers/estudioController.js";

const router = express.Router();

router.get("/", getAllEstudios); // Obtener todos los estudios
router.get("/:id", getEstudiosByPacienteId); // Obtener todos los estudios de un paciente
router.get("/get/realizados", getEstudiosMasRealizados); // Obtener todos los estudios mas realizados
router.get("/search/:id", getEstudioById); // Obtener un estudio por su ID
router.get("/get/count", getTotalRecaudado); // Obtener el total de estudios recibidos
router.get("/get/by/date", getEstudioByFechas); // Obtener estudios por fechas
router.post("/", createNuevoEstudio); // Crear un nuevo estudio
router.put("/:id", updateEstudio); // Actualizar un estudio por ID
router.delete("/:id", deleteEstudio); // Eliminar un estudio por ID

export default router;
