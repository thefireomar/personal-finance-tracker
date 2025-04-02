import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post('/users/login', credentials);

export const register = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getTransactions = (userId) => api.get(`/transactions/user/${userId}`);
export const addTransaction = (transaction) => api.post('/transactions', transaction);
export const updateTransaction = (id, transaction) => api.put(`/transactions/${id}`, transaction);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export const getGoals = (userId) => api.get(`/goals/user/${userId}`);
export const addGoal = (goal) => api.post('/goals', goal);
export const updateGoalProgress = (id, currentAmount) => api.put(`/goals/${id}/progress`, { currentAmount });
export const deleteGoal = (id) => api.delete(`/goals/${id}`);

export default api;
