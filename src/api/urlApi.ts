import axiosInstance from './axiosConfig';

const API_URL = 'http://localhost:3001';

export const shortenUrl = async (redirectURL: string) => {
  try {
    const response = await axiosInstance.post('/url', { 
      redirectURL
    });
    return response;
  } catch (error: any) {
    console.error('Login Error:', {
      message: error?.message,
      response: error?.response?.data
    });
    throw error;
  }
};

export const deleteUrl = async (shortId: string) => {
  return axiosInstance.delete(`${API_URL}/url/delete`, { data: { shortId } });
};

export const getUrlAnalytics = async (shortId: string) => {
  return axiosInstance.get(`${API_URL}/url/analytics/${shortId}`);
};

export const toggleUrlStatus = async (shortID: string, isActive: boolean) => {
  return axiosInstance.post(`${API_URL}/url/togglestatus`, { shortID, isActive });
};

export const updateUrl = async (shortId: string, newUrl: string) => {
  return axiosInstance.patch(`${API_URL}/url/update`, { shortId, newUrl });
};

export const getUserUrls = async () => {
  try {
    const response = await axiosInstance.get('/user-analytics/analytics',);
    return response;
  } catch (error: any) {
    console.error('Login Error:', {
      message: error?.message,
      response: error?.response?.data
    });
    throw error;
  }
};

