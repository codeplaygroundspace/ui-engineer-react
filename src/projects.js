import { lazy } from 'react'

export const projects = [
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'A floating pill menu that appears on click, letting users toggle between options with smooth blur and scale animations.',
    component: lazy(() => import('./pages/projects/PrivacyToggle.jsx')),
  },
]
