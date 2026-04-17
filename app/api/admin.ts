import api from './axios';

export const login = async (data: any) => {
  const response = await api.post('/admin/login', data);
  return response.data;
};

export const getStats = async () => {
  // Placeholder for stats endpoint if implemented, or aggregate from other calls
  // For now return mock data or implement a stats endpoint
  return {
    totalOrders: 1234,
    totalUsers: 567,
    revenue: 12345
  };
};

export const getUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

export const updateOrderStatus = async (id: number, status: string) => {
  const response = await api.patch(`/admin/orders/${id}`, { status });
  return response.data;
};

export const getMenu = async () => {
  const response = await api.get('/admin/menu');
  return response.data;
};

export const addMenuItem = async (data: any) => {
  const response = await api.post('/admin/menu', data);
  return response.data;
};

export const updateMenuItem = async (id: number, data: any) => {
  const response = await api.put(`/admin/menu/${id}`, data);
  return response.data;
};

export const deleteMenuItem = async (id: number) => {
  const response = await api.delete(`/admin/menu/${id}`);
  return response.data;
};

// Vendor API functions
export const getVendors = async () => {
  const response = await api.get('/vendors');
  return response.data;
};

export const getVendorById = async (vendorId: string) => {
  const response = await api.get(`/vendors/${vendorId}`);
  return response.data;
};

export const updateVendorStatus = async (vendorId: string, status: string) => {
  const response = await api.put(`/vendors/${vendorId}/verification-status`, { status });
  return response.data;
};

export const getVendorMeals = async (vendorId: string, page = 1, limit = 10) => {
  const response = await api.get(`/vendors/${vendorId}/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const getVendorOrders = async (vendorId: string, page = 1, limit = 10) => {
  // Try to get vendor orders - this endpoint may need to be created on backend
  try {
    const response = await api.get(`/admin/vendors/${vendorId}/orders?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    // If endpoint doesn't exist, return empty data
    console.warn('Vendor orders endpoint not available:', error);
    return { data: [], total: 0 };
  }
};
