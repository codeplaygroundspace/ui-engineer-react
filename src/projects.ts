import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export interface Project {
  slug: string
  name: string
  description: string
  component: LazyExoticComponent<ComponentType>
  tags?: string[]
  aspect?: string
  bg?: string
}

export const projects: Project[] = [
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description:
      'A floating pill menu that appears on click, letting users toggle between options with smooth blur and scale animations.',
    component: lazy(() => import('./pages/projects/PrivacyToggle')),
  },
  {
    slug: 'navigation',
    name: 'Navigation',
    description:
      'A jumping gooey dot navigation with spring-based sliding and squash-stretch animations.',
    component: lazy(() => import('./pages/projects/Navigation')),
  },
  {
    slug: 'glass-toolbar',
    name: 'Glass Toolbar',
    description:
      'A glassmorphism toolbar with animated conic-gradient active ring, theme toggle, and swappable visual themes.',
    component: lazy(() => import('./pages/projects/GlassToolbar')),
  },
]
