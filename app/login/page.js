'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, demoLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        setMessage('Login successful! Redirecting...');
        
        // Redirect to home or previous page
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setMessage(result.error || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role = 'patient') => {
    const result = demoLogin(role);
    if (result.success) {
      setMessage('Demo login successful! Redirecting...');
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setMessage('Demo login failed');
    }
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