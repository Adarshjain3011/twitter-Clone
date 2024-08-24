import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/Auth";
import postSlice from "./slices/Post";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "@reduxjs/toolkit";

import checkTokenMiddleware from "./middleware/checkToken";

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(checkTokenMiddleware), // Add your custom middleware here
});

export default store;




// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "./slices/Auth";
// import postSlice from "./slices/Post";

// // Combine your reducers

// const rootReducer = combineReducers({
//   auth: authSlice,
//   post: postSlice,
// });

// // Configure your Redux store

// const store = configureStore({
//   reducer: rootReducer,

//   // You can add middleware, devTools, etc. here if needed

// });

// // Export the store as the default export

// export default store;


