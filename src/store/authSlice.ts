import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}



interface LoginPayload {
  user?: User;
  accessToken: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem('accessToken'),
  },
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      // Store in localStorage
      localStorage.setItem('accessToken', action.payload.accessToken);
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;