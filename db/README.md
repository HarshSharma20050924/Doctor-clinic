# Database Schema for Doctor Appointment System

## Overview
This directory contains the PostgreSQL database schema and migration files for the doctor appointment booking system.

## Tables

### 1. users
Stores user information for patients, doctors, and admins.
- `id`: UUID primary key
- `email`: User's email (unique)
- `password_hash`: Hashed password
- `name`: User's full name
- `role`: User role ('patient', 'doctor', 'admin')
- `created_at`: Timestamp when record was created
- `updated_at`: Timestamp when record was last updated

### 2. doctors
Stores detailed information about doctors.
- `id`: UUID primary key
- `user_id`: Reference to the users table (for doctors who have accounts)
- `name`: Doctor's name
- `specialization`: Medical specialization
- `experience`: Years of experience
- `bio`: Doctor's biography
- `education`: Educational background
- `consultation_fee`: Fee for consultation
- `created_at`: Timestamp when record was created
- `updated_at`: Timestamp when record was last updated

### 3. appointments
Stores appointment booking information.
- `id`: UUID primary key
- `doctor_id`: Reference to the doctors table
- `patient_id`: Reference to the users table (patient)
- `date`: Date of appointment
- `time`: Time of appointment
- `status`: Appointment status ('pending', 'approved', 'cancelled', 'completed')
- `reason`: Reason for appointment
- `created_at`: Timestamp when record was created
- `updated_at`: Timestamp when record was last updated

## Migration Process
To apply the schema to a PostgreSQL database:
1. Connect to your PostgreSQL database
2. Execute the SQL commands in the migration files in order

## Indexes
- Appointments are indexed by doctor_id, patient_id, date, and status for efficient querying
- Doctors are indexed by specialization for efficient searching

## Triggers
The schema includes triggers that automatically update the `updated_at` field whenever a record is modified.