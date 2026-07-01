const pool = require("../db");

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS horses (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        breed      VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log("✅ Tables initialisées");
  } catch (err) {
    console.error("❌ Erreur initialisation DB :", err.message);
    process.exit(1);
  }
}

module.exports = { initDB };