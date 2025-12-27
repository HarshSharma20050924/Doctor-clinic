// Doctor model
const { query } = require('../db/connection');

class Doctor {
  static async create({ name, specialization, experience_years, clinic_address, about, image_url }) {
    const result = await query(
      'INSERT INTO doctors (name, specialization, experience_years, clinic_address, about, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, specialization, experience_years, clinic_address, about, image_url]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query(
      'SELECT * FROM doctors WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await query('SELECT * FROM doctors');
    return result.rows;
  }
  
  static async findAll() {
    return this.getAll();
  }

  static async update(id, { name, specialization, experience_years, clinic_address, about, image_url }) {
    const result = await query(
      'UPDATE doctors SET name = $1, specialization = $2, experience_years = $3, clinic_address = $4, about = $5, image_url = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [name, specialization, experience_years, clinic_address, about, image_url, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query(
      'DELETE FROM doctors WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Doctor;