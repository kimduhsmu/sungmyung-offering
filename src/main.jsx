import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { OfferingProvider } from './context/OfferingContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <OfferingProvider>
        <App />
      </OfferingProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
