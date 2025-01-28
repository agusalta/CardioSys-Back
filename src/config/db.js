import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

// Función para hacer una pausa de 3 segundos
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createConnection = async () => {
  // Hacemos una pausa de 3 segundos antes de ejecutar la conexión
  await sleep(3000);

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

// Llamamos a createConnection de manera asíncrona
let connection = await createConnection();

export { createConnection, connection };
