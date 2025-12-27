'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import { appointmentAPI } from '@/services/api';

export default function AdminPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchAppointments = async () => {
      try {
        // Get all appointments for admin view
        const result = await appointmentAPI.getAll();
        
        if (result.success) {
          setAppointments(result.data);
        } else {
          console.error('Failed to fetch appointments:', result.error);
          setAppointments([]);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const result = await appointmentAPI.updateStatus(appointmentId, newStatus);
      
      if (result.success) {
        // Update the local state to reflect the change
        setAppointments(prev => prev.map(app => 
          app.id === appointmentId ? { ...app, status: newStatus } : app
        ));
        console.log(`Appointment ${appointmentId} updated to ${newStatus}`);
      } else {
        console.error('Failed to update appointment status:', result.error);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
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