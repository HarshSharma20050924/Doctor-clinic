// Appointment model
const { query } = require('../db/connection');

class Appointment {
  static async create({ patient_id, doctor_id, date, time, status = 'pending' }) {
    const result = await query(
      'INSERT INTO appointments (patient_id, doctor_id, date, time, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_id, doctor_id, date, time, status]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query(
      `SELECT a.*, p.name as patient_name, d.name as doctor_name, d.specialization
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN doctors d ON a.doctor_id = d.id
       WHERE a.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async findByPatientId(patient_id) {
    const result = await query(
      `SELECT a.*, d.name as doctor_name, d.specialization
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       WHERE a.patient_id = $1
       ORDER BY a.date, a.time`,
      [patient_id]
    );
    return result.rows;
  }

  static async findByDoctorId(doctor_id) {
    const result = await query(
      `SELECT a.*, p.name as patient_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       WHERE a.doctor_id = $1
       ORDER BY a.date, a.time`,
      [doctor_id]
    );
    return result.rows;
  }

  static async findAll() {
    const result = await query(
      `SELECT a.*, p.name as patient_name, d.name as doctor_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN doctors d ON a.doctor_id = d.id
       ORDER BY a.date, a.time`
    );
    return result.rows;
  }

  static async updateStatus(id, status) {
    // Validate status
    if (!['pending', 'approved', 'cancelled'].includes(status)) {
      throw new Error('Invalid status. Must be pending, approved, or cancelled');
    }
    
    const result = await query(
      'UPDATE appointments SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query(
      'DELETE FROM appointments WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async findByDoctorAndDateTime(doctor_id, date, time) {
    const result = await query(
      'SELECT * FROM appointments WHERE doctor_id = $1 AND date = $2 AND time = $3',
      [doctor_id, date, time]
    );
    return result.rows[0];
  }
}

module.exports = Appointment;