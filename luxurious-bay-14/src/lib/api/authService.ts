import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update with your actual API URL

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // Assuming the response contains the user and token
};

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data; // Assuming the response contains the user and token
};