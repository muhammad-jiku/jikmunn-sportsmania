import React from 'react';
import ReactDOM from 'react-dom/client';
//  external imports
import { Provider } from 'react-redux';
import { theme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import AlertTemplate from 'react-alert-template-basic';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
//  internal imports
import './index.css';
import App from './App';
import { sportsStore } from './utils/store';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={sportsStore}>
          <HelmetProvider>
            <AlertProvider template={AlertTemplate} {...options}>
              <App />
            </AlertProvider>
          </HelmetProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
