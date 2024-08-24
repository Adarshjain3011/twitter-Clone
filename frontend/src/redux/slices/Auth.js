import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  isLoading: false,
  data: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUserData: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      toast.success('User authenticated successfully');
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    clearUserData: (state) => {
      state.isLoading = false;
      state.data = null;
      state.isAuthenticated = false;
      state.error = null;
      toast.info('User logged out');
    },
  },
});

export const { startLoading, setUserData, setError, clearUserData } = authSlice.actions;

export default authSlice.reducer;
