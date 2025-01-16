import { connection } from "../config/db.js";

// Obtener todos los seguros
export const getSeguros = (callback) => {
  connection.query("SELECT * FROM Seguro", (err, results) => {
    if (err) {
      console.error("Error al obtener seguros:", err);
      return callback(err);
    }
    callback(null, results);
  });
};

export const getSeguroById = (id, callback) => {
  const query = "SELECT * FROM Seguro WHERE ID_Seguro = ?";
  connection.query(query, [id], callback);
};

// Crear un nuevo seguro
export const createSeguro = (data, callback) => {
  const { TipoSeguro } = data;
  if (!TipoSeguro) {
    return callback(new Error("TipoSeguro es requerido"));
  }

  connection.query(
    "INSERT INTO Seguro (TipoSeguro) VALUES (?)",
    [TipoSeguro],
    (err, results) => {
      if (err) {
        console.error("Error al crear seguro:", err);
        return callback(err);
      }
      callback(null, results);
    }
  );
};

// Actualizar un seguro existente
export const updateSeguro = (id, data, callback) => {
  const { TipoSeguro } = data;
  if (!TipoSeguro || !id) {
    return callback(new Error("ID y TipoSeguro son requeridos"));
  }

  connection.query(
    "UPDATE Seguro SET TipoSeguro = ? WHERE ID_Seguro = ?",
    [TipoSeguro, id],
    (err, results) => {
      if (err) {
        console.error(`Error al actualizar seguro ID ${id}:`, err);
        return callback(err);
      }
      callback(null, results);
    }
  );
};

// Eliminar un seguro
export const deleteSeguro = (id, callback) => {
  if (!id) {
    return callback(new Error("ID es requerido"));
  }

  connection.query(
    "DELETE FROM Seguro WHERE ID_Seguro = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error(`Error al eliminar seguro ID ${id}:`, err);
        return callback(err);
      }
      callback(null, results);
    }
  );
};
