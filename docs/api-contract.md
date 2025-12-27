# API Contract — Frontend & Backend Communication

## Appointment Booking
### Request
POST /api/appointments
{
  "doctor_id": "uuid",
  "date": "2025-02-10",
  "time": "15:00"
}

### Success Response
200
{
  "id": "uuid",
  "status": "pending"
}

## Get Appointments for a Patient
GET /api/appointments?patient_id=uuid

Response:
[
  {
    "doctor_name": "Dr. Mehta",
    "date": "2025-02-10",
    "time": "15:00",
    "status": "approved"
  }
]

## Admin Updating Status
PATCH /api/appointments/:id/status
{
  "status": "approved"
}

Response:
{ "message": "updated" }
