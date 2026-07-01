// tests/unit/validation.test.js
const { validateHorse } = require("../../utils/validation");

describe("validateHorse", () => {

  describe("name", () => {
    test("accepte un nom valide", () => {
      expect(validateHorse({ name: "Tornado" })).toHaveLength(0);
    });

    test("rejette un name manquant", () => {
      const errors = validateHorse({ name: "" });
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatch(/name est requis/);
    });

    test("rejette un name trop long", () => {
      const errors = validateHorse({ name: "a".repeat(101) });
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatch(/100 caractères/);
    });
  });

  describe("breed", () => {
    test("accepte une breed valide", () => {
      expect(validateHorse({ name: "Tornado", breed: "Andalou" })).toHaveLength(0);
    });

    test("accepte une breed absente", () => {
      expect(validateHorse({ name: "Tornado" })).toHaveLength(0);
    });
  });
});