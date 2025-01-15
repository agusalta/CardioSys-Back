import request from "supertest";
import app from "../src/server.js";

describe("Pruebas de API - Archivos", () => {
  let archivoId;

  test("Debería crear un archivo", async () => {
    const nuevoArchivo = {
      nombre: "Informe Médico",
      tipo: "PDF",
      contenido: "Contenido del informe",
    };

    const response = await request(app)
      .post("/api/archivos")
      .send(nuevoArchivo);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Archivo creado correctamente");
    expect(response.body.archivoId).toBeDefined();
    archivoId = response.body.archivoId;
  });

  test("Debería actualizar el archivo", async () => {
    const datosActualizados = {
      nombre: "Informe Médico Actualizado",
      tipo: "PDF",
      contenido: "Contenido actualizado del informe",
    };

    const response = await request(app)
      .put(`/api/archivos/${archivoId}`)
      .send(datosActualizados);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Archivo actualizado correctamente");
  });

  test("Debería eliminar el archivo", async () => {
    const response = await request(app).delete(`/api/archivos/${archivoId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Archivo eliminado correctamente");
  });

  test("Debería retornar error al crear archivo sin datos", async () => {
    const response = await request(app).post("/api/archivos").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Datos incompletos");
  });

  test("Debería retornar error al actualizar archivo inexistente", async () => {
    const response = await request(app)
      .put("/api/archivos/archivoInexistente")
      .send({
        nombre: "Archivo Fantasma",
        tipo: "PDF",
        contenido: "Contenido fantasma",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Archivo no encontrado");
  });

  test("Debería retornar error al eliminar archivo inexistente", async () => {
    const response = await request(app).delete(
      "/api/archivos/archivoInexistente"
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Archivo no encontrado");
  });
});
