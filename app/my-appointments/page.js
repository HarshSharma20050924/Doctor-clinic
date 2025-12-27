'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentListItem from '@/components/AppointmentListItem';
import { appointmentAPI } from '@/services/api';

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // In a real application, you would get the patient ID from the authenticated user
        // For now, we'll use a placeholder ID - in a real app this would come from auth context
        const patientId = 'placeholder-patient-id'; // This should be replaced with actual patient ID from auth
        const result = await appointmentAPI.getByPatientId(patientId);
        
        if (result.success) {
          setAppointments(result.data);
        } else {
          console.error('Failed to fetch appointments:', result.error);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>
        
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">You have no appointments yet.</p>
            <a 
              href="/doctors" 
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Doctors
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentListItem key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}