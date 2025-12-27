// Script to run database migrations
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { dbConfig } = require('../config');

// Create a connection pool
const pool = new Pool(dbConfig);

async function runMigrations() {
  try {
    console.log('Starting database migrations...');
    
    const client = await pool.connect();
    
    // Check if migrations table exists, if not create it
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Get all migration files
    const migrationDir = path.join(__dirname);
    const files = fs.readdirSync(migrationDir);
    const sqlFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort((a, b) => {
        // Sort by numeric prefix (e.g., 001_, 002_, etc.)
        const numA = parseInt(a.split('_')[0]);
        const numB = parseInt(b.split('_')[0]);
        return numA - numB;
      });
    
    console.log(`Found ${sqlFiles.length} migration files`);
    
    // Get already executed migrations
    const executedMigrations = await client.query(
      'SELECT name FROM migrations ORDER BY name'
    );
    const executedNames = executedMigrations.rows.map(row => row.name);
    
    // Execute pending migrations
    for (const file of sqlFiles) {
      if (executedNames.includes(file)) {
        console.log(`Skipping already executed migration: ${file}`);
        continue;
      }
      
      console.log(`Executing migration: ${file}`);
      
      // Read and execute the migration file
      const migrationPath = path.join(migrationDir, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      await client.query('BEGIN'); // Start transaction
      
      try {
        await client.query(migrationSQL);
        
        // Record that this migration was executed
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [file]
        );
        
        await client.query('COMMIT'); // Commit transaction
        console.log(`✅ Successfully executed migration: ${file}`);
      } catch (error) {
        await client.query('ROLLBACK'); // Rollback on error
        console.error(`❌ Error executing migration ${file}:`, error.message);
        throw error;
      }
    }
    
    console.log('✅ All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration process failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  runMigrations().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runMigrations };