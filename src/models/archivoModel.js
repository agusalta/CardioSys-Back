import { connection } from "../config/db.js";

export const getArchivos = (callback) => {
  const query = "SELECT * FROM Archivo";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener archivos:", err.message);
      return callback(err);
    }
    callback(null, results);
  });
};

// Obtener metadatos de los archivos del paciente
export const getArchivosByEstudioId = (idEstudio, callback) => {
  connection.query(
    "SELECT ID_Archivo, NombreArchivo, Fecha_Subida FROM Archivo WHERE ID_Estudio = ?",
    [idEstudio],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

// Obtener el contenido del archivo cuando sea necesario
export const getArchivoContentById = (idArchivo, callback) => {
  connection.query(
    "SELECT * FROM Archivo WHERE ID_Archivo = ?",
    [idArchivo],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    }
  );
};

export const createArchivo = (data, callback) => {
  const { Archivo, NombreArchivo, ID_Estudio } = data;

  // Verificar que se proporcionaron los campos necesarios
  if (!Archivo || !NombreArchivo || !ID_Estudio) {
    const error = new Error("Faltan datos requeridos");
    console.error("Error al crear archivo:", error.message);
    return callback(error);
  }

  const query =
    "INSERT INTO Archivo (Archivo, NombreArchivo, ID_Estudio) VALUES (?, ?, ?)";

  connection.query(
    query,
    [Archivo, NombreArchivo, ID_Estudio],
    (err, results) => {
      if (err) {
        console.error("Error al crear archivo:", err.message);
        return callback(err);
      }
      callback(null, results);
    }
  );
};

export const updateArchivo = (id, data, callback) => {
  const { Archivo, NombreArchivo, ID_Estudio } = data;

  // Verificar que se proporcionaron los campos necesarios
  if (!Archivo || !NombreArchivo || !ID_Estudio) {
    const error = new Error("Faltan datos requeridos");
    console.error("Error al actualizar archivo:", error.message);
    return callback(error);
  }

  const query =
    "UPDATE Archivo SET Archivo = ?, NombreArchivo = ?, ID_Estudio = ? WHERE ID_Archivo = ?";

  connection.query(
    query,
    [Archivo, NombreArchivo, ID_Estudio, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar archivo:", err.message);
        return callback(err);
      }
      if (results.affectedRows === 0) {
        const error = new Error("Archivo no encontrado");
        console.error("Error al actualizar archivo:", error.message);
        return callback(error);
      }
      callback(null, results);
    }
  );
};

export const deleteArchivo = (id, callback) => {
  const query = "DELETE FROM Archivo WHERE ID_Archivo = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar archivo:", err.message);
      return callback(err);
    }
    if (results.affectedRows === 0) {
      const error = new Error("Archivo no encontrado");
      console.error("Error al eliminar archivo:", error.message);
      return callback(error);
    }
    callback(null, results);
  });
};
