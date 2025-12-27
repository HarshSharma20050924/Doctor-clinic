export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">DocAppoint</h3>
            <p className="text-gray-400">Booking made simple</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-300 transition">About</a>
            <a href="#" className="hover:text-blue-300 transition">Contact</a>
            <a href="#" className="hover:text-blue-300 transition">Privacy</a>
            <a href="#" className="hover:text-blue-300 transition">Terms</a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Doctor Appointment Booking System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}