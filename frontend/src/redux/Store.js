import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/Auth.js'

import postReducer from "./slices/Post.js"

export const store = configureStore({
  reducer: {

    auth: authReducer,
    post: postReducer,

  },

})










