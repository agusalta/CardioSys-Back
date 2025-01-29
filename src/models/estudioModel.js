import { connection } from "../config/db.js";

export const getEstudios = (callback) => {
  connection.query("SELECT * FROM estudio", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export const getEstudioById = (IdEstudio, callback) => {
  connection.query(
    "SELECT * FROM estudio WHERE ID_Estudio = ?",
    [IdEstudio],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const getEstudiosByPacienteId = (idPaciente, callback) => {
  connection.query(
    "SELECT * FROM estudio WHERE ID_Paciente = ?",
    [idPaciente],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const getEstudioByFechas = (FechaInicio, FechaFin, callback) => {
  connection.query(
    "SELECT * FROM estudio WHERE Fecha >= ? AND Fecha < ?",
    [FechaInicio, FechaFin],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const getTotalRecaudado = (callback) => {
  connection.query(
    "SELECT SUM(Factura) AS totalRecaudado FROM estudio WHERE Factura > 0 AND Fecha >= CURDATE() - INTERVAL (DAY(CURDATE()) - 1) DAY AND Fecha < CURDATE() + INTERVAL 1 DAY;",
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
    "INSERT INTO estudio (Fecha, Asunto, Observacion, Factura, ID_Paciente, ID_TipoEstudio) VALUES (?, ?, ?, ?, ?, ?)",
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
    "UPDATE estudio SET Fecha = ?, Asunto = ?, Observacion = ?, Factura = ?, ID_Paciente = ?, ID_TipoEstudio = ? WHERE ID_Estudio = ?",
    [Fecha, Asunto, Observacion, Factura, ID_Paciente, ID_TipoEstudio, id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

export const deleteEstudio = (id, callback) => {
  // Primero elimina los archivos relacionados con el estudio
  connection.query("DELETE FROM archivo WHERE ID_Estudio = ?", [id], (err) => {
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
