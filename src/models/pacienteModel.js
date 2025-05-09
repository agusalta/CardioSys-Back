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
    INSERT INTO paciente 
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
  const query = "SELECT * FROM paciente ORDER BY FechaCreacion DESC";
  connection.query(query, callback);
};

// Obtener un paciente por ID
export const getPacienteById = (id, callback) => {
  const query = "SELECT * FROM paciente WHERE ID_Paciente = ?";
  connection.query(query, [id], callback);
};

// Obtener el total de pacientes
export const getTotalPacientes = (callback) => {
  const query = "SELECT COUNT(*) AS total FROM paciente";
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
    UPDATE paciente 
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
  const deleteEstudiosQuery = "DELETE FROM estudio WHERE ID_Paciente = ?";
  connection.query(deleteEstudiosQuery, [id], (err) => {
    if (err) {
      return callback(err);
    }

    const deletePacienteQuery = "DELETE FROM paciente WHERE ID_Paciente = ?";
    connection.query(deletePacienteQuery, [id], callback);
  });
};

// Importar múltiples pacientes
export const importPacientes = (pacientes, callback) => {
  const results = {
    success: [],
    errors: [],
  };

  // Función para procesar cada paciente individualmente
  const processPaciente = (paciente, index) => {
    return new Promise((resolve) => {
      // Primero verificamos si el DNI ya existe
      const checkQuery = "SELECT ID_Paciente FROM paciente WHERE DNI = ?";
      connection.query(checkQuery, [paciente.DNI], (err, existing) => {
        if (err) {
          results.errors.push({
            index,
            paciente,
            error: "Error al verificar DNI: " + err.message,
          });
          return resolve();
        }

        if (existing.length > 0) {
          results.errors.push({
            index,
            paciente,
            error: "DNI duplicado",
          });
          return resolve();
        }

        // Si no existe, procedemos a insertar
        const query = `
          INSERT INTO paciente 
          (Nombre, Apellido, DNI, Email, Telefono, FechaNacimiento, Sexo, Altura, Peso, FrecuenciaCardiaca, FrecuenciaRespiratoria) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          paciente.Nombre,
          paciente.Apellido,
          paciente.DNI,
          paciente.Email,
          paciente.Telefono,
          paciente.FechaNacimiento,
          paciente.Sexo,
          paciente.Altura || null,
          paciente.Peso || null,
          paciente.FrecuenciaCardiaca || null,
          paciente.FrecuenciaRespiratoria || null,
        ];

        connection.query(query, values, (err, result) => {
          if (err) {
            results.errors.push({
              index,
              paciente,
              error: "Error al insertar: " + err.message,
            });
          } else {
            results.success.push({
              index,
              paciente,
              id: result.insertId,
            });
          }
          resolve();
        });
      });
    });
  };

  // Procesar todos los pacientes en secuencia
  const processAllPacientes = async () => {
    for (let i = 0; i < pacientes.length; i++) {
      await processPaciente(pacientes[i], i);
    }
    callback(null, results);
  };

  processAllPacientes();
};
