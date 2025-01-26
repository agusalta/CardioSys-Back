import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

const createConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    charset: "utf8mb4",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error de conexión: ", err);
      return;
    }
    console.log("Conectado a la base de datos");
  });

  return connection;
};

let connection = createConnection();

export { createConnection, connection };
