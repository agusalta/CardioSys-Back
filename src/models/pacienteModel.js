import { connection } from "../config/db.js";

// Crear un nuevo paciente
export const createPaciente = (pacienteData, callback) => {
  const {
    ID_Seguro,
    Nombre,
    DNI,
    Apellido,
    Email,
    Telefono,
    FechaNacimiento,
    Altura,
    Peso,
    FrecuenciaCardiaca,
    FrecuenciaRespiratoria,
    Sexo,
  } = pacienteData;

  const query = `
    INSERT INTO Paciente 
    (ID_Seguro, Nombre, DNI, Apellido, Email, Telefono, FechaNacimiento, Altura, Peso, FrecuenciaCardiaca, FrecuenciaRespiratoria, Sexo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      ID_Seguro,
      Nombre,
      DNI,
      Apellido,
      Email,
      Telefono,
      FechaNacimiento,
      Altura,
      Peso,
      FrecuenciaCardiaca,
      FrecuenciaRespiratoria,
      Sexo,
    ],
    callback
  );
};

// Obtener todos los pacientes
export const getAllPacientes = (callback) => {
  const query = "SELECT * FROM Paciente";
  connection.query(query, callback);
};

// Obtener un paciente por ID
export const getPacienteById = (id, callback) => {
  const query = "SELECT * FROM Paciente WHERE ID_Paciente = ?";
  connection.query(query, [id], callback);
};

// Actualizar un paciente
export const updatePaciente = (id, pacienteData, callback) => {
  const {
    ID_Seguro,
    Nombre,
    DNI,
    Apellido,
    Email,
    Telefono,
    FechaNacimiento,
    Altura,
    Peso,
    FrecuenciaCardiaca,
    FrecuenciaRespiratoria,
    Sexo,
  } = pacienteData;
  const query = `
    UPDATE Paciente 
    SET 
      ID_Seguro = ?, Nombre = ?, DNI = ?, Apellido = ?, Email = ?, Telefono = ?, FechaNacimiento = ?, 
      Altura = ?, Peso = ?, FrecuenciaCardiaca = ?, FrecuenciaRespiratoria = ?, Sexo = ?
    WHERE ID_Paciente = ?
  `;
  connection.query(
    query,
    [
      ID_Seguro,
      Nombre,
      DNI,
      Apellido,
      Email,
      Telefono,
      FechaNacimiento,
      Altura,
      Peso,
      FrecuenciaCardiaca,
      FrecuenciaRespiratoria,
      Sexo,
      id,
    ],
    callback
  );
};

export const deletePaciente = (id, callback) => {
  const deleteEstudiosQuery = "DELETE FROM Estudio WHERE ID_Paciente = ?";
  connection.query(deleteEstudiosQuery, [id], (err) => {
    if (err) {
      return callback(err);
    }

    const deletePacienteQuery = "DELETE FROM Paciente WHERE ID_Paciente = ?";
    connection.query(deletePacienteQuery, [id], callback);
  });
};
