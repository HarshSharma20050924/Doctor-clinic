'use client';

import { useState } from 'react';
import { appointmentAPI } from '@/services/api';

export default function AppointmentForm({ doctorId }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Get the JWT token from cookies
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          doctor_id: doctorId,
          date: date,
          time: time,
          status: 'pending'
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Appointment booked successfully!');
        setDate('');
        setTime('');
      } else {
        setMessage(result.error || 'Failed to book appointment');
      }
    } catch (error) {
      setMessage('Error booking appointment');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Time slots for the appointment form
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="time">
            Time
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
        
        {message && (
          <div className={`mt-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}