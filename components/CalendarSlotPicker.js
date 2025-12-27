'use client';

import { useState } from 'react';

export default function CalendarSlotPicker({ onSelectSlot }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (onSelectSlot) {
      onSelectSlot({ date, time: selectedTime });
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    if (onSelectSlot) {
      onSelectSlot({ date: selectedDate, time });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Select Date & Time</h3>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-300 rounded"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Time Slots
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => handleTimeChange(slot)}
              className={`p-2 text-sm rounded border ${
                selectedTime === slot
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}