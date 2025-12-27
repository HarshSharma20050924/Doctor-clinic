// API service for frontend to communicate with backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status}`);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('API call error:', error);
    return { success: false, error: error.message };
  }
};

// Appointment API functions
export const appointmentAPI = {
  // Create a new appointment
  create: async (appointmentData) => {
    return apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  // Get appointments for a patient
  getByPatientId: async (patientId) => {
    return apiCall(`/appointments?patient_id=${patientId}`);
  },

  // Get all appointments (admin only)
  getAll: async () => {
    return apiCall('/appointments/all');
  },

  // Update appointment status (admin only)
  updateStatus: async (appointmentId, status) => {
    return apiCall(`/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Doctor API functions (if needed)
export const doctorAPI = {
  getAll: async () => {
    return apiCall('/doctors');
  },
  
  getById: async (id) => {
    return apiCall(`/doctors/${id}`);
  },
};

// Auth API functions (if needed)
export const authAPI = {
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};