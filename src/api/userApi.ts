import axios from 'axios';
import axiosInstance from './axiosConfig';

const API_URL = 'http://localhost:3001';

interface SignupData {
  fullname : string;
  username: string;
  email: string;
  password: string;
}

export const signupUser = async (data: SignupData) => {
  const response = await axios.post('/api/auth/signup', data);
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/user/login', { 
      username, 
      password 
    });
    console.log(response);
    return response;
  } catch (error: any) {
    console.error('Login Error:', {
      error : error,
      message: error?.message,
      response: error?.response?.data
    });
    throw error;
  }
};

export const logoutUser = async () => {
  return axios.post(`${API_URL}/user/logout`);
};

export const refreshToken = async () => {
  return axios.get(`${API_URL}/user/refreshtoken`);
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  return axios.patch(`${API_URL}/user/changepassword`, { oldPassword, newPassword });
};

export const updateUserDetails = async (updatedDetails: any) => {
  return axios.patch(`${API_URL}/user/updateaccountdetails`, updatedDetails);
};

export const getUserAnalytics = async () => {
  return axios.get(`${API_URL}/user-analytics/analytics`);
};

