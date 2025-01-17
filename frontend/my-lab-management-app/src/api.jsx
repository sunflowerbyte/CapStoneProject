import axios from 'axios';

// Set up the base URL for all API requests
const API = axios.create({
  baseURL: 'http://localhost:8080/api', // Backend base URL
});

// Interceptor to add token to headers for authenticated requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User registration
export const registerUser = (userData) => API.post('/auth/register', userData);

// User login
export const loginUser = (credentials) => 
  API.post('/auth/login', credentials).then((response) => response.data);

// Get maintenance requests
export const getMaintenance = () => API.get('/maintenance');

// Get inventory data
export const getInventory = () => API.get('/inventory');
