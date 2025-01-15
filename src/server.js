import express from "express";
import dotenv from "dotenv";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import seguroRoutes from "./routes/seguroRoutes.js";
import archivoRoutes from "./routes/archivoRoutes.js";
import estudioRoutes from "./routes/estudioRoutes.js";
import costoEstudioRoutes from "./routes/costoEstudioRoutes.js";
import tipoEstudioRoutes from "./routes/tipoEstudioRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/seguro", seguroRoutes);
app.use("/api/archivo", archivoRoutes);
app.use("/api/estudio", estudioRoutes);
app.use("/api/costoEstudio", costoEstudioRoutes);
app.use("/api/tipoEstudio", tipoEstudioRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// module.exports = app;
export default app;
