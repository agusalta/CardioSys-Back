// routes/tipoEstudioRoutes.js
import express from "express";
import {
  getAllTipoEstudios,
  createNuevoTipoEstudio,
  updateTipoEstudio,
  deleteTipoEstudio,
  getTipoEstudioById,
} from "../controllers/tipoEstudioController.js";

const router = express.Router();

router.get("/", getAllTipoEstudios); // Obtener todos los tipos de estudio
router.get("/:id", getTipoEstudioById); // Obtener un tipo de estudio por ID
router.post("/", createNuevoTipoEstudio); // Crear un nuevo tipo de estudio
router.put("/:id", updateTipoEstudio); // Actualizar un tipo de estudio por ID
router.delete("/:id", deleteTipoEstudio); // Eliminar un tipo de estudio por ID

export default router;
