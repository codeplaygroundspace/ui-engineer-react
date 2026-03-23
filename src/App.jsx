import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function App() {
  return (
    <main>
      <div className="layout-container w-full flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 flex-col">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </main>
  )
}
