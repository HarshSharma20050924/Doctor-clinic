// Migration runner script
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query } = require('./connection');

async function runMigrations() {
  try {
    console.log('Starting database migrations...');
    
    // Read all migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    console.log(`Found ${migrationFiles.length} migration files`);
    
    // Create migrations table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Execute each migration
    for (const file of migrationFiles) {
      // Check if migration has already been run
      const existingMigration = await query(
        'SELECT name FROM migrations WHERE name = $1', 
        [file]
      );
      
      if (existingMigration.rows.length > 0) {
        console.log(`Skipping already executed migration: ${file}`);
        continue;
      }
      
      console.log(`Executing migration: ${file}`);
      
      // Read and execute migration
      const migrationPath = path.join(migrationsDir, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      await query('BEGIN'); // Start transaction
      
      try {
        await query(migrationSQL);
        
        // Record migration execution
        await query(
          'INSERT INTO migrations (name) VALUES ($1)', 
          [file]
        );
        
        await query('COMMIT'); // Commit transaction
        console.log(`Successfully executed migration: ${file}`);
      } catch (error) {
        await query('ROLLBACK'); // Rollback on error
        console.error(`Error executing migration ${file}:`, error);
        throw error;
      }
    }
    
    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration process failed:', error);
    process.exit(1);
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };