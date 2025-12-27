import './globals.css'

export const metadata = {
  title: 'Doctor Appointment Booking',
  description: 'Book appointments with doctors online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}