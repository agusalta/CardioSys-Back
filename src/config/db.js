import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

let isDemo = false;

// Inicializar la conexión
const initialize = (useDemo = false) => {
  const database = useDemo
    ? process.env.MYSQL_DATABASE_DEMO
    : process.env.MYSQL_DATABASE;

  const connectionConfig = {
    host: useDemo ? process.env.MYSQLHOST_DEMO : process.env.MYSQLHOST,
    user: useDemo ? process.env.MYSQLUSER_DEMO : process.env.MYSQLUSER,
    password: useDemo
      ? process.env.MYSQL_ROOT_PASSWORD_DEMO
      : process.env.MYSQL_ROOT_PASSWORD,
    database: database,
    port: useDemo ? process.env.MYSQLPORT_DEMO : process.env.MYSQL_PORT,
    charset: "utf8mb4",
    connectTimeout: 10000,
    enableKeepAlive: true,
  };

  // Crear la conexión
  const conn = mysql.createConnection(connectionConfig);

  const connectWithRetry = () => {
    conn.connect((err) => {
      if (err) {
        console.error(
          `☠️ Error al conectar a la base de datos ${database}:`,
          err.message
        );
        setTimeout(connectWithRetry, 5000);
        return;
      }
      console.log(`Conectado a la base de datos ${database} 🗿`);
    });
  };

  connectWithRetry();

  // Añadir listener para errores de conexión
  conn.on("error", (err) => {
    console.error(`☠️ Error en la conexión ${database}:`, err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
      console.log(`Reconectando a la base de datos ${database}...🚀`);
      conn.destroy();
      Object.assign(connection, initialize(useDemo));
    } else {
      throw err;
    }
  });

  return conn;
};

// Crear y exportar directamente el objeto connection
export const connection = initialize(isDemo);

// Función para cambiar al modo demo
export const setDemoMode = (useDemo) => {
  if (isDemo !== useDemo) {
    isDemo = useDemo;
    connection.destroy();
    Object.assign(connection, initialize(useDemo));
  }
  return connection;
};
