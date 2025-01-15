// routes/tipoEstudioRoutes.js
import express from "express";
import {
  getAllTipoEstudios,
  createNuevoTipoEstudio,
  updateTipoEstudio,
  deleteTipoEstudio,
} from "../controllers/tipoEstudioController.js";

const router = express.Router();

router.get("/", getAllTipoEstudios); // Obtener todos los tipos de estudio
router.post("/", createNuevoTipoEstudio); // Crear un nuevo tipo de estudio
router.put("/:id", updateTipoEstudio); // Actualizar un tipo de estudio por ID
router.delete("/:id", deleteTipoEstudio); // Eliminar un tipo de estudio por ID

export default router;
