import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// A reload should start at the top. Browsers otherwise restore the previous
// offset, which drops you into the middle of the cylinder with the ring
// already half-turned and the hero animation missed.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
