// routes/tipoEstudioRoutes.js
import express from "express";
import {
  getAllTipoEstudios,
  createNuevoTipoEstudio,
  updateTipoEstudio,
  deleteTipoEstudio,
  getTipoEstudioById,
  getEstudioMasRealizadoEnElMes,
} from "../controllers/tipoEstudioController.js";

const router = express.Router();

router.get("/", getAllTipoEstudios); // Obtener todos los tipos de estudio
router.get("/:id", getTipoEstudioById); // Obtener un tipo de estudio por ID
router.get("/get/month", getEstudioMasRealizadoEnElMes); // Obtener el total de estudios realizados en el mes
router.post("/", createNuevoTipoEstudio); // Crear un nuevo tipo de estudio
router.put("/:id", updateTipoEstudio); // Actualizar un tipo de estudio por ID
router.delete("/:id", deleteTipoEstudio); // Eliminar un tipo de estudio por ID

export default router;
