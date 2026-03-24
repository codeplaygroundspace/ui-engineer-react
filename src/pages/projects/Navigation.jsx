import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import './Navigation.css'

const items = ['All', 'Design', 'Engineering', 'Product', 'Research']

export default function Navigation() {
  const [active, setActive] = useState('All')
  const [dotX, setDotX] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [jumpHeight, setJumpHeight] = useState(40)
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const dotRef = useRef(null)
  const prevX = useRef(0)

  const getDotTarget = useCallback((label) => {
    const el = itemRefs.current[label]
    if (!el || !navRef.current) return 0
    return el.offsetLeft - 20
  }, [])

  // Position dot on mount and resize
  useEffect(() => {
    const position = () => {
      const x = getDotTarget(active)
      setDotX(x)
      prevX.current = x
    }

    position()
    window.addEventListener('resize', position)
    return () => window.removeEventListener('resize', position)
  }, [active, getDotTarget])

  function handleClick(label) {
    if (label === active) return

    const targetX = getDotTarget(label)
    const distance = Math.abs(targetX - prevX.current)
    const height = Math.min(Math.max(distance * 0.35, 30), 100)

    setJumpHeight(height)
    setActive(label)
    setDotX(targetX)
    prevX.current = targetX

    // Restart jump animation
    setIsJumping(false)
    requestAnimationFrame(() => {
      setIsJumping(true)
    })
  }

  function handleAnimationEnd() {
    setIsJumping(false)
  }

  return (
    <div className="gooey-nav">
      <nav className="gooey-nav-container" ref={navRef}>
        {items.map((label) => (
          <div
            key={label}
            ref={(el) => { itemRefs.current[label] = el }}
            className={`gooey-nav-item${active === label ? ' active' : ''}`}
            onClick={() => handleClick(label)}
          >
            {label}
          </div>
        ))}

        {/* Animated dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            zIndex: 20,
          }}
          animate={{ x: dotX }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
        >
          <div
            ref={dotRef}
            className={`gooey-dot${isJumping ? ' is-jumping' : ''}`}
            style={{ '--jump-height': `${jumpHeight}px` }}
            onAnimationEnd={handleAnimationEnd}
          />
        </motion.div>
      </nav>
    </div>
  )
}
