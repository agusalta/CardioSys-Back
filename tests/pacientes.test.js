import request from "supertest";
import app from "../src/server.js";

let createdPacienteId;

describe("Pruebas para las rutas de Paciente", () => {
  test("Debe crear un nuevo paciente", async () => {
    const newPaciente = {
      ID_Seguro: 1,
      Nombre: "Juan",
      DNI: "22222222",
      Apellido: "Pérez",
      Email: "juan.perez@example.com",
      Telefono: "1234567890",
      FechaNacimiento: "1990-01-01",
      Altura: 1.75,
      Peso: 70,
      FrecuenciaCardiaca: 70,
      FrecuenciaRespiratoria: 16,
    };

    const response = await request(app)
      .post("/api/pacientes")
      .send(newPaciente);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("insertId");
    createdPacienteId = response.body.insertId;
  });

  test("Debe obtener una lista de pacientes", async () => {
    const response = await request(app).get("/api/pacientes");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Debe obtener un paciente por ID", async () => {
    const response = await request(app).get(
      `/api/pacientes/${createdPacienteId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ID_Paciente", createdPacienteId);
  });

  test("Debe actualizar un paciente por ID", async () => {
    const updatedPaciente = {
      ID_Seguro: 2,
      Nombre: "Juan Carlos",
      DNI: "66666665",
      Apellido: "Gómez",
      Email: "juan.carlos@example.com",
      Telefono: "0987654321",
      FechaNacimiento: "1991-02-02",
      Altura: 1.8,
      Peso: 75,
      FrecuenciaCardiaca: 72,
      FrecuenciaRespiratoria: 18,
    };

    const response = await request(app)
      .put(`/api/pacientes/${createdPacienteId}`)
      .send(updatedPaciente);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Paciente actualizado correctamente"
    );
  });

  test("Debe eliminar un paciente por ID", async () => {
    const response = await request(app).delete(
      `/api/pacientes/${createdPacienteId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Paciente eliminado correctamente"
    );
  });
});
