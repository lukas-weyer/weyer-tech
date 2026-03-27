# Interactive Discovery Survey — Design Spec

## Goal

Build a Typeform-style interactive survey on weyer.tech for client discovery. Each client gets a personalized, token-protected survey. Responses are collected via Netlify Forms and persisted in localStorage across sessions.

## Architecture

### Routing

- **URL pattern:** `weyer.tech/discovery/[token]`
- **Token:** random string (e.g., `a8f3x9k2`) — unguessable, not indexed
- **Invalid token → 404 page**

### Data Flow

```
surveys/kendog.json  →  page.js loads config by token
                     →  <Survey> renders questions
                     →  answers stored in React state + localStorage
                     →  on submit: hidden <form data-netlify="true"> POSTs all answers
                     →  Netlify stores responses + sends email notification
                     →  summary screen shown
```

### File Structure

```
app/discovery/[token]/
  page.js                — server component, loads survey config by token
  _components/
    survey.jsx           — client component, main survey orchestrator
    sidebar.jsx          — section navigation, progress bar
    question.jsx         — routes question type to correct input component
    welcomeScreen.jsx    — personalized greeting + CTA
    summaryScreen.jsx    — thank you + answer summary
    inputs/
      textInput.jsx      — short text answer
      textArea.jsx       — long text answer
      singleSelect.jsx   — radio-style single choice
      multiSelect.jsx    — checkbox-style multi choice
      yesNo.jsx          — toggle with conditional section logic
      scale.jsx          — 1-5 scale / slider

surveys/
  kendog.json            — KenDog survey config (token, client info, sections, questions)
```

### Survey Config Format (JSON)

```json
{
  "token": "a8f3x9k2",
  "client": {
    "name": "KenDog",
    "contact": "Aniu",
    "contactFormal": "Ania"
  },
  "sections": [
    {
      "id": "business",
      "title": "Biznes i cele",
      "questions": [
        {
          "id": "product_count",
          "type": "text",
          "question": "Ile produktów masz w ofercie? Planujesz rozszerzać?",
          "description": "Liczba produktów wpływa na to jak zorganizujemy katalog...",
          "placeholder": "np. Około 50, planuję rozszerzać do 100+",
          "required": true
        },
        {
          "id": "payments",
          "type": "multiSelect",
          "question": "Jakie metody płatności potrzebujesz?",
          "description": "Każda metoda płatności to osobna integracja...",
          "options": ["BLIK", "Przelewy24", "Karta płatnicza", "Pobranie przy odbiorze", "Przelew tradycyjny"],
          "required": true
        },
        {
          "id": "has_b2b",
          "type": "yesNo",
          "question": "Czy planujesz sprzedaż hurtową (B2B)?",
          "description": "Jeśli tak — pokażę dodatkowe pytania o model B2B...",
          "showSection": "b2b"
        }
      ]
    },
    {
      "id": "b2b",
      "title": "B2B",
      "conditional": true,
      "label": "opcja",
      "questions": [...]
    }
  ]
}
```

### Question Types

| Type | Component | Behavior |
|------|-----------|----------|
| `text` | `textInput.jsx` | Single-line input, placeholder, optional `required` |
| `textarea` | `textArea.jsx` | Multi-line, auto-resize, placeholder |
| `singleSelect` | `singleSelect.jsx` | Click to select one option, highlights selected |
| `multiSelect` | `multiSelect.jsx` | Click to toggle options, multiple allowed |
| `yesNo` | `yesNo.jsx` | Two-button toggle (Tak/Nie). If `showSection` defined: "Tak" enables that section, "Nie" skips it |
| `scale` | `scale.jsx` | 1-5 clickable circles/buttons with labels |

## Visual Design

### Layout (Desktop)

- **Sidebar (260px, left):** Section navigation, client branding, progress bar
- **Main panel (flex, center):** One question at a time, centered vertically
- **Background:** `#0a0a12` (weyer.tech dark theme)
- **Subtle glow orbs** in main panel (rose/purple, low opacity)

### Layout (Mobile)

- **Sidebar hidden** — replaced by top bar with section name + progress
- **Full-width question panel**
- **Bottom-fixed navigation** (Wstecz / Dalej)

### Sidebar States

| State | Visual |
|-------|--------|
| Completed section | Checkmark, lower opacity, ~~strikethrough~~ |
| Active section | Rose left border, rose dot, full opacity |
| Upcoming section | Dim, white dot |
| Conditional (e.g., B2B) | Dimmer, "opcja" badge, hidden if skipped |

### Screens

1. **Welcome screen** — "Cześć, {contact}!", client name, estimated time, section/question count, "Zaczynamy →" CTA
2. **Question screen** — question number, title, description, input, Wstecz/Dalej navigation
3. **Summary screen** — checkmark, "Dziękuję, {contact}!", 48h response promise, grouped answer summary with colored tags for multi-select, contact info card

### Animations (Framer Motion)

- **Question transitions:** Fade + slide (enter from right, exit to left) — like Typeform
- **Sidebar active indicator:** Smooth transition on section change
- **Welcome → first question:** Fade out welcome, fade in sidebar + question
- **Submit → summary:** Smooth crossfade

### Colors & Typography

Inherited from weyer.tech:
- **Accent gradient:** `#FF2D63` → `#A855F7` (rose to purple)
- **Body font:** Inter
- **Display:** Font weight 600-700 for questions
- **Text opacity tiers:** 1.0 (question), 0.35 (description), 0.25 (labels)
- **Selected option border:** Rose or purple with tinted background
- **CTA buttons:** Gradient pill with glow shadow

## State Management

### React State

```js
{
  currentSection: 0,      // active section index
  currentQuestion: 0,     // active question index within section
  answers: {              // keyed by question id
    "product_count": "Około 50...",
    "payments": ["BLIK", "Przelewy24"],
    "has_b2b": false
  },
  visibleSections: [...], // sections after conditional logic applied
  submitted: false
}
```

### localStorage Persistence

- **Key:** `survey_{token}` (e.g., `survey_a8f3x9k2`)
- **Saved on:** Every answer change + navigation
- **Contains:** `{ answers, currentSection, currentQuestion, timestamp }`
- **Restored on:** Page load (if key exists and not submitted)
- **Cleared on:** Successful form submission

### Conditional Logic

When a `yesNo` question with `showSection` is answered:
- **"Tak"** → section appears in sidebar and flow
- **"Nie"** → section removed from `visibleSections`, skipped in navigation
- Changing answer re-evaluates visible sections dynamically

## Form Submission

### Netlify Forms Integration

Hidden `<form>` with `data-netlify="true"` and `netlify-honeypot` for spam protection:

```html
<form
  name="discovery-{token}"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  hidden
>
  <input name="form-name" value="discovery-{token}" />
  <input name="bot-field" />
  <input name="client" />
  <textarea name="answers" />
</form>
```

On submit:
1. Serialize answers to structured text (readable in Netlify dashboard + email)
2. Submit via `fetch` to avoid page redirect
3. On success → show summary screen, clear localStorage
4. On error → show error message, keep data

### Answer Serialization

Answers formatted as human-readable text for Netlify email notifications:

```
--- BIZNES I CELE ---

Ile produktów w ofercie?
→ Około 50, planuję rozszerzać do 100+

Powód migracji z WooCommerce?
→ Wolna strona, problemy z wtyczkami

--- FUNKCJONALNOŚCI ---

Metody płatności:
→ BLIK, Przelewy24, Karta

Planujesz B2B?
→ Nie (sekcja pominięta)
```

## Creating New Surveys

1. Create `surveys/{client-slug}.json` with config
2. Generate random token (e.g., `openssl rand -hex 4`)
3. Fill in client info, select sections, customize questions if needed
4. Deploy (`npm run build` + Netlify auto-deploy on push)
5. Send link to client: `weyer.tech/discovery/{token}`

## Edge Cases

- **Invalid token** → Next.js `notFound()` → 404
- **Already submitted survey** → Show summary screen from localStorage flag
- **Expired localStorage** → Start fresh (no data loss since Netlify already has submission)
- **Multiple submissions** → Allowed (Netlify keeps all), but UI shows summary after first
- **JavaScript disabled** → Survey won't work (requires React). Acceptable for this use case.

## Non-Goals

- No admin panel for creating surveys (file-based)
- No real-time collaboration (one person fills, one receives)
- No branching beyond section-level conditional logic
- No file uploads
- No analytics/tracking within the survey
