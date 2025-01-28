import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

const createConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    charset: "utf8mb4",
  });

  console.log("USER", process.env.MYSQLUSER);
  console.log("PASS", process.env.MYSQL_ROOT_PASSWORD);
  console.log("HOST", process.env.MYSQLHOST);
  console.log("PORT", process.env.MYSQL_URL || 3306);
  console.log("DB", process.env.MYSQL_DATABASE);

  connection.connect((err) => {
    if (err) {
      if (err.code === "ETIMEDOUT") {
        console.error(err.message);
      } else if (err.code === "ECONNREFUSED") {
        console.error(err.message);
      } else {
        console.error("Error desconocido de conexión: ", err.message);
      }
      return;
    }
    console.log("Conectado a la base de datos");
  });

  return connection;
};

let connection = createConnection();

export { createConnection, connection };
