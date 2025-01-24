import { connection } from "../config/db.js";

// Crear un nuevo paciente
export const createPaciente = (pacienteData, callback) => {
  const {
    ID_Seguro,
    ID_Empresa = null, // Por defecto, NULL si no se envía
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
    (ID_Seguro, ID_Empresa, Nombre, DNI, Apellido, Email, Telefono, FechaNacimiento, Altura, Peso, FrecuenciaCardiaca, FrecuenciaRespiratoria, Sexo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      ID_Seguro,
      ID_Empresa, // Puede ser NULL si no es prepaga
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

// Obtener el total de pacientes
export const getTotalPacientes = (callback) => {
  const query = "SELECT COUNT(*) AS total FROM Paciente";
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0].total);
  });
};

// Obtener el total de pacientes nuevos este mes
export const getPacientesNuevosEsteMes = (callback) => {
  const query =
    "SELECT COUNT(*) as total FROM paciente WHERE FechaCreacion >= CURDATE() - INTERVAL (DAY(CURDATE()) - 1) DAY AND FechaCreacion < CURDATE() + INTERVAL 1 DAY;";
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Actualizar un paciente
// Actualizar un paciente
export const updatePaciente = (id, pacienteData, callback) => {
  const {
    ID_Seguro,
    ID_Empresa = null, // Campo opcional para prepagas
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
      ID_Seguro = ?, 
      ID_Empresa = ?, 
      Nombre = ?, 
      DNI = ?, 
      Apellido = ?, 
      Email = ?, 
      Telefono = ?, 
      FechaNacimiento = ?, 
      Altura = ?, 
      Peso = ?, 
      FrecuenciaCardiaca = ?, 
      FrecuenciaRespiratoria = ?, 
      Sexo = ?
    WHERE ID_Paciente = ?
  `;

  connection.query(
    query,
    [
      ID_Seguro,
      ID_Empresa, // Se incluye el nuevo campo
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
