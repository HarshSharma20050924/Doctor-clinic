// Database connection setup
const { Pool } = require('pg');
const dbConfig = require('./config');

// Create a connection pool
const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.username,
  password: dbConfig.password,
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Export the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};