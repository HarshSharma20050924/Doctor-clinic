const express = require('express');
const { authenticateUser, requireAdmin } = require('../middleware/auth');
const { 
  createAppointment, 
  getPatientAppointments, 
  updateAppointmentStatus 
} = require('../controllers/appointmentController');

const router = express.Router();

// POST /api/appointments - Book appointment (requires auth)
router.post('/', authenticateUser, createAppointment);

// GET /api/appointments - Get appointments for patient (requires auth)
router.get('/', authenticateUser, getPatientAppointments);

// PATCH /api/appointments/:id/status - Update status (admin only)
router.patch('/:id/status', requireAdmin, updateAppointmentStatus);

module.exports = router;