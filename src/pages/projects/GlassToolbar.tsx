import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, User, Sun, Moon } from 'lucide-react'
import './GlassToolbar.css'

type Tab = 'home' | 'search' | 'user'
type VisualTheme = 'gold' | 'techno' | 'matrix'

const tabs = [
  { id: 'home' as Tab, icon: Home, label: 'Home' },
  { id: 'search' as Tab, icon: Search, label: 'Search' },
  { id: 'user' as Tab, icon: User, label: 'User' },
]

const visualThemes: { id: VisualTheme; label: string }[] = [
  { id: 'gold', label: 'Gold' },
  { id: 'techno', label: 'Techno' },
  { id: 'matrix', label: 'Matrix' },
]

export default function GlassToolbar() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [visualTheme, setVisualTheme] = useState<VisualTheme>('gold')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div
      className="glass-toolbar-wrapper relative flex flex-col items-center justify-center w-full h-full rounded-xl overflow-hidden transition-colors duration-500"
      data-theme={theme}
      data-visual-theme={visualTheme}
      style={{ backgroundColor: 'var(--gt-bg-color)' }}
    >
      {/* Background effects */}
      <div className="gt-noise-overlay" />
      <div className="gt-ambient-glow" />

      {/* Toolbar */}
      <nav className="relative gt-glass-toolbar px-2 py-2 rounded-[24px] flex items-center gap-1 shadow-2xl z-10">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(tab.id)}
              className="relative w-12 h-12 flex items-center justify-center cursor-pointer group outline-none"
            >
              {/* Active indicator ring */}
              <AnimatePresence initial={false}>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-ring"
                    className="absolute inset-0 z-0"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      mass: 1,
                    }}
                  >
                    {/* Glow layer */}
                    <div className="absolute inset-[-4px] bg-[var(--gt-ring-glow)] opacity-15 blur-md rounded-[18px] transition-colors duration-500" />

                    {/* Clip container */}
                    <div className="absolute inset-0 overflow-hidden rounded-[18px]">
                      <div className="gt-golden-ring-gradient" />
                    </div>

                    {/* Inner plate */}
                    <div className="absolute inset-[2px] rounded-[16px] transition-colors duration-300 bg-[var(--gt-inner-plate)]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <tab.icon
                size={20}
                strokeWidth={1.5}
                className={`relative z-10 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-[var(--gt-ring-c2)]'
                    : 'text-[var(--gt-text-color)] opacity-50 group-hover:opacity-80'
                }`}
              />
            </button>

            {/* Divider */}
            {index < tabs.length - 1 && (
              <div className="w-[1px] h-4 bg-[var(--gt-text-color)] opacity-10 mx-1" />
            )}
          </div>
        ))}

        {/* Vertical divider */}
        <div className="w-[1px] h-8 bg-[var(--gt-text-color)] opacity-10 mx-2" />

        {/* Theme toggle */}
        <motion.button
          onClick={toggleTheme}
          whileTap={{ scale: 1.25 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="relative w-10 h-10 flex items-center justify-center cursor-pointer group outline-none bg-zinc-500/10 rounded-xl hover:bg-zinc-500/20 transition-colors ml-1"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute"
            >
              {theme === 'dark' ? (
                <Moon
                  size={20}
                  strokeWidth={1.5}
                  className="text-[var(--gt-text-color)] opacity-70 group-hover:opacity-100"
                />
              ) : (
                <Sun
                  size={20}
                  strokeWidth={1.5}
                  className="text-[var(--gt-text-color)] opacity-70 group-hover:opacity-100"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Visual theme tags */}
      <div className="flex gap-3 mt-6 z-10">
        {visualThemes.map((vTheme) => (
          <button
            key={vTheme.id}
            onClick={() => setVisualTheme(vTheme.id)}
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 border cursor-pointer ${
              visualTheme === vTheme.id
                ? 'bg-[var(--gt-ring-c2)] border-[var(--gt-ring-c2)] text-white shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                : 'border-[var(--gt-text-color)]/20 text-[var(--gt-text-color)]/40 hover:border-[var(--gt-text-color)]/40 hover:text-[var(--gt-text-color)]/60'
            }`}
          >
            {vTheme.label}
          </button>
        ))}
      </div>
    </div>
  )
}
