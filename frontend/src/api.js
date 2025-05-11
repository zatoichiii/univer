import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getProducts = () => api.get('/products');
export const addProduct = (data, token) => api.post('/products', data, {
  headers: { Authorization: `Bearer ${token}` },
});