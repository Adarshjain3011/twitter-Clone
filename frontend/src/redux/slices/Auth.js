
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AuthService from "../../services/AuthService"

import { useNavigate } from "react-router-dom";




export const authData = createAsyncThunk("auth-login", async (data,thunkAPI) => {
    
    console.log("data is ",data);


    try {

        const response = await AuthService.authLogin(data);

        return response;


    } catch (error) {

        console.log(error);

        if(error.response){

            return thunkAPI.rejectWithValue(error.response.status);

        }

        return thunkAPI.rejectWithValue({ message:error.message }); // Reject with specific error payload

    }


})


export const AuthToken = createAsyncThunk("auth-verify-token", async (thunkAPI) => {
    
    console.log("data is ");


    try {

        const response = await AuthService.authTokenLogin();

        console.log("response ka data ",response);

        return response;


    } catch (error) {

        console.log(error);

        // if(error.response){

        //     console.log(error.response.status);

        //     return thunkAPI.rejectWithValue(error?.response?.status);

        // }

        console.log(error.response.status);
        

        return error.response.status;

        // return thunkAPI.rejectWithValue({ message:error.message }); // Reject with specific error payload

    }


})


const initialState = {

    isLoading: false,
    data: [],
    isError: null

}


const authSlice = createSlice({

    name: "auth",
    initialState,
    extraReducers: (builder) => {

        console.log("hellow fkjhifu hjguy ");

        builder.addCase(authData.pending, (state, action) => {

            state.isLoading = true;

            console.log("1");
        })
        builder.addCase(authData.fulfilled, (state, action) => {
            
            state.isLoading = false;
            state.isError = null;

            console.log("Payload: ", action);
        
            state.data = action.payload;

            console.log("satate ka data ",state.data);

        })

        builder.addCase(authData.rejected, (state, action) => {

            console.log("rejected state ");

            console.log("action ka data",action);

            state.isError = action.payload;

            console.log(state.isError);


        })

        builder.addCase(AuthToken.pending ,(state,action) =>{

            state.isLoading = true;

        })

        builder.addCase(AuthToken.fulfilled ,(state,action) =>{

            state.isLoading = false;

            state.isError = null;

            console.log("Payload: ", action);
        
            state.data = action.payload;

            console.log("satate ka data ",state.data);
            
        })

        builder.addCase(AuthToken.rejected ,(state,action) =>{

            console.log("rejected state ");

            console.log("action ka data",action);

            state.isError = action.payload;

            console.log(state.isError);

            
        })

    }

});


const { reducer } = authSlice;

export default reducer;






