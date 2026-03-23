import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../projects'

export default function Home() {
  return (
    <div className="flex-1 px-5 py-10">
      <div className="columns-3 gap-4">
        {projects.map(p => (
          <Link key={p.slug} to={`/${p.slug}`} className="block break-inside-avoid mb-4">
            <motion.div
              className={`w-full rounded-2xl overflow-hidden bg-gradient-to-br ${p.bg}`}
              style={{ aspectRatio: p.aspect }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
