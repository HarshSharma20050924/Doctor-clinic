'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set the JWT token in a cookie
        document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict`;
        setMessage('Login successful! Redirecting...');
        
        // Redirect to home or previous page
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role = 'patient') => {
    // For demo purposes, we'll set a mock token
    // In a real application, this would be handled by the backend
    const mockPayload = {
      id: '1',
      email: 'demo@example.com',
      role: role === 'admin' ? 'admin' : 'patient',
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    };
    
    // Create a mock JWT token (header.payload.signature format)
    const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(mockPayload));
    const mockToken = `${header}.${payload}.`;
    
    document.cookie = `token=${mockToken}; path=/; max-age=86400; samesite=strict`;
    setMessage('Demo login successful! Redirecting...');
    
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            {message && (
              <div className={`mt-4 p-3 rounded ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
          </form>
          
          <div className="mt-6">
            <p className="text-gray-600 text-center mb-4">Or try demo login:</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDemoLogin('patient')}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
              >
                Patient Demo
              </button>
              <button
                onClick={() => handleDemoLogin('admin')}
                className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              >
                Admin Demo
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}