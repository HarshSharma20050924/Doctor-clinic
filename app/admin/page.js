'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';

// Mock data for appointments - in real app, this would come from an API
const mockAppointments = [
  {
    id: 1,
    patient_name: 'John Doe',
    doctor_name: 'Dr. John Smith',
    specialization: 'Cardiologist',
    date: '2023-12-15',
    time: '10:30',
    status: 'pending'
  },
  {
    id: 2,
    patient_name: 'Jane Smith',
    doctor_name: 'Dr. Emily Johnson',
    specialization: 'Dermatologist',
    date: '2023-12-20',
    time: '14:00',
    status: 'pending'
  },
  {
    id: 3,
    patient_name: 'Robert Brown',
    doctor_name: 'Dr. Michael Chen',
    specialization: 'Orthopedic Surgeon',
    date: '2023-12-22',
    time: '09:00',
    status: 'approved'
  }
];

export default function AdminPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch appointments
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
  }, []);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    // In a real app, this would make an API call to update the status
    console.log(`Updating appointment ${appointmentId} to ${newStatus}`);
    
    setAppointments(prev => prev.map(app => 
      app.id === appointmentId ? { ...app, status: newStatus } : app
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
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
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Patient</th>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Specialization</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{appointment.patient_name}</td>
                    <td className="py-3 px-4">{appointment.doctor_name}</td>
                    <td className="py-3 px-4">{appointment.specialization}</td>
                    <td className="py-3 px-4">{appointment.date}</td>
                    <td className="py-3 px-4">{appointment.time}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'approved')}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}