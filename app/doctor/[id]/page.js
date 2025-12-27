'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';
import CalendarSlotPicker from '@/components/CalendarSlotPicker';
import { doctorAPI } from '@/services/api';

export default function DoctorProfilePage({ params }) {
  const { id } = params;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const result = await doctorAPI.getById(id);
        
        if (result.success) {
          setDoctor(result.data);
        } else {
          console.error('Failed to fetch doctor:', result.error);
        }
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading doctor information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-xl text-red-600">Doctor not found</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
                  <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                  <p className="text-gray-600">Experience: {doctor.experience} years</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
                <p className="text-gray-700">{doctor.about}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Education</h2>
                <p className="text-gray-700">{doctor.education}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Languages</h2>
                  <ul className="list-disc pl-5 text-gray-700">
                    {doctor.languages?.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Available Days</h2>
                  <ul className="list-disc pl-5 text-gray-700">
                    {doctor.available_days?.map((day, index) => (
                      <li key={index}>{day}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <AppointmentForm doctorId={id} />
            
            <div className="mt-6 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Clinic Information</h3>
              <p className="text-gray-700"><span className="font-medium">Clinic:</span> {doctor.clinic_name}</p>
              <p className="text-gray-700"><span className="font-medium">Address:</span> {doctor.clinic_address}</p>
              <p className="text-gray-700"><span className="font-medium">Fee:</span> ${doctor.fee}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}