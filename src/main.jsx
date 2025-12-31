import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import { Store } from './Redux/Store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={Store}>
    <App />
    <ToastContainer  position="top-center"
        autoClose={3000}       
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
