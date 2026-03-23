import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../projects'

function PreviewCard({ project }) {
  const { slug, name, tags, aspect, bg, component: Component } = project

  return (
    <Link to={`/${slug}`} className="block break-inside-avoid mb-4 group">
      <motion.div
        className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br ${bg}`}
        style={{ aspectRatio: aspect }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {Component && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="w-[200%] h-[200%] origin-top-left"
                style={{ transform: 'scale(0.5)' }}
              >
                <Component />
              </div>
            </div>
          </Suspense>
        )}

        {/* Label overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium">{name}</p>
          <div className="flex gap-1.5 mt-1">
            {tags.map(tag => (
              <span key={tag} className="text-white/60 text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="flex-1 px-5 py-10">
      <div className="columns-3 gap-4">
        {projects.map(p => (
          <PreviewCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}
