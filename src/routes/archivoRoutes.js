import express from "express";
import * as archivoController from "../controllers/archivoController.js";

const router = express.Router();

// Ruta para obtener los archivos
router.get("/archivos", archivoController.getArchivos);

// Ruta para obtener los metadatos de los archivos de un estudio
router.get("/estudio/:id", archivoController.getArchivosByEstudioId);

// Ruta para obtener un archivo entero
router.get("/:id", archivoController.getArchivoContentById);

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
router.delete("/:id", archivoController.deleteArchivo);

export default router;
