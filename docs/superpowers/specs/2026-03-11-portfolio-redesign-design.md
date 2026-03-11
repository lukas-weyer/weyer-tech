# Portfolio Redesign — weyer.tech

## Cel

Gruntowna przebudowa strony weyer.tech z osobistego portfolio (bio + projekty) na czyste portfolio projektów. Nowy design: ciemny, dramatyczny, immersyjny.

## Decyzje projektowe

- **Styl**: Ciemny & dramatyczny — głębokie ciemne tło (#0a0a12), mocne gradienty (rose → purple), glassmorphism, glow orbs, efekty blur
- **Layout projektów**: Immersive scroll — każdy projekt jako pełnoekranowa sekcja (~100vh), smooth scroll z parallax, unikalne gradienty per projekt, duża numeracja ("01", "02", "03")
- **Struktura**: Hero → Projekty → Footer. Zero sekcji "o mnie".
- **Tagline**: "Buduję strony i aplikacje. Masz pomysł? Odezwij się."

## Projekty (3)

1. **socoLab** — strona gdańskiej agencji kreatywnej (JavaScript, Gatsby.js) — socolab.com.pl
2. **ivobeauty** — strona salonu kosmetycznego (tech TBD) — ivobeauty.co.uk
3. **Stowarzyszenie Szeroki Kąt Widzenia** — strona projektu artystycznego (JavaScript, Gatsby.js) — kolodion.netlify.app

## Struktura strony

### 1. Nav (fixed)
- Logo "weyer.tech" z lewej (gradient na ".tech")
- Social linki z prawej (GitHub, LinkedIn, Email)
- Glassmorphism tło (backdrop-blur + przezroczysty bg)
- Border-bottom 1px rgba(255,255,255,0.05)

### 2. Hero (100vh)
- Wyśrodkowany content
- Logo "weyer.tech" — font-size 72px, font-weight 800, gradient na ".tech"
- Tagline pod spodem — font-size 18px, font-weight 300, rgba(255,255,255,0.5)
- CTA button "Napisz do mnie" — gradient background (rose→purple), border-radius 50px, glow box-shadow, strzałka →
- 3 dekoracyjne glow orbs w tle (rose, purple, blue) z animacją float
- Scroll indicator na dole ("scroll" + animowana strzałka)

### 3. Sekcje projektów (każda ~100vh)
- Alternujący układ: projekt 1 (info lewo, screenshot prawo), projekt 2 (odwrócony), projekt 3 (normalny)
- Duża numeracja w tle ("01", "02", "03") — font-size 120px, font-weight 900, bardzo niska opacity
- Label "Projekt 0X" — uppercase, letter-spacing 4px, niska opacity
- Tytuł — font-size 42px, font-weight 800
- Opis — font-size 16px, rgba(255,255,255,0.5)
- Tech stack badges — pill-shaped, glassmorphism background
- Link "Zobacz projekt" z animowaną strzałką
- Screenshot w zaokrąglonym kontenerze (border-radius 20px, border, box-shadow)
- Każdy projekt ma unikalny gradient w tle:
  - Projekt 1 (socoLab): rose + purple
  - Projekt 2 (ivobeauty): purple + blue
  - Projekt 3 (Szeroki Kąt): cyan + indigo
- Divider między sekcjami: gradient line (transparent → white/6% → transparent)

### 4. Footer
- Minimalistyczny: logo + social ikony + copyright
- Border-top 1px
- Social ikony w kółkach z glassmorphism

## Animacje (Framer Motion)

- **Hero**: Staggered entrance — logo scale+fade, tagline slide-up, CTA slide-up, scroll indicator fade
- **Glow orbs**: CSS animation float (6-8s ease-in-out infinite) z różnymi delays
- **Projekty**: whileInView — fade+slide z lewej (info) i prawej (screenshot), parallax na screenshotach (useScroll + useTransform)
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

## Zmiany techniczne

### Pliki do usunięcia
- `app/_components/chatWindow.jsx`
- `app/_components/aboutCard.jsx`
- `app/_components/message.jsx`
- `app/_components/writing.jsx`
- `app/_components/themeController.jsx`

### Pliki do przebudowy
- `app/page.js` — nowa struktura: Hero → Projects (bez ChatWindow, AboutCard)
- `app/_components/hero.jsx` — nowy hero z tagline i CTA
- `app/_components/projects.jsx` — immersive scroll z sekcjami per projekt
- `app/_components/projectCard.jsx` → `projectSection.jsx` — pełnoekranowa sekcja projektu
- `app/_components/nav.jsx` — uproszczony
- `app/_components/footer.jsx` — minimalny
- `app/globals.css` — nowe utility classes, gradient backgrounds, animacje
- `tailwind.config.js` — zaktualizowane kolory, usunięte nieużywane DaisyUI themes
- `app/layout.js` — zaktualizowane metadata (opis)

### Pliki bez zmian
- `app/_components/motionDiv.jsx` — nadal potrzebny
- `app/_components/motionPath.jsx` — nadal potrzebny (logo SVG)
- `app/_components/logo.jsx` — bez zmian
- `app/_components/logoSM.jsx` — bez zmian
- `app/_components/socjals.jsx` — bez zmian
- `app/_components/articleImage.jsx` — do weryfikacji czy używany

## Responsywność

- **Desktop** (>1024px): pełny layout 2-kolumnowy w sekcjach projektów
- **Tablet** (768-1024px): zmniejszone fonty, mniejsze gap
- **Mobile** (<768px): single column, screenshot nad opisem, zmniejszone numeracje i tytuły, hero h1 ~40px
