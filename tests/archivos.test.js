import request from "supertest";
import app from "../src/server.js";
import path from "path";

describe("Pruebas de API - Archivos", () => {
  let archivoId;

  // Función para leer un archivo desde el sistema de archivos
  const obtenerArchivo = (nombreArchivo) => {
    return path.join(__dirname, nombreArchivo); // Retorna la ruta completa del archivo
  };

  test("Debería crear un archivo", async () => {
    const archivoPath = obtenerArchivo("testPdf.pdf"); // Ruta al archivo en tu sistema de archivos

    const response = await request(app)
      .post("/api/archivo/archivos")
      .field("NombreArchivo", "testPdf.pdf") // Agregar el nombre del archivo
      .field("ID_Estudio", 1) // Agregar el ID_Estudio
      .attach("Archivo", archivoPath); // Adjuntar el archivo real usando `attach()`

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Archivo creado correctamente");
    archivoId = response.body.archivoId;

    if (response.status !== 201) {
      console.error("Error en la creación del archivo:", response.body);
    }
  });

  test("Debería actualizar el archivo", async () => {
    const archivoPath = obtenerArchivo("dummy.pdf");

    const response = await request(app)
      .put(`/api/archivo/archivos/${archivoId}`)
      .field("NombreArchivo", "dummy.pdf")
      .field("ID_Estudio", 1)
      .attach("Archivo", archivoPath); // Adjuntar el archivo binario actualizado

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Archivo actualizado correctamente");

    if (response.status !== 200) {
      console.error("Error al actualizar archivo:", response.body);
    }
  });

  test("Debería eliminar el archivo", async () => {
    const response = await request(app).delete(
      `/api/archivo/archivos/${archivoId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Archivo eliminado correctamente");

    if (response.status !== 200) {
      console.error("Error al eliminar archivo:", response.body);
    }
  });
});
