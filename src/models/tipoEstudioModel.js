// models/tipoEstudioModel.js
import { connection } from "../config/db.js";

export const getTipoEstudios = (callback) => {
  connection.query("SELECT * FROM TipoEstudio", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export const getTipoEstudioById = (idTipoEstudio, callback) => {
  connection.query(
    "SELECT * FROM TipoEstudio WHERE ID_TipoEstudio = ?",
    [idTipoEstudio],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const getEstudioMasRealizadoEnElMes = (callback) => {
  connection.query(
    "SELECT te.NombreEstudio, COUNT(e.ID_TipoEstudio) AS Cantidad FROM estudio e JOIN tipoestudio te ON e.ID_TipoEstudio = te.ID_TipoEstudio WHERE MONTH(e.Fecha) = MONTH(CURDATE()) AND YEAR(e.Fecha) = YEAR(CURDATE()) GROUP BY e.ID_TipoEstudio ORDER BY Cantidad DESC LIMIT 1;",
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const createTipoEstudio = (data, callback) => {
  const { NombreEstudio, Descripcion } = data;
  connection.query(
    "INSERT INTO TipoEstudio (NombreEstudio, Descripcion) VALUES (?, ?)",
    [NombreEstudio, Descripcion],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const updateTipoEstudio = (id, data, callback) => {
  const { NombreEstudio, Descripcion } = data;
  connection.query(
    "UPDATE TipoEstudio SET NombreEstudio = ?, Descripcion = ? WHERE ID_TipoEstudio = ?",
    [NombreEstudio, Descripcion, id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const deleteTipoEstudio = (id, callback) => {
  connection.query(
    "DELETE FROM TipoEstudio WHERE ID_TipoEstudio = ?",
    [id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};
