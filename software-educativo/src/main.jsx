// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import  "./index.css"
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Toaster toastOptions={{
    success: {
      style: {
        background: '#171717',
        color:"#fff"
      },
    },
    error: {
      style: {
         background: '#171717',
        color:"#fff"
      },
    },
  }} />
    
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);