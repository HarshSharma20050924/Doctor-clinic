# Backend — API, Database Schema, Logic

## Database Schema (PostgreSQL)
Patient
- id (uuid)
- name
- email
- password (hashed)

Doctor
- id (uuid)
- name
- specialization
- experience_years
- clinic_address
- about
- image_url

Appointment
- id (uuid)
- patient_id (fk)
- doctor_id (fk)
- date
- time
- status (pending / approved / cancelled)

## Core Endpoints

### Authentication
POST `/api/auth/register`
POST `/api/auth/login`

### Doctor & Clinic
GET `/api/doctors`
GET `/api/doctors/:id`

### Appointment
POST `/api/appointments`
GET `/api/appointments?patient_id=...`
PATCH `/api/appointments/:id/status`

## Appointment Logic
- When booking, check: doctor exists → slot valid → slot not already booked.
- Status defaults to `pending`.
- Admin can switch to `approved` or `cancelled`.

## Security
- Password hashing (bcrypt)
- JWT stored in httpOnly cookies
- Role-based access for `/admin` routes
