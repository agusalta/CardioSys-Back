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
  } = pacienteData;

  // Aseguramos que la fecha esté en el formato YYYY-MM-DD
  const fechaNacimientoFormateada = new Date(FechaNacimiento)
    .toISOString()
    .split("T")[0];

  const query = `
    INSERT INTO Paciente 
    (ID_Seguro, Nombre, DNI, Apellido, Email, Telefono, FechaNacimiento, Altura, Peso, FrecuenciaCardiaca, FrecuenciaRespiratoria) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      fechaNacimientoFormateada, // Usamos la fecha formateada
      Altura,
      Peso,
      FrecuenciaCardiaca,
      FrecuenciaRespiratoria,
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
  } = pacienteData;
  const query = `
    UPDATE Paciente 
    SET 
      ID_Seguro = ?, Nombre = ?, DNI = ?, Apellido = ?, Email = ?, Telefono = ?, FechaNacimiento = ?, 
      Altura = ?, Peso = ?, FrecuenciaCardiaca = ?, FrecuenciaRespiratoria = ?
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
      id,
    ],
    callback
  );
};

// Eliminar un paciente
export const deletePaciente = (id, callback) => {
  const query = "DELETE FROM Paciente WHERE ID_Paciente = ?";
  connection.query(query, [id], callback);
};
