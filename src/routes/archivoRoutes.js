import express from "express";
import * as archivoController from "../controllers/archivoController.js";

const router = express.Router();

// Ruta para obtener los archivos
router.get("/archivos", archivoController.getArchivos);

// Ruta para crear un archivo (con el middleware de Multer)
router.post(
  "/archivos",
  archivoController.uploadArchivo,
  archivoController.createArchivo
);

// Ruta para actualizar un archivo (con el middleware de Multer)
router.put(
  "/archivos/:id",
  archivoController.uploadArchivo,
  archivoController.updateArchivo
);

// Ruta para eliminar un archivo
router.delete("/archivos/:id", archivoController.deleteArchivo);

export default router;
