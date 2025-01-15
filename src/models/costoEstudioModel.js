// models/costoEstudioModel.js
import { connection } from "../config/db.js";

export const getCostoEstudios = (callback) => {
  connection.query("SELECT * FROM CostoEstudio", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export const createCostoEstudio = (data, callback) => {
  const { ID_TipoEstudio, ID_Seguro, Costo } = data;
  connection.query(
    "INSERT INTO CostoEstudio (ID_TipoEstudio, ID_Seguro, Costo) VALUES (?, ?, ?)",
    [ID_TipoEstudio, ID_Seguro, Costo],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const updateCostoEstudio = (id, data, callback) => {
  const { ID_TipoEstudio, ID_Seguro, Costo } = data;
  connection.query(
    "UPDATE CostoEstudio SET ID_TipoEstudio = ?, ID_Seguro = ?, Costo = ? WHERE ID_Costo = ?",
    [ID_TipoEstudio, ID_Seguro, Costo, id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const deleteCostoEstudio = (id, callback) => {
  connection.query(
    "DELETE FROM CostoEstudio WHERE ID_Costo = ?",
    [id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};
