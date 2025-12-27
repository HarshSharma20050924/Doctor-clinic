import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';

// Mock data for doctors - in real app, this would come from an API
const doctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialization: 'Cardiologist',
    experience: 12,
    clinic_name: 'City Heart Clinic',
    fee: 150,
    image: '/doctor1.jpg'
  },
  {
    id: 2,
    name: 'Dr. Emily Johnson',
    specialization: 'Dermatologist',
    experience: 8,
    clinic_name: 'Skin Care Center',
    fee: 120,
    image: '/doctor2.jpg'
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    specialization: 'Orthopedic Surgeon',
    experience: 15,
    clinic_name: 'Bone & Joint Clinic',
    fee: 200,
    image: '/doctor3.jpg'
  },
  {
    id: 4,
    name: 'Dr. Sarah Williams',
    specialization: 'Pediatrician',
    experience: 10,
    clinic_name: 'Children Care Hospital',
    fee: 100,
    image: '/doctor4.jpg'
  }
];

export default function DoctorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Doctors</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}