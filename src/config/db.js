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
    connectTimeout: 10000,
  });

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
  });

  return connection;
};

let connection = createConnection();

export { createConnection, connection };
