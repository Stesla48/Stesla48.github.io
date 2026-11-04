import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { applyLang, applyTheme, readLang, readTheme } from './theme.js'
import './styles.css'

applyTheme(readTheme())
applyLang(readLang())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
