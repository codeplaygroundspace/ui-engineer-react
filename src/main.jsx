import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import MagneticCursor from './pages/projects/MagneticCursor.jsx'
import StaggerReveal from './pages/projects/StaggerReveal.jsx'
import MorphButton from './pages/projects/MorphButton.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="magnetic-cursor" element={<MagneticCursor />} />
          <Route path="stagger-reveal" element={<StaggerReveal />} />
          <Route path="morph-button" element={<MorphButton />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
