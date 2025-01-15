import { connection } from "../config/db.js";

export const getArchivos = (callback) => {
  connection.query("SELECT * FROM Archivo", callback);
};

export const createArchivo = (data, callback) => {
  const { Archivo, NombreArchivo, ID_Estudio } = data;

  const query =
    "INSERT INTO Archivo (Archivo, NombreArchivo, ID_Estudio) VALUES (?, ?, ?)";
  connection.query(query, [Archivo, NombreArchivo, ID_Estudio], callback);
};

export const updateArchivo = (id, data, callback) => {
  const { Archivo, NombreArchivo, ID_Estudio } = data;

  const query =
    "UPDATE Archivo SET Archivo = ?, NombreArchivo = ?, ID_Estudio = ? WHERE ID_Archivo = ?";
  connection.query(query, [Archivo, NombreArchivo, ID_Estudio, id], callback);
};

export const deleteArchivo = (id, callback) => {
  const query = "DELETE FROM Archivo WHERE ID_Archivo = ?";
  connection.query(query, [id], callback);
};
