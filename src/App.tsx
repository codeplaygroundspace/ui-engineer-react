import { Suspense } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { projects } from './projects'
import Header from './components/Header'

export default function App() {
  const location = useLocation()
  const active = projects.find((p) => `/${p.slug}` === location.pathname)

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <Header />
      </div>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-(--border) px-4 py-8 overflow-y-auto">
        <h3 className="text-sm font-medium text-(--text) mb-4 px-2">Components</h3>
        <nav className="flex flex-col gap-0.5">
          {projects.map((p) => (
            <NavLink
              key={p.slug}
              to={`/${p.slug}`}
              className={({ isActive }) =>
                `block px-2 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'font-medium text-(--text-h) bg-(--accent-bg)'
                    : 'text-(--text-h) hover:bg-(--accent-bg)'
                }`
              }
            >
              {p.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen max-w-3xl mx-auto">
        {active && (
          <div className="px-10 pt-10 pb-4">
            <h1
              className="text-3xl font-semibold text-(--text-h) mb-2"
              style={{ margin: 0, fontSize: '30px', letterSpacing: '-0.5px' }}
            >
              {active.name}
            </h1>
            <p className="text-(--text) text-base mt-2">{active.description}</p>
          </div>
        )}
        <div className="mx-10 mt-4 rounded-xl border border-(--border) relative flex h-72 w-full items-center justify-center overflow-hidden">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
