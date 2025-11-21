import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Modal from 'react-modal';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Set the app element for react-modal accessibility (prevents console warning)
Modal.setAppElement('#root');
