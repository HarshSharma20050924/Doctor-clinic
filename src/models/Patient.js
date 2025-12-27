// Patient model
const { query } = require('../db/connection');
const bcrypt = require('bcryptjs');

class Patient {
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO patients (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await query(
      'SELECT * FROM patients WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query(
      'SELECT id, name, email, created_at FROM patients WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await query('SELECT id, name, email, created_at FROM patients');
    return result.rows;
  }
}

module.exports = Patient;