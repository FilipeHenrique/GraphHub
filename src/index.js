import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './routes';
import { BrowserRouter } from "react-router-dom";
import LoginContext, { LoginProvider } from './context/LoginContext';


ReactDOM.render(
    <BrowserRouter>
      <LoginProvider>
        <AppRoutes></AppRoutes>
      </LoginProvider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

