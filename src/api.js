const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('cas_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
};

export const api = {
  auth: {
    register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  },
  companies: {
    getProfile: () => request('/companies/profile'),
    updateProfile: (data) => request('/companies/profile', { method: 'POST', body: JSON.stringify(data) }),
  },
  drivers: {
    updateProfile: (data) => request('/drivers/profile', { method: 'POST', body: JSON.stringify(data) }),
  },
  orders: {
    list: () => request('/orders'),
    create: (data) => request('/orders/create', { method: 'POST', body: JSON.stringify(data) }),
    fundWebhook: (id, data) => request(`/orders/${id}/fund-webhook`, { method: 'POST', body: JSON.stringify(data) }),
    dispatch: (id, data) => request(`/orders/${id}/dispatch`, { method: 'POST', body: JSON.stringify(data) }),
    cancel: (id, data) => request(`/orders/${id}/cancel`, { method: 'POST', body: JSON.stringify(data) }),
    confirmDelivery: (id) => request(`/orders/${id}/confirm-delivery`, { method: 'POST' }),
  },
  chat: {
    getMessages: (orderId) => request(`/chat/${orderId}`),
    sendMessage: (orderId, data) => request(`/chat/${orderId}/send`, { method: 'POST', body: JSON.stringify(data) }),
  },
  telemetry: {
    ping: (orderId, data) => request(`/telemetry/ping/${orderId}`, { method: 'POST', body: JSON.stringify(data) }),
  },
  compliance: {
    upload: (orderId, data) => request(`/compliance/upload/${orderId}`, { method: 'POST', body: JSON.stringify(data) }),
  },
};
