# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev                # Start dev server (Vite, localhost:5173)
bun run build          # Production build
bun run lint           # ESLint
bun run format         # Prettier — format all src files
bun run format:check   # Prettier — check formatting (CI)
bun run preview        # Preview production build
bun tsc --noEmit       # Type-check without building
```

No test framework is configured.

## Architecture

This is a **UI component showcase** — a playground for demonstrating animated/interactive React components. Each "project" is a self-contained component displayed in a two-column layout (sidebar nav + main content).

### Adding a new project

1. Create the component in `src/pages/projects/`
2. Register it in `src/projects.js` — add an entry with `slug`, `name`, `description`, and a `lazy()` import

The router in `src/main.jsx` auto-generates routes from the `projects` array. The default route redirects to the first project in the list.

### Key files

- **`src/projects.js`** — single source of truth for all projects (slug, name, description, lazy component)
- **`src/App.jsx`** — layout shell: sidebar + `<Outlet />` for nested routes
- **`src/main.jsx`** — router setup, auto-generates routes from `projects`
- **`src/index.css`** — CSS variables for theming (light/dark/system via `prefers-color-scheme`)
- **`src/components/Header.jsx`** — theme switcher, persists to localStorage

### Stack

- **React 19** + **React Router 7** (nested routes, `<Outlet />`)
- **Vite 8** with Oxc parser (`@vitejs/plugin-react`)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, no separate config file)
- **Framer Motion** for JS-driven animations
- **Lucide React** for icons

### Styling approach

- Tailwind utility classes for layout/spacing
- CSS variables (defined in `index.css`) for theming: `--text`, `--bg`, `--accent`, `--border`, etc.
- Per-component CSS files for keyframe animations (e.g., `Navigation.css`, `PrivacyToggle.css`)
- No global state management — local `useState` only, plus URL state via React Router

### TypeScript

All source files use `.ts`/`.tsx`. A `tsconfig.json` is configured for strict mode with `noEmit: true` (Vite handles transpilation via esbuild). ESLint uses `typescript-eslint` for TS-aware linting.
