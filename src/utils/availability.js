// Utility functions for checking appointment availability
const Appointment = require('../models/Appointment');

/**
 * Check if a time slot is available for a doctor
 * @param {string} doctor_id - The doctor's UUID
 * @param {string} date - The appointment date (YYYY-MM-DD)
 * @param {string} time - The appointment time (HH:MM)
 * @returns {Promise<boolean>} - True if the slot is available, false otherwise
 */
async function isTimeSlotAvailable(doctor_id, date, time) {
  // Check if there's already an appointment for this doctor at this date and time
  const existingAppointment = await Appointment.findByDoctorAndDateTime(doctor_id, date, time);
  
  // If there's an existing appointment, the slot is not available
  return !existingAppointment;
}

module.exports = {
  isTimeSlotAvailable
};