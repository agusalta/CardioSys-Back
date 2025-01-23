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

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/seguro", seguroRoutes);
app.use("/api/archivo", archivoRoutes);
app.use("/api/estudio", estudioRoutes);
app.use("/api/costoEstudio", costoEstudioRoutes);
app.use("/api/tipoEstudio", tipoEstudioRoutes);
app.use("/api/activity", activityRoutes);

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Cuando estamos testeando hay que comentar el port porque jest corre el servidor por su cuenta

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Cuando estamos testeando hay que comentar la linea 33 porque jest no entiende type modules

// module.exports = app;
export default app;
