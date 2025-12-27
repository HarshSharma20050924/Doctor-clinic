# Frontend — Pages, Components, Routing

## Framework
Next.js for pages, API integration, SEO, and fast routing.
Tailwind for styling.

## Pages
- `/` — Home, clinic intro, hero section
- `/doctors` — List of doctors
- `/doctor/[id]` — Doctor profile, timings, appointment form
- `/my-appointments` — Logged-in patient view
- `/login` — Patient login
- `/admin` — Doctor dashboard (secured)

## Components
- `Navbar` — navigation links, login state
- `Footer`
- `DoctorCard` — name, specialization, experience, CTA link
- `AppointmentForm` — date-picker, time slots, submit
- `AppointmentListItem`
- `CalendarSlotPicker`
- `AuthGuard` — protects dashboard pages

## UI Flow Highlights
1. Doctor profile page → shows free slots fetched from `/api/doctor/:id/slots`
2. Appointment form submits to `/api/appointments/create`
3. After success, redirect to `/my-appointments`

## Styling & UX Notes
- keep forms short and direct
- show available slots visually instead of dropdowns
- use skeleton loading for doctor pages
