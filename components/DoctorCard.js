import Link from 'next/link';

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
        <p className="text-gray-600 mt-2">Experience: {doctor.experience} years</p>
        <p className="text-gray-600">Clinic: {doctor.clinic_name}</p>
        <p className="text-gray-600">Fees: ${doctor.fee}</p>
        <div className="mt-4">
          <Link 
            href={`/doctor/${doctor.id}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Profile & Book
          </Link>
        </div>
      </div>
    </div>
  );
}