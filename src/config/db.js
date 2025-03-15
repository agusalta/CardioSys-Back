import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

// Variable para controlar el modo demo
let isDemo = false;
let connection = null;

// Inicializar la conexión
const initialize = (demoMode) => {
  const database = demoMode
    ? process.env.MYSQL_DATABASE_DEMO
    : process.env.MYSQL_DATABASE;

  const connectionConfig = {
    host: demoMode ? process.env.MYSQLHOST_DEMO : process.env.MYSQLHOST,
    user: demoMode ? process.env.MYSQLUSER_DEMO : process.env.MYSQLUSER,
    password: demoMode
      ? process.env.MYSQL_ROOT_PASSWORD_DEMO
      : process.env.MYSQL_ROOT_PASSWORD,
    database: database,
    port: demoMode ? process.env.MYSQLPORT_DEMO : process.env.MYSQLPORT,
    charset: "utf8mb4",
    connectTimeout: 10000,
    waitForConnections: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    connectionLimit: 10,
    queueLimit: 0,
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
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNRESET" ||
      err.code === "ER_NET_READ_ERROR"
    ) {
      console.log(`Reconectando a la base de datos ${database}...🚀`);
      // Better reconnection strategy
      setTimeout(() => {
        connection = initialize(isDemo);
      }, 2000);
    } else {
      console.error("Error fatal en la conexión de BD:", err);
      // Log but don't throw to prevent app crash
    }
  });

  return conn;
};

// Inicializar la conexión por primera vez
connection = initialize(isDemo);

// Función getter para obtener el valor actual de isDemo
export const isDemoMode = () => isDemo;

// Función para cambiar al modo demo
export const setDemoMode = (useDemo) => {
  if (isDemo !== useDemo) {
    isDemo = useDemo;
    if (connection) {
      connection.end(); // Close connection properly
    }
    connection = initialize(isDemo);
  }
  return connection;
};

// Exportar la conexión
export { connection };
