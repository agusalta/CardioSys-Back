import { connection } from "../config/db.js";

export const getEstudios = (callback) => {
  connection.query("SELECT * FROM Estudio", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export const getEstudioById = (IdEstudio, callback) => {
  connection.query(
    "SELECT * FROM Estudio WHERE ID_Estudio = ?",
    [IdEstudio],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const getEstudiosByPacienteId = (idPaciente, callback) => {
  connection.query(
    "SELECT * FROM Estudio WHERE ID_Paciente = ?",
    [idPaciente],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const createEstudio = (data, callback) => {
  const { Fecha, Asunto, Observacion, Factura, ID_Paciente, ID_TipoEstudio } =
    data;

  connection.query(
    "INSERT INTO Estudio (Fecha, Asunto, Observacion, Factura, ID_Paciente, ID_TipoEstudio) VALUES (?, ?, ?, ?, ?, ?)",
    [Fecha, Asunto, Observacion, Factura, ID_Paciente, ID_TipoEstudio],
    (err, results) => {
      if (err) return callback(err);
      console.log("Resultados de la consulta:", results);
      callback(null, results);
    }
  );
};

export const updateEstudio = (id, data, callback) => {
  const { Fecha, Asunto, Observacion, Factura, ID_Paciente, ID_TipoEstudio } =
    data;
  connection.query(
    "UPDATE Estudio SET Fecha = ?, Asunto = ?, Observacion = ?, Factura = ?, ID_Paciente = ?, ID_TipoEstudio = ? WHERE ID_Estudio = ?",
    [Fecha, Asunto, Observacion, Factura, ID_Paciente, ID_TipoEstudio, id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const deleteEstudio = (id, callback) => {
  // Primero elimina los archivos relacionados con el estudio
  connection.query("DELETE FROM Archivo WHERE ID_Estudio = ?", [id], (err) => {
    if (err) {
      console.error("Error al eliminar archivos relacionados:", err);
      return callback(err);
    }

    // Después elimina el estudio
    connection.query(
      "DELETE FROM Estudio WHERE ID_Estudio = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error("Error al eliminar el estudio:", err);
          return callback(err);
        }

        callback(null, results);
      }
    );
  });
};
