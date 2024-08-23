import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from "./redux/Store.js";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);


import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>

    <BrowserRouter>

      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

    </BrowserRouter>


  </Provider>

)



