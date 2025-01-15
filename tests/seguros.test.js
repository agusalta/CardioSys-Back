import request from "supertest";
import app from "../src/server.js";

describe("Tests de API para Seguros", () => {
  let seguroId;

  test("Debe obtener todos los seguros", async () => {
    const response = await request(app).get("/api/seguro/seguros");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Debe crear un nuevo seguro", async () => {
    const nuevoSeguro = {
      TipoSeguro: "Salud",
    };

    const response = await request(app)
      .post("/api/seguro/seguros")
      .send(nuevoSeguro);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Seguro creado exitosamente"
    );
    expect(response.body).toHaveProperty("data");

    // Guardar el ID del seguro recién creado para futuras pruebas
    seguroId = response.body.data.insertId;
  });

  test("Debe actualizar el seguro creado", async () => {
    const seguroActualizado = {
      TipoSeguro: "Vida",
    };

    const response = await request(app)
      .put(`/api/seguro/seguros/${seguroId}`)
      .send(seguroActualizado);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Seguro actualizado exitosamente"
    );
  });

  test("Debe eliminar el seguro creado", async () => {
    const response = await request(app).delete(
      `/api/seguro/seguros/${seguroId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Seguro eliminado exitosamente"
    );
  });
});
