import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import PostServices from "../../services/PostService";

import { useNavigate } from 'react-router-dom';


export const createPost =  createAsyncThunk("createPost",async(data,thunkAPI)=>{

    try{

        const response = await PostServices.createPost(data);

        console.log("cerated post ka data ",response);
        return response;

    }

    catch (error) {

        console.log(error);

        if(error.response){

            return thunkAPI.rejectWithValue(error.response.status);

        }

        return thunkAPI.rejectWithValue({ message:error.message }); // Reject with specific error payload

    }

})



export const displayAllUserPost = createAsyncThunk("displayAllUserPost", async(thunkAPI)=>{


    try{

        const response = await PostServices.getAlluserPosts();

        console.log("get all user posts ",(response.data).data.posts);

        return ((response.data).data.posts);

    }
    catch(error){

        console.log(error);

        if(error.response){

            return thunkAPI.rejectWithValue(error.response.status);

        }

        return thunkAPI.rejectWithValue({ message:error.message }); // Reject with specific error payload

    }
})




const initialState ={

    loading :false,
    data:[],
    isError:false

}



const postSlice = createSlice({

    name:"post",
    initialState,
    extraReducers: (builder) =>{

        console.log("post ke extrareducer ke andar ");

        builder.addCase(createPost.pending, (state, action)=>{

            state.loading = true;


        })

        builder.addCase(createPost.fulfilled, (state, action)=>{

            state.loading = false;

            isError = false;

            console.log("action ka data ",action);

            
            state.data = action.payload;

            console.log("satate ka data ",state.data);


        })

        builder.addCase(createPost.rejected, (state,action)=>{

            state.loading = false;

            // state.isError = actio

            console.log(action);



        })

        builder.addCase(displayAllUserPost.pending, (state, action)=>{

            state.loading = true;


        })

        builder.addCase(displayAllUserPost.fulfilled, (state,action)=>{

            state.loading = false;

            // isError = false;

            console.log("action ka data ",action.payload);

            
            state.data = action.payload;

            console.log("satate ka data ",state.data);


        })

        builder.addCase(displayAllUserPost.rejected, (state,action)=>{

            state.loading = false;

            // state.isError = actio

            console.log(action);



        })
    
    }
})



const { reducer } = postSlice;

export default reducer;




