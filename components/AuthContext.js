'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for token and user info on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          // Verify token and get user info
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({
              id: payload.id,
              email: payload.email,
              role: payload.role || 'patient'
            });
          } catch (e) {
            console.error('Token parsing error:', e);
            // Token is invalid, remove it
            document.cookie = 'token=; Max-Age=0; path=/';
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
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
        // The backend sets the cookie automatically
        // Get the token from the cookie and set user info
        const token = getCookie('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({
            id: payload.id,
            email: payload.email,
            role: payload.role || 'patient'
          });
        }
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const logout = () => {
    // Remove the token cookie
    document.cookie = 'token=; Max-Age=0; path=/';
    setUser(null);
    router.push('/');
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // The backend sets the cookie automatically
        // Get the token from the cookie and set user info
        const token = getCookie('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({
            id: payload.id,
            email: payload.email,
            role: payload.role || 'patient'
          });
        }
        return { success: true, user: data };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const demoLogin = (role = 'patient') => {
    // For demo purposes, set a mock token and update user state directly
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
    
    setUser({
      id: mockPayload.id,
      email: mockPayload.email,
      role: mockPayload.role
    });
    
    return { success: true };
  };

  const value = {
    user,
    login,
    logout,
    register,
    demoLogin,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}