import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner';
import App from './App.jsx'
import "./sass/app.scss"

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Toaster />
    <App />
  </StrictMode>
)