import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Book Doctor Appointments Online
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Easy, convenient, and secure way to book appointments with top doctors in your area.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">1. Search Doctors</h2>
            <p className="text-gray-600">
              Find qualified doctors based on specialty, location, and availability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">2. Book Appointment</h2>
            <p className="text-gray-600">
              Select a convenient date and time for your appointment.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">3. Get Treatment</h2>
            <p className="text-gray-600">
              Visit the doctor at your scheduled time and receive quality care.
            </p>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Book an Appointment?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of patients who have booked their appointments online.
          </p>
          <a 
            href="/doctors" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Doctors
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}