'use client';

import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const { user, loading, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <Link href="/" className="text-xl font-bold">
            DocAppoint
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/doctors" className="hover:text-blue-200 transition">
              Doctors
            </Link>
            {isAuthenticated && (
              <Link href="/my-appointments" className="hover:text-blue-200 transition">
                My Appointments
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="hover:text-blue-200 transition">
                Admin
              </Link>
            )}
          </div>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}