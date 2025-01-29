import { connection } from "../config/db.js";

// Obtener todos los seguros
export const getSeguros = (callback) => {
  connection.query("SELECT * FROM seguro", (err, results) => {
    if (err) {
      console.error("Error al obtener seguros:", err);
      return callback(err);
    }
    callback(null, results);
  });
};

export const getEmpresasDePrepagas = (callback) => {
  connection.query("SELECT * FROM Empresas_Seguro", (err, results) => {
    if (err) {
      console.error("Error al obtener empresas de prepagos:", err);
      return callback(err);
    }
    callback(null, results);
  });
};

export const getEmpresaDePrepagaPorId = (id, callback) => {
  const query = "SELECT * FROM Empresas_Seguro WHERE ID_Empresa = ?";
  connection.query(query, [id], callback);
};

export const getCantSegurosPorPaciente = (callback) => {
  const query =
    "SELECT seguro.TipoSeguro AS Seguro, COUNT(paciente.ID_Paciente) AS NumeroDePacientes " +
    "FROM paciente " +
    "JOIN seguro ON paciente.ID_Seguro = seguro.ID_Seguro " +
    "GROUP BY seguro.TipoSeguro " +
    "ORDER BY NumeroDePacientes DESC;";
  connection.query(query, callback);
};

export const updateEmpresaDePrepaga = (id, data, callback) => {
  const { ID_Empresa, ID_Seguro } = data;
  if (!ID_Empresa || !ID_Seguro) {
    return callback(new Error("ID y ID_Empresa son requeridos"));
  }

  connection.query(
    "UPDATE Empresas_Seguro SET ID_Empresa = ? WHERE ID_Seguro = ?",
    [ID_Empresa, ID_Seguro],
    (err, results) => {
      if (err) {
        console.error(`Error al actualizar empresa ID ${id}:`, err);
        return callback(err);
      }
      callback(null, results);
    }
  );
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
