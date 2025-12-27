import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';
import CalendarSlotPicker from '@/components/CalendarSlotPicker';

// Mock data for doctor - in real app, this would come from an API
const doctor = {
  id: 1,
  name: 'Dr. John Smith',
  specialization: 'Cardiologist',
  experience: 12,
  clinic_name: 'City Heart Clinic',
  clinic_address: '123 Health St, Medical District',
  fee: 150,
  image: '/doctor1.jpg',
  about: 'Dr. John Smith is a highly experienced cardiologist with over 12 years of practice. He specializes in preventive cardiology and non-invasive cardiac procedures.',
  education: 'MD from Johns Hopkins University, Cardiology Fellowship at Mayo Clinic',
  languages: ['English', 'Spanish'],
  available_days: ['Monday', 'Tuesday', 'Thursday', 'Friday']
};

export default function DoctorProfilePage({ params }) {
  const { id } = params;

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
                    {doctor.languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Available Days</h2>
                  <ul className="list-disc pl-5 text-gray-700">
                    {doctor.available_days.map((day, index) => (
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