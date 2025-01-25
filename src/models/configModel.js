import { connection } from "../config/db.js";

export const getConfig = (callback) => {
  const query = "SELECT * FROM configuracion LIMIT 1";
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

export const updateConfig = (fontSize, callback) => {
  const query = `
        UPDATE configuracion 
        SET FontSize = ?, UpdatedAt = CURRENT_TIMESTAMP 
        WHERE ID_Config = 1`;
  connection.query(query, [fontSize], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

export const deleteConfig = (callback) => {
  const query = "DELETE FROM configuracion WHERE ID_Config = 1";
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

export const createConfig = (fontSize, callback) => {
  const query = `
        INSERT INTO configuracion (FontSize, UpdatedAt) 
        VALUES (?, CURRENT_TIMESTAMP)`;
  connection.query(query, [fontSize], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};
