# Doctor Appointment Website

## Database Schema

This project uses PostgreSQL as the database with the following schema:

### Tables

1. **patients**
   - id (UUID, Primary Key) - Unique identifier for each patient
   - name (VARCHAR) - Patient's full name
   - email (VARCHAR, Unique) - Patient's email address
   - password (VARCHAR) - Hashed password
   - created_at (TIMESTAMP) - Record creation timestamp
   - updated_at (TIMESTAMP) - Record update timestamp

2. **doctors**
   - id (UUID, Primary Key) - Unique identifier for each doctor
   - name (VARCHAR) - Doctor's full name
   - specialization (VARCHAR) - Medical specialization
   - experience_years (INTEGER) - Years of experience
   - clinic_address (TEXT) - Address of the clinic
   - about (TEXT) - Doctor's bio/information
   - image_url (VARCHAR) - URL to doctor's profile image
   - created_at (TIMESTAMP) - Record creation timestamp
   - updated_at (TIMESTAMP) - Record update timestamp

3. **appointments**
   - id (UUID, Primary Key) - Unique identifier for each appointment
   - patient_id (UUID, Foreign Key) - Reference to the patient
   - doctor_id (UUID, Foreign Key) - Reference to the doctor
   - date (DATE) - Appointment date
   - time (TIME) - Appointment time
   - status (VARCHAR) - Appointment status (pending/approved/cancelled)
   - created_at (TIMESTAMP) - Record creation timestamp
   - updated_at (TIMESTAMP) - Record update timestamp

## Running Migrations

To set up the database schema, run the following command:

```bash
npm run migrate
```

This will execute all migration files in the `src/db/migrations` directory in order, creating the necessary tables and relationships.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=doctor_appointment_db
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

## Indexes

The schema includes the following indexes for performance:
- idx_appointments_patient_id
- idx_appointments_doctor_id
- idx_appointments_date
- idx_appointments_status