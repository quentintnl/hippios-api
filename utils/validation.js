function validateHorse({ name, breed }) {
  const errors = [];
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("name est requis et doit être une chaîne non vide");
  }
  if (name && name.length > 100) {
    errors.push("name ne peut pas dépasser 100 caractères");
  }
  if (breed && typeof breed !== "string") {
    errors.push("breed doit être une chaîne de caractères");
  }
  return errors;
}

module.exports = { validateHorse };