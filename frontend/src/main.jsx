import React from 'react';
import ReactDOM from 'react-dom/client';
import router from "./router"; // Imported as an instance
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import App from './App'; // Import App

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
);
