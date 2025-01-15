// routes/costoEstudioRoutes.js
import express from "express";
import {
  getAllCostoEstudios,
  createNuevoCostoEstudio,
  updateCostoEstudio,
  deleteCostoEstudio,
} from "../controllers/costoEstudioController.js";

const router = express.Router();

router.get("/", getAllCostoEstudios); // Obtener todos los costos de estudio
router.post("/", createNuevoCostoEstudio); // Crear un nuevo costo de estudio
router.put("/:id", updateCostoEstudio); // Actualizar un costo de estudio por ID
router.delete("/:id", deleteCostoEstudio); // Eliminar un costo de estudio por ID

export default router;
