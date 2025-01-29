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
import configRoutes from "./routes/configRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
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
