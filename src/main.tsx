import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import { projects } from './projects'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to={`/${projects[0].slug}`} replace />} />
          {projects.map((p) => (
            <Route key={p.slug} path={p.slug} element={<p.component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
