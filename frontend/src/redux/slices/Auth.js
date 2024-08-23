// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  isLoading: false,
  data: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      toast.success('User authenticated successfully');
    },
    clearUserData: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      toast.info('User logged out');
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;

export default authSlice.reducer;


