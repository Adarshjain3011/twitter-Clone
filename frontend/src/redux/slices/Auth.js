import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService from '../../services/AuthService';


const initialState = {
  isLoading: false,
  data: [],
};

// Slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{

    setUserData :(state,action)=>{

      state.data.push(action.payload);

    }
  }
});

// Export the reducer

const {setUserData} = authSlice.actions ;

export default authSlice.reducer;




