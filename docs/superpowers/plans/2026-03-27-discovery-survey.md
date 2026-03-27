# Interactive Discovery Survey — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Typeform-style interactive discovery survey on weyer.tech with sidebar navigation, personalized per client via JSON config, collected via Netlify Forms.

**Architecture:** Dynamic route `app/discovery/[token]/page.js` loads client config from `surveys/*.json` matched by token. Client-side `<Survey>` component manages state, localStorage persistence, conditional section logic. On submit, hidden `<form data-netlify="true">` POSTs serialized answers. Static export via `generateStaticParams()`.

**Tech Stack:** Next.js 16 (static export), React 19, Framer Motion, Tailwind CSS v4, Netlify Forms

**Spec:** `docs/superpowers/specs/2026-03-27-discovery-survey-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `surveys/kendog.json` | KenDog survey config (token, client info, sections, questions) |
| `lib/surveys.js` | Load and query survey configs from `surveys/` directory |
| `app/discovery/[token]/page.js` | Server component — load config, render Survey or 404 |
| `app/discovery/[token]/_components/survey.jsx` | Client — main orchestrator (state, localStorage, navigation, submit) |
| `app/discovery/[token]/_components/sidebar.jsx` | Section navigation + progress bar |
| `app/discovery/[token]/_components/welcomeScreen.jsx` | Personalized greeting + CTA |
| `app/discovery/[token]/_components/summaryScreen.jsx` | Thank you + answer summary |
| `app/discovery/[token]/_components/questionScreen.jsx` | Question layout + animations wrapper |
| `app/discovery/[token]/_components/inputs/textInput.jsx` | Short text input |
| `app/discovery/[token]/_components/inputs/textArea.jsx` | Multi-line text input |
| `app/discovery/[token]/_components/inputs/singleSelect.jsx` | Radio-style single choice |
| `app/discovery/[token]/_components/inputs/multiSelect.jsx` | Checkbox-style multi choice |
| `app/discovery/[token]/_components/inputs/yesNo.jsx` | Toggle with conditional section logic |
| `app/discovery/[token]/_components/inputs/scale.jsx` | 1-5 scale selector |

---

### Task 1: Survey Config (data layer)

**Files:**
- Create: `surveys/kendog.json`
- Create: `lib/surveys.js`

- [ ] **Step 1: Create `surveys/kendog.json`**

Full KenDog survey config with all 6 sections and questions from the discovery questionnaire (`docs/discovery-questionnaire.md` in the kenDog project). Include token, client info, all question types (text, textarea, singleSelect, multiSelect, yesNo, scale). Section `b2b` should have `"conditional": true`.

- [ ] **Step 2: Create `lib/surveys.js`**

```js
import fs from 'fs';
import path from 'path';

export function getAllSurveys() {
  const dir = path.join(process.cwd(), 'surveys');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  return files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
}

export function getSurveyByToken(token) {
  const surveys = getAllSurveys();
  return surveys.find((s) => s.token === token) || null;
}

export function getAllTokens() {
  return getAllSurveys().map((s) => s.token);
}
```

- [ ] **Step 3: Verify**

Run: `node -e "const s = require('./lib/surveys.js'); console.log(s)"`

Note: This won't work directly with ESM — verify by running `npm run build` after Task 2 is done. The build will validate imports.

- [ ] **Step 4: Commit**

```bash
git add surveys/kendog.json lib/surveys.js
git commit -m "feat: add survey config system and KenDog questionnaire"
```

---

### Task 2: Route + Page (server component)

**Files:**
- Create: `app/discovery/[token]/page.js`

- [ ] **Step 1: Create `app/discovery/[token]/page.js`**

```jsx
import { notFound } from 'next/navigation';
import { getSurveyByToken, getAllTokens } from '@/lib/surveys';
import Survey from './_components/survey';

export async function generateStaticParams() {
  const tokens = getAllTokens();
  return tokens.map((token) => ({ token }));
}

export async function generateMetadata({ params }) {
  const { token } = await params;
  const survey = getSurveyByToken(token);
  if (!survey) return {};
  return {
    title: `Discovery — ${survey.client.name} | weyer.tech`,
    robots: { index: false, follow: false },
  };
}

export default async function DiscoveryPage({ params }) {
  const { token } = await params;
  const survey = getSurveyByToken(token);
  if (!survey) notFound();

  return <Survey config={survey} />;
}
```

Key: `robots: { index: false }` prevents Google indexing. `generateStaticParams` enables static export.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds, generates `discovery/a8f3x9k2/index.html` (or whatever token kendog.json uses)

- [ ] **Step 3: Commit**

```bash
git add app/discovery/
git commit -m "feat: add discovery survey route with static params"
```

---

### Task 3: Input Components

**Files:**
- Create: `app/discovery/[token]/_components/inputs/textInput.jsx`
- Create: `app/discovery/[token]/_components/inputs/textArea.jsx`
- Create: `app/discovery/[token]/_components/inputs/singleSelect.jsx`
- Create: `app/discovery/[token]/_components/inputs/multiSelect.jsx`
- Create: `app/discovery/[token]/_components/inputs/yesNo.jsx`
- Create: `app/discovery/[token]/_components/inputs/scale.jsx`

All input components are client components (`'use client'`). Each receives `{ question, value, onChange }` props.

- [ ] **Step 1: Create `textInput.jsx`**

Single-line `<input>` with dark theme styling. Placeholder from `question.placeholder`. Calls `onChange(string)`.

Styles: dark bg (`bg-white/[0.04]`), border `border-white/[0.08]`, focus `border-rose-500/50`, rounded-xl, text-white, placeholder-white/20.

- [ ] **Step 2: Create `textArea.jsx`**

Same as textInput but `<textarea>` with `rows={4}` and auto-resize on input. Same styling.

- [ ] **Step 3: Create `singleSelect.jsx`**

Renders `question.options` as clickable cards. Selected card gets rose/purple border + tinted background. Calls `onChange(string)`.

Each option: `rounded-xl`, `border border-white/[0.08]`, padding `py-4 px-5`. Selected: `border-rose-500/30 bg-rose-500/[0.05]`. Rose dot indicator on left.

- [ ] **Step 4: Create `multiSelect.jsx`**

Same layout as singleSelect but clicking toggles selection. Value is array. Selected items have checkbox with checkmark. Calls `onChange(string[])`.

Checkbox: 22px square, `rounded-md`, selected: `border-purple-500 bg-purple-500/15` with checkmark. Uses mix of rose and purple borders for visual variety.

- [ ] **Step 5: Create `yesNo.jsx`**

Two large buttons side by side: "Tak" and "Nie". Selected gets gradient border. Calls `onChange(boolean)`.

Buttons: `flex-1`, `rounded-xl`, `py-4`, centered text. Selected "Tak": rose accent. Selected "Nie": white/10 accent. If `question.showSection` exists, show subtle note below: "Odpowiedź wpływa na widoczność sekcji {sectionTitle}".

- [ ] **Step 6: Create `scale.jsx`**

5 circles/buttons in a row labeled 1-5. Optional `question.scaleLabels` for min/max labels (e.g., "Mało ważne" / "Bardzo ważne"). Selected circle gets gradient fill. Calls `onChange(number)`.

Circles: `w-12 h-12`, `rounded-full`, `border border-white/[0.08]`. Selected: `bg-gradient-to-br from-rose-500 to-purple-500 border-transparent`. Labels below in `text-[11px] opacity-25`.

- [ ] **Step 7: Commit**

```bash
git add app/discovery/[token]/_components/inputs/
git commit -m "feat: add all survey input components (text, select, yesNo, scale)"
```

---

### Task 4: Question Screen + Animations

**Files:**
- Create: `app/discovery/[token]/_components/questionScreen.jsx`

- [ ] **Step 1: Create `questionScreen.jsx`**

Client component. Receives `{ question, questionIndex, totalQuestions, value, onChange }`.

Layout (centered in main panel):
- Question number: `text-[11px] uppercase tracking-[3px] opacity-25`
- Question title: `text-[26px] font-semibold leading-snug`
- Description: `text-sm opacity-35 leading-relaxed`
- Input component (routed by `question.type`)
- No navigation here — that's in Survey

Use Framer Motion `AnimatePresence` + `motion.div` for question transitions. Key on `question.id`. Enter: `opacity 0→1, x 40→0`. Exit: `opacity 1→0, x 0→-40`. Duration: 0.3s.

Route question type to input component:
```js
const INPUT_MAP = {
  text: TextInput,
  textarea: TextArea,
  singleSelect: SingleSelect,
  multiSelect: MultiSelect,
  yesNo: YesNo,
  scale: Scale,
};
```

- [ ] **Step 2: Commit**

```bash
git add app/discovery/[token]/_components/questionScreen.jsx
git commit -m "feat: add question screen with animated transitions"
```

---

### Task 5: Sidebar

**Files:**
- Create: `app/discovery/[token]/_components/sidebar.jsx`

- [ ] **Step 1: Create `sidebar.jsx`**

Client component. Receives `{ config, visibleSections, currentSectionIndex, completedSections, answers, totalQuestions, answeredCount }`.

Layout (260px, left column, full height):
- **Top:** "DISCOVERY" label + client name in gradient + contact name
- **Middle:** Section list with states:
  - Completed: checkmark, lower opacity
  - Active: rose left border (2px), rose dot, full opacity
  - Upcoming: dim, white dot
  - Conditional skipped: dimmer, "pominięta" label
  - Conditional available: "opcja" badge
- **Bottom:** Progress bar — `answeredCount / totalQuestions`, gradient fill rose→purple, 3px height

Clicking a completed section navigates to it (calls `onSectionClick(index)`).

**Mobile:** Hidden by default (`hidden lg:flex`). Replaced by top bar showing current section name + compact progress bar.

- [ ] **Step 2: Commit**

```bash
git add app/discovery/[token]/_components/sidebar.jsx
git commit -m "feat: add sidebar with section navigation and progress"
```

---

### Task 6: Welcome Screen

**Files:**
- Create: `app/discovery/[token]/_components/welcomeScreen.jsx`

- [ ] **Step 1: Create `welcomeScreen.jsx`**

Client component. Receives `{ config, totalQuestions, sectionCount, onStart }`.

Centered content, no sidebar. Background glow orbs (rose + purple, low opacity).

- "DISCOVERY" label: `text-[11px] uppercase tracking-[4px] opacity-30`
- "Cześć, {contact}!" with contact name in gradient
- Description with client name bold
- "Zajmie ok. 10-15 minut..." note
- "Zaczynamy →" CTA: gradient pill button with glow shadow
- Stats row: "{sectionCount} sekcji · ~{totalQuestions} pytań · 10-15 min"

Framer Motion: fade in on mount (opacity 0→1, scale 0.95→1, duration 0.6s).

If localStorage has saved progress — show additional note: "Masz zapisane odpowiedzi — kontynuujesz od miejsca gdzie skończyłaś." and button text changes to "Kontynuuj →".

- [ ] **Step 2: Commit**

```bash
git add app/discovery/[token]/_components/welcomeScreen.jsx
git commit -m "feat: add personalized welcome screen"
```

---

### Task 7: Summary Screen

**Files:**
- Create: `app/discovery/[token]/_components/summaryScreen.jsx`

- [ ] **Step 1: Create `summaryScreen.jsx`**

Client component. Receives `{ config, answers, visibleSections }`.

Layout: sidebar in completed state + main panel with:
- Checkmark icon (large)
- "Dziękuję, {contact}!" with gradient name
- "Odpowiedzi zostały wysłane. Odezwę się w ciągu 48 godzin."
- Answer summary grouped by section:
  - Section title with colored dot
  - Each question: label (dim) + answer below
  - Multi-select answers as colored tag pills (rose/purple/blue rotating)
  - Skipped conditional sections: "pominięta" label
- Contact card at bottom: email + website

Framer Motion: staggered fade-in for sections.

- [ ] **Step 2: Commit**

```bash
git add app/discovery/[token]/_components/summaryScreen.jsx
git commit -m "feat: add summary screen with answer overview"
```

---

### Task 8: Survey Orchestrator (main component)

**Files:**
- Create: `app/discovery/[token]/_components/survey.jsx`

- [ ] **Step 1: Create `survey.jsx`**

Client component (`'use client'`). This is the brain. Receives `{ config }`.

**State:**
```js
const [screen, setScreen] = useState('welcome'); // 'welcome' | 'survey' | 'summary'
const [currentSection, setCurrentSection] = useState(0);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState({});
const [submitted, setSubmitted] = useState(false);
```

**Computed:**
- `visibleSections` — filter sections based on yesNo answers with `showSection`
- `flatQuestions` — all questions from visible sections in order
- `totalQuestions` / `answeredCount` — for progress
- `completedSections` — sections where all questions answered

**localStorage:**
- Key: `survey_{config.token}`
- Save on every state change: `{ answers, currentSection, currentQuestion, screen, timestamp }`
- Restore on mount (inside useEffect)
- Clear on successful submit

**Navigation:**
- `goNext()` — next question. If last in section → next section's first question. If last overall → show submit confirmation.
- `goPrev()` — previous question. If first in section → prev section's last question. If first overall → do nothing.
- `goToSection(index)` — jump to section (only if completed)

**Conditional logic:**
- When a yesNo answer changes and has `showSection`, recalculate `visibleSections`
- If a previously visible section becomes hidden, skip it in navigation

**Submit:**
1. Build form data: `form-name`, `client`, `answers` (serialized human-readable text)
2. POST via `fetch('/', { method: 'POST', body: urlEncodedFormData })`
3. On success: `setScreen('summary')`, clear localStorage, set `submitted` flag
4. On error: show error message toast, keep data

**Layout:**
- If `screen === 'welcome'`: `<WelcomeScreen>` fullscreen
- If `screen === 'survey'`: `<Sidebar>` + `<QuestionScreen>` + navigation buttons (Wstecz/Dalej)
- If `screen === 'summary'`: `<Sidebar>` (completed state) + `<SummaryScreen>`

**Hidden Netlify form** (rendered always for Netlify detection):
```html
<form name="discovery-{token}" data-netlify="true" netlify-honeypot="bot-field" hidden>
  <input name="form-name" />
  <input name="bot-field" />
  <input name="client" />
  <textarea name="answers" />
</form>
```

**Navigation bar** (bottom of main panel when in survey screen):
- "← Wstecz" link (opacity 25, hidden on first question)
- "Dalej →" gradient pill button
- On last question: button text changes to "Podsumuj i wyślij"

**Mobile layout:**
- Top bar with section name + progress (replaces sidebar)
- Navigation fixed to bottom

- [ ] **Step 2: Verify locally**

Run: `npm run dev`
Open: `http://localhost:3000/discovery/{token}`
Test: Welcome → navigate questions → answer all → submit (will fail on dev, Netlify Forms only work on Netlify — verify form structure exists in HTML)

- [ ] **Step 3: Commit**

```bash
git add app/discovery/[token]/_components/survey.jsx
git commit -m "feat: add survey orchestrator with state, localStorage, and Netlify Forms"
```

---

### Task 9: Layout Polish + Mobile

**Files:**
- Modify: `app/discovery/[token]/_components/survey.jsx` (mobile layout)
- Modify: `app/discovery/[token]/_components/sidebar.jsx` (mobile top bar)

- [ ] **Step 1: Add mobile top bar to sidebar.jsx**

Below the desktop sidebar div, add a `lg:hidden` top bar:
- Fixed to top, full width
- Current section name + question number
- Thin gradient progress bar (2px)
- Semi-transparent dark bg with backdrop-blur

- [ ] **Step 2: Add mobile navigation to survey.jsx**

Navigation buttons on mobile: fixed to bottom, full width, padding safe-area-inset.
- "Wstecz" and "Dalej" side by side
- Gradient CTA for "Dalej"

- [ ] **Step 3: Test responsive**

Run dev server, test at 375px, 768px, 1280px widths. Verify:
- Mobile: no sidebar, top bar, bottom nav
- Tablet: sidebar appears, inline nav
- Desktop: full layout

- [ ] **Step 4: Commit**

```bash
git add app/discovery/
git commit -m "feat: add responsive mobile layout for survey"
```

---

### Task 10: Keyboard Navigation + UX Polish

**Files:**
- Modify: `app/discovery/[token]/_components/survey.jsx`

- [ ] **Step 1: Add keyboard shortcuts**

In survey.jsx, add `useEffect` with `keydown` listener:
- `Enter` → go next (if current question has answer)
- `Shift+Enter` → go back
- Number keys `1-5` → select option for singleSelect/scale/yesNo

- [ ] **Step 2: Add transition animations between screens**

Use `AnimatePresence` in survey.jsx to animate:
- Welcome → Survey: fade out welcome, fade in sidebar + question
- Survey → Summary: crossfade

- [ ] **Step 3: Add subtle glow orb in main panel**

Positioned absolute, rose/purple radial gradient, low opacity (0.06), pointer-events-none. Adds depth to the dark background.

- [ ] **Step 4: Commit**

```bash
git add app/discovery/
git commit -m "feat: add keyboard nav, screen transitions, and visual polish"
```

---

### Task 11: Build + Deploy Verification

**Files:**
- Possibly modify: `next.config.js` (if needed)
- Possibly modify: `.gitignore` (add `.superpowers/`)

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds, `out/discovery/{token}/index.html` exists

- [ ] **Step 3: Test Netlify Forms detection**

Check the built HTML for `data-netlify="true"` form. Netlify's build bot scans HTML for this attribute.

Run: `grep -r "data-netlify" out/discovery/`
Expected: matches in the HTML file

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "feat: discovery survey ready for deployment"
git push
```

- [ ] **Step 5: Verify on Netlify**

After deploy:
1. Open `weyer.tech/discovery/{token}` — survey loads
2. Open `weyer.tech/discovery/invalid` — 404
3. Fill survey, submit
4. Check Netlify dashboard → Forms → verify submission received
5. Check email notification

---

### Task 12: Discovery Questionnaire Content

**Files:**
- Modify: `surveys/kendog.json`

- [ ] **Step 1: Finalize KenDog questions**

Ensure all 37 questions from the discovery questionnaire are in `kendog.json` with:
- Correct types per question
- Descriptions (the "po co pytam" text)
- Placeholders for text inputs
- Options for select questions
- `showSection: "b2b"` on the B2B yesNo question
- Proper section grouping (6 sections)

- [ ] **Step 2: Test complete flow**

Run dev, go through entire survey as if you're the client:
- Every question renders correctly
- Descriptions show
- Multi-select works
- B2B section shows/hides based on yesNo
- Summary shows all answers
- localStorage persists across refresh

- [ ] **Step 3: Commit**

```bash
git add surveys/kendog.json
git commit -m "feat: finalize KenDog discovery questionnaire content"
```
