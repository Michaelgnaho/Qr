import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Ensure this imports the correct Tailwind CSS file
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
