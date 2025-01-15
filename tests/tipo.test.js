import request from "supertest";
import app from "../src/server";

describe("Pruebas API - TipoEstudio", () => {
  let tipoEstudioId;

  test("Debería crear un nuevo tipo de estudio", async () => {
    const tipoEstudioData = {
      NombreEstudio: "Estudio Cardíaco",
      Descripcion: "Estudio relacionado con el corazón",
    };

    const response = await request(app)
      .post("/api/tipoEstudio")
      .send(tipoEstudioData);

    console.log("Respuesta creación:", response.body);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Tipo de estudio creado exitosamente");
    tipoEstudioId = response.body.data.insertId; // Asignar el ID para pruebas posteriores
  });

  // Test de actualización de TipoEstudio
  test("Debería actualizar el tipo de estudio creado", async () => {
    const tipoEstudioDataActualizado = {
      NombreEstudio: "Estudio Cardiovascular",
      Descripcion: "Estudio relacionado con el sistema cardiovascular",
    };

    const response = await request(app)
      .put(`/api/tipoEstudio/${tipoEstudioId}`) // Usamos el ID del tipoEstudio creado
      .send(tipoEstudioDataActualizado);

    console.log("Respuesta actualización:", response.body); // Para depuración

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Tipo de estudio actualizado exitosamente"
    );
  });

  // Test de eliminación de TipoEstudio
  test("Debería eliminar el tipo de estudio creado", async () => {
    const response = await request(app).delete(
      `/api/tipoEstudio/${tipoEstudioId}`
    ); // Usamos el ID del tipoEstudio creado

    console.log("Respuesta eliminación:", response.body); // Para depuración

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Tipo de estudio eliminado exitosamente"
    );
  });
});
