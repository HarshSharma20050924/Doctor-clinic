'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setIsLoggedIn(true);
      // Check if user is admin (for simplicity, we'll check if there's a role in the token)
      try {
        const tokenValue = token.split('=')[1];
        const payload = JSON.parse(atob(tokenValue.split('.')[1]));
        if (payload.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (e) {
        console.log('Token parsing error', e);
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = '/';
  };

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
            {isLoggedIn && (
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
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
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