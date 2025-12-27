// Test script to demonstrate the database schema functionality
require('dotenv').config();
const { runMigrations } = require('./src/db/migrate');
const Patient = require('./src/models/Patient');
const Doctor = require('./src/models/Doctor');
const Appointment = require('./src/models/Appointment');
const { isTimeSlotAvailable } = require('./src/utils/availability');

async function testDatabaseSetup() {
  console.log('Starting database setup and test...');

  try {
    // Run migrations first
    await runMigrations();
    console.log('✓ Migrations completed');

    // Test Patient model
    console.log('\n--- Testing Patient Model ---');
    const patient = await Patient.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123'
    });
    console.log('✓ Created patient:', patient);

    // Test Doctor model
    console.log('\n--- Testing Doctor Model ---');
    const doctor = await Doctor.create({
      name: 'Dr. Jane Smith',
      specialization: 'Cardiology',
      experience_years: 10,
      clinic_address: '123 Medical Center, City',
      about: 'Experienced cardiologist with expertise in heart conditions.',
      image_url: 'https://example.com/dr-smith.jpg'
    });
    console.log('✓ Created doctor:', doctor);

    // Test Appointment model - First check availability
    console.log('\n--- Testing Appointment Availability ---');
    const isAvailable = await isTimeSlotAvailable(doctor.id, '2025-02-15', '10:00');
    console.log('✓ Time slot available:', isAvailable);

    // Create appointment if available
    if (isAvailable) {
      console.log('\n--- Testing Appointment Model ---');
      const appointment = await Appointment.create({
        patient_id: patient.id,
        doctor_id: doctor.id,
        date: '2025-02-15',
        time: '10:00'
      });
      console.log('✓ Created appointment:', appointment);

      // Update appointment status
      const updatedAppointment = await Appointment.updateStatus(appointment.id, 'approved');
      console.log('✓ Updated appointment status:', updatedAppointment.status);

      // Fetch appointment by patient ID
      const patientAppointments = await Appointment.findByPatientId(patient.id);
      console.log('✓ Patient appointments:', patientAppointments);

      // Fetch appointment by doctor ID
      const doctorAppointments = await Appointment.findByDoctorId(doctor.id);
      console.log('✓ Doctor appointments:', doctorAppointments);
    }

    // Get all doctors
    console.log('\n--- Testing Doctor Retrieval ---');
    const allDoctors = await Doctor.getAll();
    console.log('✓ All doctors:', allDoctors);

    // Get all patients
    console.log('\n--- Testing Patient Retrieval ---');
    const allPatients = await Patient.getAll();
    console.log('✓ All patients:', allPatients);

    console.log('\n✓ All tests completed successfully!');
  } catch (error) {
    console.error('✗ Test failed:', error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testDatabaseSetup();
}

module.exports = { testDatabaseSetup };