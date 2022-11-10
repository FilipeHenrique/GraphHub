import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './routes';
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from './context/LoginContext';
import { SnackBarProvider } from './context/SnackContext';


ReactDOM.render(
    <BrowserRouter>
      <SnackBarProvider>
          <LoginProvider>
            <AppRoutes></AppRoutes>
          </LoginProvider>
      </SnackBarProvider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

