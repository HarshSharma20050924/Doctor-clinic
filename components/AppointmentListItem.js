export default function AppointmentListItem({ appointment }) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{appointment.doctor_name}</h3>
          <p className="text-gray-600">{appointment.specialization}</p>
          <p className="text-gray-700 mt-1">
            <span className="font-medium">Date:</span> {appointment.date}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Time:</span> {appointment.time}
          </p>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appointment.status]}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}