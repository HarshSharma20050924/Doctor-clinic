'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentListItem from '@/components/AppointmentListItem';

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data
    const mockAppointments = [
      {
        id: 1,
        doctor_name: 'Dr. John Smith',
        specialization: 'Cardiologist',
        date: '2023-12-15',
        time: '10:30',
        status: 'approved'
      },
      {
        id: 2,
        doctor_name: 'Dr. Emily Johnson',
        specialization: 'Dermatologist',
        date: '2023-12-20',
        time: '14:00',
        status: 'pending'
      },
      {
        id: 3,
        doctor_name: 'Dr. Michael Chen',
        specialization: 'Orthopedic Surgeon',
        date: '2023-12-22',
        time: '09:00',
        status: 'cancelled'
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
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