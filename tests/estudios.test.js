import request from "supertest";
import app from "../src/server";

describe("Pruebas API - Estudio", () => {
  let estudioId;

  const estudioData = {
    Fecha: "2024-08-15",
    Asunto: "Chequeo General",
    Observacion: "Observación inicial",
    Factura: "FAC12345",
    ID_Paciente: 2,
    ID_TipoEstudio: 1,
  };

  const estudioDataActualizado = {
    Fecha: "2024-08-16",
    Asunto: "Chequeo Cardiaco",
    Observacion: "Observación actualizada",
    Factura: "FAC67890",
    ID_Paciente: 2,
    ID_TipoEstudio: 2,
  };

  test("Debería crear un nuevo estudio", async () => {
    const response = await request(app).post("/api/estudio").send(estudioData);

    console.log("Respuesta creación:", response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Estudio creado exitosamente");
    estudioId = response.body.data.insertId;
  });

  test("Debería actualizar el estudio creado", async () => {
    const response = await request(app)
      .put(`/api/estudio/${estudioId}`)
      .send(estudioDataActualizado);

    console.log("Respuesta actualización:", response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Estudio actualizado exitosamente");
  });

  test("Debería eliminar el estudio creado", async () => {
    const response = await request(app).delete(`/api/estudio/${estudioId}`);

    console.log("Respuesta eliminación:", response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Estudio eliminado exitosamente");
  });
});
