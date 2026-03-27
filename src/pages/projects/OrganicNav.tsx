import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Droplets, Wind, Sun, Flower2 } from 'lucide-react'
import './OrganicNav.css'

interface NavItem {
  id: string
  icon: typeof Leaf
  label: string
  light: string
  dark: string
}

const items: NavItem[] = [
  { id: 'earth', icon: Leaf, label: 'Earth', light: '#5a8a68', dark: '#7ba68a' },
  { id: 'water', icon: Droplets, label: 'Water', light: '#5a5978', dark: '#6b6a8a' },
  { id: 'wind', icon: Wind, label: 'Wind', light: '#8a7d6f', dark: '#9a8b7a' },
  { id: 'light', icon: Sun, label: 'Light', light: '#b8903a', dark: '#d4a45a' },
  { id: 'bloom', icon: Flower2, label: 'Bloom', light: '#a85f6f', dark: '#c97b8b' },
]

// Organic border-radius shapes — no right angles
const blobShapes = [
  '60% 40% 55% 45% / 45% 60% 40% 55%',
  '45% 55% 40% 60% / 55% 45% 60% 40%',
  '55% 45% 60% 40% / 40% 55% 45% 60%',
  '40% 60% 45% 55% / 60% 40% 55% 45%',
  '50% 50% 45% 55% / 55% 50% 50% 45%',
]

const activeBlobShapes = [
  '65% 35% 60% 40% / 40% 65% 35% 60%',
  '40% 60% 35% 65% / 60% 40% 65% 35%',
  '60% 40% 65% 35% / 35% 60% 40% 65%',
  '35% 65% 40% 60% / 65% 35% 60% 40%',
  '55% 45% 50% 50% / 50% 55% 45% 50%',
]

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function Particles({ color, active }: { color: string; active: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 3,
        dx: `${(Math.random() - 0.5) * 40}px`,
        dy: `${-20 - Math.random() * 30}px`,
        duration: `${3 + Math.random() * 3}s`,
        delay: `${Math.random() * 3}s`,
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
      })),
    [],
  )

  if (!active) return null

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="on-particle"
          style={
            {
              width: p.size,
              height: p.size,
              background: color,
              left: p.left,
              top: p.top,
              '--dx': p.dx,
              '--dy': p.dy,
              '--duration': p.duration,
              '--delay': p.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}

const ambientParticles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 3,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  dx: `${(Math.random() - 0.5) * 100}px`,
  dy: `${-30 - Math.random() * 70}px`,
  duration: `${5 + Math.random() * 7}s`,
  delay: `${Math.random() * 6}s`,
}))

export default function OrganicNav() {
  const [active, setActive] = useState('earth')
  const [rippleKey, setRippleKey] = useState(0)
  const [rippleId, setRippleId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(() => {
    const root = document.documentElement
    return (
      root.classList.contains('dark') ||
      (!root.classList.contains('light') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })

  useEffect(() => {
    const root = document.documentElement
    const check = () => {
      setIsDark(
        root.classList.contains('dark') ||
          (!root.classList.contains('light') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches),
      )
    }

    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', check)

    return () => {
      observer.disconnect()
      mq.removeEventListener('change', check)
    }
  }, [])

  const c = (item: NavItem) => (isDark ? item.dark : item.light)
  const activeItem = items.find((i) => i.id === active) ?? items[0]

  const handleClick = (id: string) => {
    if (id === active) return
    setActive(id)
    setRippleId(id)
    setRippleKey((k) => k + 1)
  }

  return (
    <div
      className="organic-nav-wrapper relative flex items-center justify-center w-full h-full overflow-hidden transition-colors duration-700"
      data-theme={isDark ? 'dark' : 'light'}
      style={{ backgroundColor: 'var(--on-bg)' }}
    >
      {/* Ambient background particles — follow active item color */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ambientParticles.map((p) => (
          <div
            key={p.id}
            className="on-particle"
            style={
              {
                width: p.size,
                height: p.size,
                background: c(activeItem),
                left: p.left,
                top: p.top,
                '--dx': p.dx,
                '--dy': p.dy,
                '--duration': p.duration,
                '--delay': p.delay,
                opacity: 0.4,
                transition: 'background 0.6s ease',
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative flex items-center gap-3 z-10">
        {items.map((item, index) => {
          const isActive = active === item.id
          const isHovered = hoveredId === item.id
          const color = c(item)
          const Icon = item.icon

          return (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="on-nav-item relative flex flex-col items-center justify-center cursor-pointer outline-none border-none bg-transparent"
              style={
                {
                  '--breathe-delay': `${index * 0.6}s`,
                } as React.CSSProperties
              }
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {/* Active background blob */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="organic-blob"
                    className="absolute inset-[-8px] on-active-glow"
                    style={{
                      borderRadius: activeBlobShapes[index],
                      background: `radial-gradient(ellipse at center, ${hexToRgba(color, 0.13)} 0%, transparent 70%)`,
                    }}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      mass: 0.8,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Blob shape container */}
              <motion.div
                className="relative flex items-center justify-center overflow-visible"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: isActive
                    ? activeBlobShapes[index]
                    : blobShapes[index],
                  background:
                    isHovered && !isActive
                      ? hexToRgba(color, 0.1)
                      : isActive
                        ? 'transparent'
                        : 'var(--on-petal)',
                  border: isActive
                    ? '1.5px solid transparent'
                    : '1.5px solid transparent',
                  transition:
                    'border-radius 0.8s ease, background 0.4s ease, border 0.4s ease',
                }}
                animate={
                  isActive
                    ? {
                        borderRadius: [
                          activeBlobShapes[index],
                          activeBlobShapes[(index + 1) % 5],
                          activeBlobShapes[(index + 2) % 5],
                          activeBlobShapes[index],
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Ripple */}
                <AnimatePresence>
                  {rippleId === item.id && (
                    <div key={rippleKey} className="on-ripple" />
                  )}
                </AnimatePresence>

                {/* Particles floating from active item */}
                <Particles color={color} active={isActive} />

                {/* Icon */}
                <motion.div
                  animate={{
                    color:
                      isActive || isHovered ? color : 'var(--on-text-muted)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </motion.div>
              </motion.div>

              {/* Label */}
              <motion.span
                className="text-[10px] mt-1.5 font-medium tracking-wide"
                animate={{
                  color: isActive ? color : 'var(--on-text-muted)',
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.4 }}
              >
                {item.label}
              </motion.span>
            </motion.button>
          )
        })}
      </nav>
    </div>
  )
}
