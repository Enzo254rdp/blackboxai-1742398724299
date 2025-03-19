import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; // Update with your actual API URL

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data; // Assuming the response contains the product data
};