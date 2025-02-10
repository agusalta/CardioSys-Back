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

app.set("trust proxy", true);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Rutas
app.use("/pacientes", pacienteRoutes);
app.use("/seguro", seguroRoutes);
app.use("/archivo", archivoRoutes);
app.use("/estudio", estudioRoutes);
app.use("/costoEstudio", costoEstudioRoutes);
app.use("/tipoEstudio", tipoEstudioRoutes);
app.use("/activity", activityRoutes);
app.use("/config", configRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
