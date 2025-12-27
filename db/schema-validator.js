// Schema validator to check if the database schema matches our expectations
const { Pool } = require('pg');
const { dbConfig } = require('./config');

// Create a connection pool
const pool = new Pool(dbConfig);

async function validateSchema() {
  try {
    console.log('Validating database schema...');
    
    const client = await pool.connect();
    
    // Check if users table exists
    const usersTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    if (!usersTable.rows[0].exists) {
      throw new Error('Users table does not exist');
    }
    
    // Check if doctors table exists
    const doctorsTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'doctors'
      );
    `);
    
    if (!doctorsTable.rows[0].exists) {
      throw new Error('Doctors table does not exist');
    }
    
    // Check if appointments table exists
    const appointmentsTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'appointments'
      );
    `);
    
    if (!appointmentsTable.rows[0].exists) {
      throw new Error('Appointments table does not exist');
    }
    
    // Check users table structure
    const usersColumns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `);
    
    const requiredUserColumns = [
      'id', 'email', 'password_hash', 'name', 'role', 'created_at', 'updated_at'
    ];
    
    const foundUserColumns = usersColumns.rows.map(col => col.column_name);
    const missingUserColumns = requiredUserColumns.filter(col => !foundUserColumns.includes(col));
    
    if (missingUserColumns.length > 0) {
      throw new Error(`Missing columns in users table: ${missingUserColumns.join(', ')}`);
    }
    
    // Check doctors table structure
    const doctorsColumns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'doctors'
      ORDER BY ordinal_position;
    `);
    
    const requiredDoctorColumns = [
      'id', 'user_id', 'name', 'specialization', 'experience', 'bio', 'education', 
      'consultation_fee', 'created_at', 'updated_at'
    ];
    
    const foundDoctorColumns = doctorsColumns.rows.map(col => col.column_name);
    const missingDoctorColumns = requiredDoctorColumns.filter(col => !foundDoctorColumns.includes(col));
    
    if (missingDoctorColumns.length > 0) {
      throw new Error(`Missing columns in doctors table: ${missingDoctorColumns.join(', ')}`);
    }
    
    // Check appointments table structure
    const appointmentsColumns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'appointments'
      ORDER BY ordinal_position;
    `);
    
    const requiredAppointmentColumns = [
      'id', 'doctor_id', 'patient_id', 'date', 'time', 'status', 'reason', 'created_at', 'updated_at'
    ];
    
    const foundAppointmentColumns = appointmentsColumns.rows.map(col => col.column_name);
    const missingAppointmentColumns = requiredAppointmentColumns.filter(col => !foundAppointmentColumns.includes(col));
    
    if (missingAppointmentColumns.length > 0) {
      throw new Error(`Missing columns in appointments table: ${missingAppointmentColumns.join(', ')}`);
    }
    
    console.log('✅ Database schema validation passed!');
    console.log(`Found ${usersColumns.rows.length} columns in users table`);
    console.log(`Found ${doctorsColumns.rows.length} columns in doctors table`);
    console.log(`Found ${appointmentsColumns.rows.length} columns in appointments table`);
    
  } catch (error) {
    console.error('❌ Database schema validation failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  validateSchema().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { validateSchema };