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
    enableKeepAlive: true,
  });

  const connectWithRetry = () => {
    connection.connect((err) => {
      if (err) {
        console.error("☠️ Error al conectar a la base de datos:", err.message);
        setTimeout(connectWithRetry, 5000); // Reintentar después de 5 segundos
        return;
      }
      console.log("Conectado a la base de datos 🗿");
    });
  };

  connectWithRetry();

  connection.on("error", (err) => {
    console.error("☠️ Error en la conexión:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
      console.log("Reconectando...🚀");
      connection.destroy();
      connection = createConnection();
    } else {
      throw err;
    }
  });

  return connection;
};

let connection = createConnection();

export { connection };
