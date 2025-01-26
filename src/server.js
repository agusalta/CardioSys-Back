import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import seguroRoutes from "./routes/seguroRoutes.js";
import archivoRoutes from "./routes/archivoRoutes.js";
import estudioRoutes from "./routes/estudioRoutes.js";
import costoEstudioRoutes from "./routes/costoEstudioRoutes.js";
import tipoEstudioRoutes from "./routes/tipoEstudioRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import configRoutes from "./routes/ConfigRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Configuración de CORS con credenciales habilitadas
app.use(
  cors({
    origin: "http://localhost:3001", // Asegúrate de que el frontend esté corriendo en este puerto
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Permitir el envío de cookies y credenciales
  })
);

// Rutas
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/seguro", seguroRoutes);
app.use("/api/archivo", archivoRoutes);
app.use("/api/estudio", estudioRoutes);
app.use("/api/costoEstudio", costoEstudioRoutes);
app.use("/api/tipoEstudio", tipoEstudioRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/config", configRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
