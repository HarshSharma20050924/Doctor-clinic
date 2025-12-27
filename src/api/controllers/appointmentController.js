const Appointment = require('../../models/Appointment');
const Doctor = require('../../models/Doctor');
const { checkAvailability } = require('../../utils/availability');

// Book a new appointment
const createAppointment = async (req, res) => {
  try {
    const { doctor_id, date, time } = req.body;

    // Validate input
    if (!doctor_id || !date || !time) {
      return res.status(400).json({ error: 'Doctor ID, date, and time are required' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if slot is valid and available
    const isAvailable = await checkAvailability(doctor_id, date, time);
    if (!isAvailable) {
      return res.status(409).json({ error: 'Slot not available' });
    }

    // Create appointment with pending status
    const newAppointment = await Appointment.create({
      patient_id: req.user.id, // From auth middleware
      doctor_id,
      date,
      time,
      status: 'pending'
    });

    res.status(200).json({
      id: newAppointment.id,
      status: newAppointment.status
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get appointments for a patient
const getPatientAppointments = async (req, res) => {
  try {
    const { patient_id } = req.query;

    // If no patient_id is provided in query, use the authenticated user's ID
    const targetPatientId = patient_id || req.user?.id;

    // If patient_id is provided in query, validate that the user has permission to access it
    if (patient_id && req.user?.id !== patient_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const appointments = await Appointment.findByPatientId(targetPatientId);
    
    // Format response to match API contract
    const formattedAppointments = appointments.map(appointment => ({
      id: appointment.id,
      doctor_name: appointment.doctor_name,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status
    }));

    res.json(formattedAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update appointment status (admin only)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status || !['pending', 'approved', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be pending, approved, or cancelled' });
    }

    // Check if appointment exists
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update status
    const updatedAppointment = await Appointment.updateStatus(id, status);

    res.json({ message: 'updated' });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createAppointment,
  getPatientAppointments,
  updateAppointmentStatus
};