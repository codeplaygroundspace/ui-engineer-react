import { useState, useEffect } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ThemeMode = 'dark' | 'light' | 'system'

interface ThemeOption {
  key: ThemeMode
  Icon: LucideIcon
}

const modes: ThemeOption[] = [
  { key: 'dark', Icon: Moon },
  { key: 'light', Icon: Sun },
  { key: 'system', Icon: Monitor },
]

function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  if (mode === 'dark') {
    root.classList.add('dark')
  } else if (mode === 'light') {
    root.classList.add('light')
  }
  // system: no class added — media query takes over
}

export default function Header() {
  const [theme, setTheme] = useState<ThemeMode>(
    () => (localStorage.getItem('theme') as ThemeMode) || 'system'
  )

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <header>
      <div className="flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1.5">
        {modes.map(({ key, Icon }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-150 cursor-pointer
              ${
                theme === key
                  ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
    </header>
  )
}
