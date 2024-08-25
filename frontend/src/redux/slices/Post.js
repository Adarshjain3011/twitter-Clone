import { createSlice } from '@reduxjs/toolkit'

const initialState ={

    loading :false,
    data:null,
    error:null,

}

const postSlice = createSlice({

    name:"post",
    initialState,
    reducers:{

        setPostData : (state,action)=>{

            state.loading = false;
            state.data = action.payload;
            state.error = null;
        }
    }
})



export const {setPostData } = postSlice.actions;

export default postSlice.reducer ;

