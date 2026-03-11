# Portfolio Redesign — weyer.tech

## Cel

Gruntowna przebudowa strony weyer.tech z osobistego portfolio (bio + projekty) na czyste portfolio projektów. Nowy design: ciemny, dramatyczny, immersyjny.

## Decyzje projektowe

- **Styl**: Ciemny & dramatyczny — głębokie ciemne tło (#0a0a12), mocne gradienty (rose → purple), glassmorphism, glow orbs, efekty blur
- **Layout projektów**: Immersive scroll — każdy projekt jako pełnoekranowa sekcja (~100vh), smooth scroll z parallax, unikalne gradienty per projekt, duża numeracja ("01", "02", "03")
- **Struktura**: Hero → Projekty → Footer. Zero sekcji "o mnie".
- **Tagline**: "Buduję strony i aplikacje. Masz pomysł? Odezwij się."
- **Scroll**: Natywny smooth scroll (CSS `scroll-behavior: smooth`), bez scroll-snap. Sekcje ~100vh ale nie przyciągane — użytkownik scrolluje naturalnie.

## Projekty (3)

1. **socoLab** — strona gdańskiej agencji kreatywnej (JavaScript, Gatsby.js) — socolab.com.pl — screenshot: `proj-socolab-2.png`
2. **ivobeauty** — strona salonu kosmetycznego (JavaScript, Next.js) — ivobeauty.co.uk — screenshot: placeholder gradient (do uzupełnienia prawdziwym screenshotem)
3. **Stowarzyszenie Szeroki Kąt Widzenia** — strona projektu artystycznego (JavaScript, Gatsby.js) — kolodion.netlify.app — screenshot: `proj-kolodion.png`

## Struktura strony

### 1. Nav (fixed)
- Logo "weyer.tech" z lewej (gradient na ".tech")
- Social linki z prawej (GitHub, LinkedIn, Email)
- Glassmorphism tło (backdrop-blur + przezroczysty bg)
- Border-bottom 1px rgba(255,255,255,0.05)

### 2. Hero (100vh)
- Wyśrodkowany content
- Logo "weyer.tech" — font-size 72px (mobile: 40px), font Inter weight 800, gradient na ".tech" (nie Russo One — Inter lepiej obsługuje grube wagi)
- Tagline pod spodem — font-size 18px, font-weight 300, rgba(255,255,255,0.5)
- CTA button "Napisz do mnie" — gradient background (rose→purple), border-radius 50px, glow box-shadow, strzałka →, linkuje do `mailto:kontakt@weyer.tech`
- 3 dekoracyjne glow orbs w tle (rose, purple, blue) z animacją float
- Scroll indicator na dole ("scroll" + animowana strzałka)

### 3. Sekcje projektów (każda ~100vh)
- Alternujący układ: projekt 1 (info lewo, screenshot prawo), projekt 2 (odwrócony), projekt 3 (normalny)
- Duża numeracja w tle ("01", "02", "03") — font-size 120px, font-weight 900, bardzo niska opacity (gradient 8% → 2%)
- Label "Projekt 0X" — uppercase, letter-spacing 4px, niska opacity
- Tytuł — font-size 42px, font-weight 800
- Opis — font-size 16px, rgba(255,255,255,0.5)
- Tech stack badges — pill-shaped, rgba(255,255,255,0.06) bg + rgba(255,255,255,0.08) border
- Link "Zobacz projekt" z animowaną strzałką (target="_blank")
- Screenshot w zaokrąglonym kontenerze (border-radius 20px, border, box-shadow). Dla ivobeauty: gradient placeholder do momentu dodania prawdziwego screena.
- Każdy projekt ma unikalny gradient w tle:
  - Projekt 1 (socoLab): rose + purple
  - Projekt 2 (ivobeauty): purple + blue
  - Projekt 3 (Szeroki Kąt): cyan + indigo
- Divider między sekcjami: gradient line (transparent → white/6% → transparent)

### 4. Footer
- Minimalistyczny: logo + social ikony + copyright
- Border-top 1px
- Social ikony w kółkach (glassmorphism bg)

## Animacje (Framer Motion)

- **Hero**: Staggered entrance — logo scale+fade, tagline slide-up, CTA slide-up, scroll indicator fade
- **Glow orbs**: CSS animation float (6-8s ease-in-out infinite) z różnymi delays
- **Projekty**: whileInView — fade+slide z lewej (info) i prawej (screenshot). Parallax na screenshotach wymaga dedykowanego client component `parallaxImage.jsx` (`'use client'`) który wewnętrznie używa `useScroll` + `useTransform` z framer-motion — nie da się tego przekazać przez `MotionDiv`.
- **Scroll indicator**: CSS bounce animation
- **CTA hover**: translateY(-2px) + increased box-shadow glow
- **Project link hover**: gap increases (strzałka przesuwa się w prawo)

## Paleta kolorów

- Background: #0a0a12
- Primary gradient: #ff2d63 → #a855f7 (rose → purple)
- Secondary: #6366f1 (indigo)
- Accent: #22d3ee (cyan)
- Text primary: #ffffff
- Text secondary: rgba(255,255,255,0.5)
- Text muted: rgba(255,255,255,0.3)
- Borders: rgba(255,255,255,0.05-0.08)
- Glass bg: rgba(255,255,255,0.03-0.06)

## Rola DaisyUI

DaisyUI zostaje wyłącznie jako system tokenów kolorystycznych (base-100, base-200, base-content, primary itp.). Komponenty DaisyUI (btn, card, badge) NIE będą używane — cały design jest custom Tailwind. Pozwala to na pełną kontrolę wizualną przy zachowaniu semantycznych zmiennych kolorów.

## Zmiany techniczne

### Pliki do usunięcia
- `app/_components/chatWindow.jsx`
- `app/_components/aboutCard.jsx`
- `app/_components/message.jsx`
- `app/_components/writing.jsx`
- `app/_components/themeController.jsx`

### Nowe pliki
- `app/_components/parallaxImage.jsx` — client component (`'use client'`) z `useScroll` + `useTransform` do efektu parallax na screenshotach projektów

### Pliki do przebudowy
- `app/page.js` — nowa struktura: Hero → Projects (bez ChatWindow, AboutCard)
- `app/_components/hero.jsx` — nowy hero z tagline i CTA (font Inter 800, nie Russo One)
- `app/_components/projects.jsx` — immersive scroll z sekcjami per projekt
- `app/_components/projectCard.jsx` → `projectSection.jsx` — pełnoekranowa sekcja projektu
- `app/_components/nav.jsx` — uproszczony
- `app/_components/footer.jsx` — minimalny
- `app/_components/socjals.jsx` — zmiana social linków na GitHub, LinkedIn, Email (zamiast Twitter, YouTube, Facebook, Instagram)
- `app/globals.css` — nowe utility classes, gradient backgrounds, animacje
- `tailwind.config.js` — zaktualizowane kolory DaisyUI: base-100 → #0a0a12, base-200 → #12121e, base-300 → #1e1e2e. Usunięcie nieużywanych konfiguracji.
- `app/layout.js` — zaktualizowane metadata (opis), hero font zmiana na Inter 800

### Pliki bez zmian
- `app/_components/motionDiv.jsx` — nadal potrzebny
- `app/_components/motionPath.jsx` — nadal potrzebny (logo SVG)
- `app/_components/logo.jsx` — bez zmian
- `app/_components/logoSM.jsx` — bez zmian

## Responsywność

- **Desktop** (>1024px): pełny layout 2-kolumnowy w sekcjach projektów z alternującym kierunkiem
- **Tablet** (768-1024px): single column (jak mobile), zmniejszone fonty. Alternujący układ kolaps do jednokolumnowego.
- **Mobile** (<768px): single column, screenshot nad opisem (zawsze ta sama kolejność niezależnie od desktop alternacji), hero h1 ~40px, numeracja ~80px, tytuł projektu ~28px
