const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "hippios_test",
});

async function setupTestDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS horses (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      breed      VARCHAR(100),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

async function clearTestDB() {
  await pool.query("TRUNCATE TABLE horses RESTART IDENTITY CASCADE");
}

async function teardownTestDB() {
  await pool.query("DROP TABLE IF EXISTS horses");
  await pool.end();
}

module.exports = { pool, setupTestDB, clearTestDB, teardownTestDB };