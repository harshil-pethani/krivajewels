import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './CSS/index.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { LoaderProvider } from './Contexts/LoaderContext.jsx'
import LoadingOverlay from './Components/LoadingOverlay.jsx'
import { ConfirmationProvider } from './Contexts/ConfirmationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <ConfirmationProvider>
          <LoadingOverlay />
          <App />
        </ConfirmationProvider>
      </LoaderProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
