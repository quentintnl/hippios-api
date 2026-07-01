// tests/integration/horses.test.js
const request = require("supertest");
const app = require("../../app");
const { setupTestDB, clearTestDB, teardownTestDB } = require("../helpers/db");

// Remplace le pool de l'app par celui de test
jest.mock("../../db", () => require("../helpers/db").pool);

beforeAll(async () => {
  await setupTestDB();
});

beforeEach(async () => {
  await clearTestDB(); // table vide avant chaque test
});

afterAll(async () => {
  await teardownTestDB();
});

// ─── GET /horses ───────────────────────────────────────────────

describe("GET /horses", () => {
  test("retourne un tableau vide si aucun cheval", async () => {
    const res = await request(app).get("/horses");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("retourne les chevaux insérés", async () => {
    await request(app)
      .post("/horses")
      .send({ name: "Tornado", breed: "Andalou" });

    const res = await request(app).get("/horses");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Tornado");
  });
});

// ─── POST /horses ──────────────────────────────────────────────

describe("POST /horses", () => {
  test("crée un cheval avec name + breed", async () => {
    const res = await request(app)
      .post("/horses")
      .send({ name: "Éclair", breed: "Pur-sang" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: "Éclair", breed: "Pur-sang" });
    expect(res.body.id).toBeDefined();
  });

  test("crée un cheval sans breed", async () => {
    const res = await request(app)
      .post("/horses")
      .send({ name: "Mistral" });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Mistral");
    expect(res.body.breed).toBeNull();
  });

  test("rejette si name est absent", async () => {
    const res = await request(app)
      .post("/horses")
      .send({ breed: "Andalou" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});