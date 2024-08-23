import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService from '../../services/AuthService';

// Thunk for login authentication
export const authData = createAsyncThunk('auth-login', async (data, thunkAPI) => {
  try {
    const response = await AuthService.authLogin(data);
    return response;
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

// Thunk for verifying token
export const AuthToken = createAsyncThunk('auth-verify-token', async (_, thunkAPI) => {
  try {
    const response = await AuthService.authTokenLogin();
    return response;
  } catch (error) {
    const status = error.response ? error.response.status : null;
    return thunkAPI.rejectWithValue({ status, message: error.message });
  }
});

export const UserData = createAsyncThunk('get-user-data', async (_, thunkAPI) => {
  try {
    const response = await AuthService.getUserAllDetails();
    return response;
  } catch (error) {
    const status = error.response ? error.response.status : null;
    return thunkAPI.rejectWithValue({ status, message: error.message });
  }
});




// Initial state
const initialState = {
  isLoading: false,
  data: [],
  isError: null,
  isAuthenticated: false
};

// Slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      // authData pending
      .addCase(authData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      // authData fulfilled
      .addCase(authData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.data = action.payload;
        state.isAuthenticated = true;
        
      })
      // authData rejected
      .addCase(authData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // AuthToken pending
      .addCase(AuthToken.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      // AuthToken fulfilled
      .addCase(AuthToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.data = action.payload;
      })
      // AuthToken rejected
      .addCase(AuthToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

// Export the reducer
export default authSlice.reducer;


