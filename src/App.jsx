import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
