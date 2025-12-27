import './globals.css'
import AuthWrapper from '@/components/AuthWrapper';

export const metadata = {
  title: 'Doctor Appointment Booking',
  description: 'Book appointments with doctors online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  )
}