const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'appointment_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// Test script for API endpoints
async function testAPI() {
  console.log('Testing API endpoints...\n');

  try {
    // 1. Test database connection
    console.log('1. Testing database connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('✓ Database connection successful\n');

    // 2. Test models
    console.log('2. Testing models...');
    
    // Import models
    const Patient = require('./src/models/Patient');
    const Doctor = require('./src/models/Doctor');
    const Appointment = require('./src/models/Appointment');
    
    // Test patient operations
    console.log('  - Testing Patient model...');
    const testPatients = await Patient.getAll();
    console.log(`  ✓ Found ${testPatients.length} patients in database`);
    
    // Test doctor operations
    console.log('  - Testing Doctor model...');
    const testDoctors = await Doctor.findAll();
    console.log(`  ✓ Found ${testDoctors.length} doctors in database`);
    
    // Test appointment operations
    console.log('  - Testing Appointment model...');
    const testAppointments = await Appointment.findAll();
    console.log(`  ✓ Found ${testAppointments.length} appointments in database\n`);

    // 3. Test controllers
    console.log('3. Testing controllers...');
    
    // Mock request and response objects
    const mockReq = (body = {}, params = {}, query = {}, cookies = {}) => ({
      body,
      params,
      query,
      cookies,
      user: { id: 'test-user-id', email: 'admin@example.com' } // For admin tests
    });
    
    const mockRes = () => {
      const res = {};
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.json = (data) => {
        res.data = data;
        return res;
      };
      res.cookie = (name, value, options) => {
        res.cookies = res.cookies || {};
        res.cookies[name] = { value, options };
        return res;
      };
      return res;
    };

    // Test auth controller
    console.log('  - Testing Auth controller...');
    const { register, login } = require('./src/api/controllers/authController');
    console.log('  ✓ Auth controller imported successfully');
    
    // Test doctor controller
    console.log('  - Testing Doctor controller...');
    const { getAllDoctors, getDoctorById } = require('./src/api/controllers/doctorController');
    console.log('  ✓ Doctor controller imported successfully');
    
    // Test appointment controller
    console.log('  - Testing Appointment controller...');
    const { 
      createAppointment, 
      getPatientAppointments, 
      updateAppointmentStatus 
    } = require('./src/api/controllers/appointmentController');
    console.log('  ✓ Appointment controller imported successfully\n');

    // 4. Test middleware
    console.log('4. Testing middleware...');
    const { authenticateUser, requireAdmin } = require('./src/api/middleware/auth');
    console.log('  ✓ Auth middleware imported successfully\n');

    // 5. Test routes
    console.log('5. Testing routes...');
    const authRoutes = require('./src/api/routes/auth');
    const doctorRoutes = require('./src/api/routes/doctors');
    const appointmentRoutes = require('./src/api/routes/appointments');
    console.log('  ✓ All route modules imported successfully\n');

    console.log('✓ All API components loaded successfully!');
    console.log('\nAPI Endpoints Summary:');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET /api/doctors');
    console.log('- GET /api/doctors/:id');
    console.log('- POST /api/appointments (auth required)');
    console.log('- GET /api/appointments (auth required)');
    console.log('- PATCH /api/appointments/:id/status (admin required)');

  } catch (error) {
    console.error('✗ Test failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the test
testAPI();