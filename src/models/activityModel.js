import { connection } from "../config/db.js";

export const getRecentActivity = (callback) => {
  const query =
    "SELECT 'Paciente' AS Tipo, ID_Paciente AS ID, DNI AS Paciente, CONCAT_WS(' ', Nombre, Apellido) AS Detalle, FechaCreacion AS Fecha FROM paciente WHERE FechaCreacion IS NOT NULL UNION SELECT 'Estudio' AS Tipo, e.ID_Estudio AS ID, p.DNI AS Paciente, t.NombreEstudio AS Estudio, e.Fecha AS Fecha FROM estudio e LEFT JOIN tipoestudio t ON e.ID_TipoEstudio = t.ID_TipoEstudio LEFT JOIN paciente p ON e.ID_Paciente = p.ID_Paciente WHERE e.Fecha IS NOT NULL ORDER BY Fecha DESC LIMIT 10;";
  connection.query(query, callback);
};
