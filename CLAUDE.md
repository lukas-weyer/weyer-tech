# CLAUDE.md

## Project Overview

Personal portfolio website for Łukasz Weyer (weyer.tech). A single-page Next.js application showcasing professional background and projects. All user-facing content is written in **Polish**.

## Tech Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: JavaScript/JSX (no TypeScript)
- **Styling**: Tailwind CSS 3 + DaisyUI 4 component library + `@tailwindcss/typography`
- **Animations**: Framer Motion 10
- **Font**: Inter (body, via `next/font`) + Russo One (logo, via CSS import)
- **Package Manager**: npm
- **Node**: Standard Next.js requirements

## Project Structure

```
weyer-tech/
├── app/
│   ├── _components/       # All React components (underscore = non-route)
│   │   ├── aboutCard.jsx
│   │   ├── articleImage.jsx
│   │   ├── chatWindow.jsx
│   │   ├── footer.jsx
│   │   ├── hero.jsx
│   │   ├── logo.jsx          # Large SVG logo
│   │   ├── logoSM.jsx        # Small animated SVG logo
│   │   ├── message.jsx
│   │   ├── motionDiv.jsx     # Client wrapper for framer-motion <motion.div>
│   │   ├── motionPath.jsx    # Client wrapper for framer-motion <motion.path>
│   │   ├── nav.jsx
│   │   ├── projectCard.jsx
│   │   ├── projects.jsx      # Contains hardcoded project data array
│   │   ├── socjals.jsx       # Social media link icons
│   │   ├── themeController.jsx  # Light/dark theme toggle (client component)
│   │   └── writing.jsx       # Typing indicator animation
│   ├── globals.css            # Tailwind directives + Russo One font import
│   ├── icon.png               # Favicon
│   ├── layout.js              # Root layout (Nav + Footer + page fade-in)
│   └── page.js                # Homepage: Hero → ChatWindow → AboutCard → Projects
├── public/
│   ├── projects/              # Project screenshot images
│   ├── logo.svg
│   └── *.png, *.jpg           # Static images
├── next.config.js             # Minimal (empty config object)
├── tailwind.config.js         # Custom fonts, gradients, DaisyUI themes
├── postcss.config.js
├── jsconfig.json              # Path alias: @/* → ./*
├── .prettierrc.json
└── package.json
```

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Next.js ESLint
```

## Code Conventions

### Component Patterns

- **Server components by default** — most components have no `'use client'` directive.
- **Client components** are marked with `'use client'` at the top: `motionDiv.jsx`, `motionPath.jsx`, `themeController.jsx`.
- **Framer Motion wrappers**: `MotionDiv` and `MotionPath` are thin client-component wrappers so server components can use framer-motion props without becoming client components themselves.
- Components live in `app/_components/` (the underscore prefix prevents Next.js from treating it as a route segment).

### File Naming

- Component files use **camelCase**: `aboutCard.jsx`, `chatWindow.jsx`, `projectCard.jsx`.
- Component exports use **PascalCase**: `AboutCard`, `ChatWindow`, `ProjectCard`.

### Styling

- All styling uses **Tailwind CSS utility classes** inline in JSX.
- **DaisyUI** component classes are used extensively (`card`, `btn`, `badge`, `avatar`, `toggle`, etc.).
- Theme system uses DaisyUI's built-in theming with two themes: `winter` (light) and `dark`.
- Theme preference is persisted in `localStorage` and respects system color scheme as fallback.
- Custom font family `font-logo` is defined in `tailwind.config.js` for the "Russo One" font.

### Formatting (Prettier)

- Single quotes
- Trailing commas (all)
- Semicolons
- 2-space indentation
- Tailwind class sorting via `prettier-plugin-tailwindcss`

### Imports

- Path alias `@/` maps to the project root (configured in `jsconfig.json`).
- Next.js `Image` component is used for all images (with explicit `width`/`height`).
- Framer-motion is only imported in client components (`motionDiv.jsx`, `motionPath.jsx`).

### Animation Patterns

- **Page transitions**: Fade-in on initial load via `MotionDiv` in root layout.
- **Staggered reveals**: Container/item variant pattern in `ChatWindow` for sequential message appearance.
- **Scroll-triggered**: `whileInView` prop on project cards for reveal-on-scroll.
- **SVG animation**: `MotionPath` with `pathLength` for logo draw animation.

## Architecture Notes

- **No database or API** — all content (projects, bio text) is hardcoded in component files.
- **No testing framework** is configured.
- **No CI/CD pipeline** is configured.
- **No environment variables** are currently used.
- **Single-page app** — only one route (`/`) exists.
- **Deployment**: `.gitignore` includes `.vercel`, indicating Vercel as the deployment target.
- **Language locale**: HTML lang is set to `pl-PL`.
