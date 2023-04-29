import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { sportsStore } from './utils/store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

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
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
