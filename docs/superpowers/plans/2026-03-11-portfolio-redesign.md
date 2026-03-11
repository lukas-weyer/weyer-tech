# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild weyer.tech from personal bio+portfolio into a pure project showcase with dark dramatic styling and immersive scroll.

**Architecture:** Single-page Next.js 14 (App Router) site. Hero section with CTA, followed by three full-viewport project sections with parallax screenshots and unique gradient backgrounds, ending with a minimal footer. Server components by default; client components only for framer-motion hooks (MotionDiv, ParallaxImage).

**Tech Stack:** Next.js 14, Tailwind CSS 3, DaisyUI 4 (token system only), Framer Motion 10, Inter font

**Spec:** `docs/superpowers/specs/2026-03-11-portfolio-redesign-design.md`

**Note:** No testing framework is configured in this project. Verification is done via `npm run build` (catches compilation errors) and visual checks with `npm run dev`.

---

## Chunk 1: Foundation & Cleanup

### Task 1: Update Tailwind config and DaisyUI theme

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Update DaisyUI theme colors and clean up config**

Replace the entire content of `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['var(--font-russo-one)', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#FF2D63',
          'primary-content': '#ffffff',
          secondary: '#a855f7',
          accent: '#22d3ee',
          'base-100': '#0a0a12',
          'base-200': '#12121e',
          'base-300': '#1e1e2e',
        },
      },
    ],
  },
};
```

Key changes from current config:
- Removed custom `colors.accent` (now in DaisyUI theme)
- Removed custom `backgroundImage` gradients (will be in globals.css)
- Updated DaisyUI base colors: `#0a0a12`, `#12121e`, `#1e1e2e`
- Added `accent: '#22d3ee'` (cyan) to theme
- Kept `font-logo` for nav/footer logo usage

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Compiles successfully (no Tailwind config errors)

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: update Tailwind/DaisyUI theme for dark dramatic design"
```

---

### Task 2: Rewrite globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with new styles**

Replace the entire content of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply antialiased;
  }

  ::selection {
    @apply bg-rose-500/30;
  }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent;
  }

  .section-container {
    @apply mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8;
  }

  .section-divider {
    @apply h-px w-full;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.06),
      transparent
    );
  }
}

@layer utilities {
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 8s ease-in-out 3s infinite;
  }

  .animate-float-slow {
    animation: float 6s ease-in-out 1.5s infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}
```

Key changes from current:
- Removed `.glass`, `.glass-strong` (unused in new design)
- Removed `.mesh-gradient` and `[data-theme='dark']` variant (gradient backgrounds are now per-component)
- Removed `.animate-glow` (unused)
- Updated `.gradient-text` to include `via-pink-500`
- Added `.section-divider` component class
- Added `.animate-float-slow`, `.animate-bounce-slow`
- Updated max-w from `5xl` to `6xl` in section-container
- Simplified animation keyframes

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Compiles successfully

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: rewrite globals.css for new dark dramatic design"
```

---

### Task 3: Update layout.js metadata

**Files:**
- Modify: `app/layout.js`

- [ ] **Step 1: Update metadata and remove unused font import**

Current `app/layout.js` imports `Russo_One` and uses it in body class. Update to:

```jsx
import { Inter, Russo_One } from 'next/font/google';
import './globals.css';
import Nav from './_components/nav';
import Footer from './_components/footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });
const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-russo-one',
});

export const metadata = {
  title: 'weyer.tech | Portfolio',
  description:
    'Buduję strony i aplikacje. Portfolio projektów webowych — Łukasz Weyer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" data-theme="dark">
      <body
        className={`${inter.className} ${russoOne.variable} bg-base-100 text-base-content antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

Changes:
- Updated `title` to `'weyer.tech | Portfolio'`
- Updated `description` to match new tagline/purpose
- Kept Russo One for nav/footer logo usage (the `font-logo` class)

- [ ] **Step 2: Commit**

```bash
git add app/layout.js
git commit -m "feat: update layout metadata for portfolio redesign"
```

---

### Task 4: Delete unused components and update page.js

**Files:**
- Delete: `app/_components/chatWindow.jsx`
- Delete: `app/_components/aboutCard.jsx`
- Delete: `app/_components/message.jsx`
- Delete: `app/_components/writing.jsx`
- Delete: `app/_components/themeController.jsx`
- Delete: `app/_components/projectCard.jsx`
- Modify: `app/page.js`

- [ ] **Step 1: Delete unused component files**

```bash
rm app/_components/chatWindow.jsx app/_components/aboutCard.jsx app/_components/message.jsx app/_components/writing.jsx app/_components/themeController.jsx app/_components/projectCard.jsx
```

- [ ] **Step 2: Rewrite page.js**

Replace the entire content of `app/page.js` with:

```jsx
import Hero from './_components/hero';
import Projects from './_components/projects';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
    </main>
  );
}
```

- [ ] **Step 3: Stub out projects.jsx to prevent build break**

Since `projectCard.jsx` was deleted but `projects.jsx` still imports it, replace `app/_components/projects.jsx` with a temporary stub:

```jsx
export default function Projects() {
  return null;
}
```

This stub will be replaced with the full implementation in Task 10.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: remove unused components, simplify page structure"
```

---

## Chunk 2: Navigation & Social Links

### Task 5: Update social links in socjals.jsx

**Files:**
- Modify: `app/_components/socjals.jsx`

- [ ] **Step 1: Replace social links with GitHub, LinkedIn, Email**

Replace the entire content of `app/_components/socjals.jsx` with:

```jsx
const links = [
  {
    href: 'https://github.com/lukas-weyer',
    label: 'GitHub',
    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    href: 'https://www.linkedin.com/in/lukaszweyer',
    label: 'LinkedIn',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    href: 'mailto:kontakt@weyer.tech',
    label: 'Email',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
];

export default function Socjals() {
  return (
    <div className="flex items-center gap-3">
      {links.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target={label === 'Email' ? undefined : '_blank'}
          rel={label === 'Email' ? undefined : 'noopener noreferrer'}
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full text-base-content/50 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d={icon} />
          </svg>
        </a>
      ))}
    </div>
  );
}
```

Changes from current:
- Replaced Twitter, YouTube, Facebook, Instagram with GitHub, LinkedIn, Email
- Email link uses `mailto:` (no target="_blank")
- Updated hover classes from `hover:bg-primary/10 hover:text-primary` to `hover:bg-white/10 hover:text-white` (better for dark theme)

- [ ] **Step 2: Commit**

```bash
git add app/_components/socjals.jsx
git commit -m "feat: update social links to GitHub, LinkedIn, Email"
```

---

### Task 6: Update nav.jsx

**Files:**
- Modify: `app/_components/nav.jsx`

- [ ] **Step 1: Rewrite nav with glassmorphism styling**

Replace the entire content of `app/_components/nav.jsx` with:

```jsx
import Logo from './logo';
import Socjals from './socjals';

export default function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-base-100/70 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Logo className="h-auto w-7" />
          <span className="font-logo text-sm tracking-wide">
            weyer<span className="gradient-text">.tech</span>
          </span>
        </a>
        <Socjals />
      </div>
    </nav>
  );
}
```

Changes from current:
- Replaced `border-base-content/5` with `border-white/5` (explicit, not token-dependent)
- Added gradient on ".tech" text in logo

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Compiles successfully

- [ ] **Step 3: Commit**

```bash
git add app/_components/nav.jsx
git commit -m "feat: update nav with gradient logo text"
```

---

## Chunk 3: Hero Section

### Task 7: Rewrite hero.jsx

**Files:**
- Modify: `app/_components/hero.jsx`

- [ ] **Step 1: Rewrite hero with tagline, CTA, glow orbs**

Replace the entire content of `app/_components/hero.jsx` with:

```jsx
import { MotionDiv } from './motionDiv';

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Glow orbs */}
      <div className="animate-float pointer-events-none absolute left-[10%] top-[15%] h-[400px] w-[400px] rounded-full bg-rose-500/[0.15] blur-[80px]" />
      <div className="animate-float-delayed pointer-events-none absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-purple-500/[0.12] blur-[80px]" />
      <div className="animate-float-slow pointer-events-none absolute bottom-[10%] left-[30%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.08] blur-[60px]" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-[72px]">
            weyer<span className="gradient-text">.tech</span>
          </h1>
        </MotionDiv>

        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="mt-6 text-base font-light text-white/50 md:text-lg">
            Buduję strony i aplikacje. Masz pomysł? Odezwij się.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="mailto:kontakt@weyer.tech"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,45,99,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,45,99,0.4)]"
          >
            Napisz do mnie
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </MotionDiv>
      </div>

      {/* Scroll indicator */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[3px] text-white/20">
            scroll
          </span>
          <div className="animate-bounce-slow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white/20"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </MotionDiv>
    </header>
  );
}
```

Key changes from current hero:
- Removed avatar image and LogoSM import
- Replaced subtitle with tagline
- Added CTA button with gradient + glow
- Updated glow orb sizes and colors to match spec
- Changed h1 from `font-logo` (Russo One) to `font-extrabold` (Inter 800)
- Added scroll indicator with bounce animation

- [ ] **Step 2: Verify with dev server**

Run: `npm run dev`
Check: Open http://localhost:3000, verify hero renders with logo, tagline, CTA, glow orbs, scroll indicator

- [ ] **Step 3: Commit**

```bash
git add app/_components/hero.jsx
git commit -m "feat: rewrite hero with tagline, CTA, and glow orbs"
```

---

## Chunk 4: Project Sections

### Task 8: Create parallaxImage.jsx client component

**Files:**
- Create: `app/_components/parallaxImage.jsx`

- [ ] **Step 1: Create the parallax image client component**

Create `app/_components/parallaxImage.jsx`:

```jsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxImage({ src, alt, width, height, placeholder }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <motion.div style={{ y }}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 500}
            className="h-auto w-full object-cover"
          />
        ) : (
          <div
            className={`flex aspect-video w-full items-center justify-center text-sm text-white/15 ${placeholder || 'bg-gradient-to-br from-white/[0.03] to-white/[0.06]'}`}
          >
            {alt}
          </div>
        )}
      </motion.div>
    </div>
  );
}
```

This is a `'use client'` component because it uses `useScroll` and `useTransform` hooks from framer-motion. It accepts an optional `src` prop — when absent, renders a gradient placeholder (used for ivobeauty until a screenshot is provided).

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Compiles successfully

- [ ] **Step 3: Commit**

```bash
git add app/_components/parallaxImage.jsx
git commit -m "feat: add ParallaxImage client component for scroll effects"
```

---

### Task 9: Create projectSection.jsx

**Files:**
- Create: `app/_components/projectSection.jsx`

- [ ] **Step 1: Create the project section component**

Create `app/_components/projectSection.jsx`:

```jsx
import { MotionDiv } from './motionDiv';
import ParallaxImage from './parallaxImage';

const fadeLeft = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -40 },
};

const fadeRight = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 40 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
  hidden: {},
};

export default function ProjectSection({ project, index }) {
  const { title, description, tech, url, img, alt, gradient } = project;
  const number = String(index + 1).padStart(2, '0');
  const isReversed = index % 2 !== 0;

  return (
    <>
      <div className="section-divider" />
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-16">
        {/* Background gradient unique per project */}
        <div className={`pointer-events-none absolute inset-0 opacity-60 ${gradient}`} />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <MotionDiv
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${isReversed ? 'lg:[direction:rtl]' : ''}`}
          >
            {/* Info column */}
            <MotionDiv
              variants={isReversed ? fadeRight : fadeLeft}
              transition={{ duration: 0.6 }}
              className={`relative ${isReversed ? 'lg:[direction:ltr]' : ''}`}
            >
              {/* Big number */}
              <span className="pointer-events-none absolute -left-2 -top-5 select-none text-[120px] font-black leading-none max-lg:text-[80px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {number}
              </span>

              <div className="relative">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[4px] text-white/30">
                  Projekt {number}
                </p>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-[42px] md:leading-tight">
                  {title}
                </h2>
                <p className="mb-6 text-base leading-relaxed text-white/50">
                  {description}
                </p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium text-white/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-rose-500 transition-all duration-300 hover:gap-3.5"
                >
                  Zobacz projekt
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform duration-300"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </MotionDiv>

            {/* Screenshot column */}
            <MotionDiv
              variants={isReversed ? fadeLeft : fadeRight}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={isReversed ? 'lg:[direction:ltr]' : ''}
            >
              <ParallaxImage
                src={img}
                alt={alt}
                width={800}
                height={500}
                placeholder={!img ? gradient : undefined}
              />
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
```

This component:
- Renders a full-viewport section for each project
- Alternates layout direction based on index (even = normal, odd = reversed)
- Shows large ghost number in background ("01", "02", "03")
- Uses `MotionDiv` for whileInView animations (fade + slide)
- Uses `ParallaxImage` for the screenshot with scroll parallax
- Applies unique gradient background per project
- On mobile/tablet (<lg), always shows single column (screenshot above text)

- [ ] **Step 2: Commit**

```bash
git add app/_components/projectSection.jsx
git commit -m "feat: add ProjectSection component for immersive project display"
```

---

### Task 10: Rewrite projects.jsx

**Files:**
- Modify: `app/_components/projects.jsx`

- [ ] **Step 1: Rewrite projects.jsx with immersive sections**

Replace the entire content of `app/_components/projects.jsx` with:

```jsx
import ProjectSection from './projectSection';

const projects = [
  {
    title: 'socoLab',
    description:
      'Strona internetowa gdańskiej agencji kreatywnej SocoLab. Nowoczesny design z płynnymi animacjami i responsywnym layoutem.',
    tech: ['JavaScript', 'Gatsby.js'],
    url: 'https://www.socolab.com.pl',
    img: '/projects/proj-socolab-2.png',
    alt: 'socoLab — strona agencji kreatywnej',
    gradient:
      'bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,45,99,0.12),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(168,85,247,0.08),transparent_50%)]',
  },
  {
    title: 'ivobeauty',
    description:
      'Strona internetowa salonu kosmetycznego ivobeauty.co.uk. Elegancki design dopasowany do branży beauty.',
    tech: ['JavaScript', 'Next.js'],
    url: 'https://ivobeauty.co.uk',
    img: null,
    alt: 'ivobeauty — salon kosmetyczny',
    gradient:
      'bg-[radial-gradient(ellipse_at_80%_30%,rgba(168,85,247,0.12),transparent_60%),radial-gradient(ellipse_at_20%_70%,rgba(59,130,246,0.08),transparent_50%)]',
  },
  {
    title: 'Szeroki Kąt Widzenia',
    description:
      'Strona projektu realizowanego przez Stowarzyszenie Szeroki Kąt Widzenia. Platforma prezentująca działalność artystyczną.',
    tech: ['JavaScript', 'Gatsby.js'],
    url: 'https://kolodion.netlify.app/',
    img: '/projects/proj-kolodion.png',
    alt: 'Szeroki Kąt Widzenia — stowarzyszenie',
    gradient:
      'bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,211,238,0.1),transparent_60%),radial-gradient(ellipse_at_10%_30%,rgba(99,102,241,0.08),transparent_50%)]',
  },
];

export default function Projects() {
  return (
    <div>
      {projects.map((project, index) => (
        <ProjectSection key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
```

Changes from current:
- Removed all framer-motion animation code (moved to ProjectSection)
- Removed grid layout (each project is now a full section)
- Added `gradient` property to each project for unique background
- Added ivobeauty as project #2 with `img: null` (placeholder)
- Updated project descriptions
- Simplified to a simple loop rendering ProjectSection components

- [ ] **Step 2: Verify with dev server**

Run: `npm run dev`
Check: Open http://localhost:3000, scroll through all 3 project sections. Verify:
- Alternating layout (socoLab info left, ivobeauty info right, Szeroki Kąt info left)
- Unique gradient backgrounds
- Large ghost numbers ("01", "02", "03")
- Screenshots with parallax (gradient placeholder for ivobeauty)
- Fade+slide animations on scroll

- [ ] **Step 3: Commit**

```bash
git add app/_components/projects.jsx
git commit -m "feat: rewrite projects with immersive full-viewport sections"
```

---

## Chunk 5: Footer & Final Verification

### Task 11: Rewrite footer.jsx

**Files:**
- Modify: `app/_components/footer.jsx`

- [ ] **Step 1: Rewrite footer**

Replace the entire content of `app/_components/footer.jsx` with:

```jsx
import Logo from './logo';
import Socjals from './socjals';

export default function Footer() {
  return (
    <>
      <div className="section-divider" />
      <footer className="bg-base-100 py-12">
        <div className="section-container flex flex-col items-center gap-6">
          <Logo className="h-auto w-6 opacity-40" />
          <Socjals />
          <p className="text-xs text-white/20">
            {new Date().getFullYear()} &copy; Łukasz Weyer
          </p>
        </div>
      </footer>
    </>
  );
}
```

Changes from current:
- Added `section-divider` before footer
- Removed `border-t` (replaced by section-divider)
- Changed text color from `text-base-content/40` to `text-white/20`
- Changed font size from `text-sm` to `text-xs`

- [ ] **Step 2: Commit**

```bash
git add app/_components/footer.jsx
git commit -m "feat: update footer with section divider and minimal styling"
```

---

### Task 12: Final build verification

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Compiles successfully with no errors

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: No errors (warnings acceptable)

- [ ] **Step 3: Visual verification with dev server**

Run: `npm run dev`
Check at http://localhost:3000:

1. **Nav**: Fixed at top, glassmorphism backdrop, logo with gradient ".tech", GitHub/LinkedIn/Email icons
2. **Hero**: Full viewport, "weyer.tech" in Inter 800 with gradient, tagline, CTA button with glow, 3 floating orbs, scroll indicator
3. **Project 1 (socoLab)**: Info left, screenshot right, rose+purple gradient bg, "01" ghost number, tech badges, "Zobacz projekt" link
4. **Project 2 (ivobeauty)**: Reversed layout (info right, screenshot left), purple+blue gradient, gradient placeholder for screenshot
5. **Project 3 (Szeroki Kąt)**: Info left, screenshot right, cyan+indigo gradient
6. **Footer**: Logo, social icons, copyright
7. **Animations**: Hero stagger entrance, scroll-triggered project reveals, parallax on screenshots
8. **Responsive**: Check at 375px (mobile) and 768px (tablet) — single column, adapted font sizes

- [ ] **Step 4: Final commit if any adjustments needed**

```bash
git add -A
git commit -m "fix: final adjustments after visual review"
```
