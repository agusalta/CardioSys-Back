// models/costoEstudioModel.js
import { connection } from "../config/db.js";

export const getCostoEstudios = (callback) => {
  connection.query("SELECT * FROM costoestudio", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export const getCostoEstudioByIds = (ID_TipoEstudio, ID_Seguro, callback) => {
  connection.query(
    "SELECT Costo FROM costoestudio WHERE ID_TipoEstudio = ? AND ID_Seguro = ?",
    [ID_TipoEstudio, ID_Seguro],
    (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0].Costo);
    }
  );
};

export const createCostoEstudio = (data, callback) => {
  const { ID_TipoEstudio, ID_Seguro, Costo } = data;
  connection.query(
    "INSERT INTO costoestudio (ID_TipoEstudio, ID_Seguro, Costo) VALUES (?, ?, ?)",
    [ID_TipoEstudio, ID_Seguro, Costo],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const updateCostoEstudio = (
  ID_TipoEstudio,
  ID_Seguro,
  Costo,
  callback
) => {
  const query = `
    UPDATE costoestudio
    SET Costo = ?
    WHERE ID_TipoEstudio = ? AND ID_Seguro = ?
  `;
  connection.query(query, [Costo, ID_TipoEstudio, ID_Seguro], callback);
};

export const deleteCostoEstudio = (id, callback) => {
  connection.query(
    "DELETE FROM costoestudio WHERE ID_Costo = ?",
    [id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};
