// routes/estudioRoutes.js
import express from "express";
import {
  getAllEstudios,
  createNuevoEstudio,
  updateEstudio,
  deleteEstudio,
} from "../controllers/estudioController.js";

const router = express.Router();

router.get("/", getAllEstudios); // Obtener todos los estudios
router.post("/", createNuevoEstudio); // Crear un nuevo estudio
router.put("/:id", updateEstudio); // Actualizar un estudio por ID
router.delete("/:id", deleteEstudio); // Eliminar un estudio por ID

export default router;
