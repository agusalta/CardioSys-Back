import * as archivoModel from "../models/archivoModel.js";
import multer from "multer";

// Configuración de Multer para manejar el almacenamiento en memoria
const storage = multer.memoryStorage();

// Configuración de Multer con límite de tamaño de archivo (10 MB) y tipo de archivo
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño de archivo (10 MB)
}).single("Archivo");

// Obtener archivos
export const getArchivos = (req, res) => {
  archivoModel.getArchivos((err, results) => {
    if (err) {
      console.error("Error al obtener los archivos:", err);
      return res.status(500).json({
        error: "Error al obtener los archivos",
        details: err.message,
      });
    }
    res.status(200).json(results);
  });
};

// Obtener archivos de un estudio, sin blob
export const getArchivosByEstudioId = (req, res) => {
  const { id } = req.params;

  archivoModel.getArchivosByEstudioId(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener archivos por ID de estudio: " + err.message,
        details: err,
      });
    }
    res.status(200).json(results);
  });
};

// Obtener un archivo entero
export const getArchivoContentById = (req, res) => {
  const { id } = req.params;

  archivoModel.getArchivoContentById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener archivos por ID de estudio: " + err.message,
        details: err,
      });
    }
    res.status(200).json(results);
  });
};

// Crear archivo
export const createArchivo = (req, res) => {
  // Verificar si se recibió un archivo
  if (!req.file) {
    return res.status(400).json({ error: "Se requiere un archivo" });
  }

  const { ID_Estudio } = req.body;
  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;

  // Verificar que se haya proporcionado un ID_Estudio
  if (!ID_Estudio) {
    return res.status(400).json({ error: "Falta el ID_Estudio" });
  }

  archivoModel.createArchivo(
    { Archivo: fileBuffer, NombreArchivo: fileName, ID_Estudio },
    (err, results) => {
      if (err) {
        console.error("Error al crear el archivo:", err);
        return res.status(500).json({
          error: "Error al crear el archivo",
          details: err.message,
        });
      }
      res.status(201).json({
        message: "Archivo creado correctamente",
        archivoId: results.insertId,
      });
    }
  );
};

// Actualizar archivo
export const updateArchivo = (req, res) => {
  const { id } = req.params;
  const { ID_Estudio, NombreArchivo } = req.body;

  // Verificar que los campos esenciales estén presentes
  if (!ID_Estudio || !NombreArchivo) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  let fileBuffer = null;
  let fileName = null;

  // Si se proporciona un archivo, lo procesamos
  if (req.file) {
    fileBuffer = req.file.buffer;
    fileName = req.file.originalname;
  }

  archivoModel.updateArchivo(
    id,
    { Archivo: fileBuffer, NombreArchivo: fileName, ID_Estudio },
    (err, results) => {
      if (err) {
        console.error("Error al actualizar el archivo:", err);
        return res.status(500).json({
          error: "Error al actualizar el archivo",
          details: err.message,
        });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Archivo no encontrado" });
      }
      res.status(200).json({ message: "Archivo actualizado correctamente" });
    }
  );
};

// Eliminar archivo
export const deleteArchivo = (req, res) => {
  const { id } = req.params;

  archivoModel.deleteArchivo(id, (err, results) => {
    if (err) {
      console.error("Error al eliminar el archivo:", err);
      return res
        .status(500)
        .json({ error: "Error al eliminar el archivo", details: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }
    res.status(200).json({ message: "Archivo eliminado correctamente" });
  });
};

// Middleware para subir el archivo
export const uploadArchivo = upload;
