'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children, requireAdmin = false }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the JWT token from cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        
        if (!token) {
          router.push('/login');
          return;
        }

        // Verify token and check role if admin is required
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (requireAdmin && payload.role !== 'admin') {
            router.push('/');
            return;
          }
          setIsAuthorized(true);
        } catch (e) {
          console.error('Token verification error:', e);
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, requireAdmin]);

  if (isAuthorized === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthorized) {
    return children;
  }

  return null; // Will redirect before rendering
}