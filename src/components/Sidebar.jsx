import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../projects'

export default function Sidebar() {
  return (
    <nav style={{
      width: 220,
      minHeight: '100svh',
      borderRight: '1px solid var(--border)',
      padding: '24px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--text)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '0 10px 16px',
      }}>
        Experiments
      </span>
      {projects.map(p => (
        <NavLink key={p.slug} to={`/${p.slug}`} style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <motion.div
              style={{
                padding: '7px 10px',
                borderRadius: 6,
                fontSize: 14,
                color: isActive ? 'var(--accent)' : 'var(--text)',
                background: isActive ? 'var(--accent-bg)' : 'transparent',
                cursor: 'pointer',
              }}
              whileHover={{ background: 'var(--accent-bg)', color: 'var(--text-h)' }}
              transition={{ duration: 0.12 }}
            >
              {p.name}
            </motion.div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
