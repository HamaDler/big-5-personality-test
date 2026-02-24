# CLAUDE.md

This file provides guidance for AI assistants working on the Big Five Personality Test codebase.

## Project Overview

A client-side React/TypeScript application implementing the IPIP-NEO-120 Big Five personality assessment. Users answer 120 questions and receive detailed trait scores, facet breakdowns, personalized insights, and a downloadable PDF report. All data stays in the browser — there is no backend.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:5173 (HMR enabled)
npm run build        # Type-check (tsc -b) then bundle with Vite → dist/
npm run preview      # Serve the production build locally
npm run lint         # Run ESLint across the entire codebase
```

There is no test suite configured. Linting (`npm run lint`) is the primary automated quality check.

## Repository Structure

```
src/
├── types/index.ts          # All TypeScript interfaces, enums, and constants
├── data/questions.ts       # 120 IPIP-NEO-120 question items
├── lib/
│   ├── scoring.ts          # IPIP scoring algorithm (reverse scoring, facet/trait calc)
│   ├── interpretations.ts  # Research-backed trait/facet text interpretations
│   ├── insights.ts         # Personalised career, relationship, and growth insights
│   └── storage.ts          # localStorage read/write/clear utilities
├── context/TestContext.tsx # Global state (useReducer) + localStorage persistence
├── pages/
│   ├── HomePage.tsx        # Landing page
│   ├── TestPage.tsx        # 10-step questionnaire (12 questions per step)
│   ├── ResultsPage.tsx     # Scores, charts, trait radar, personality blends
│   ├── InsightsPage.tsx    # Personalised insights and growth recommendations
│   └── AboutPage.tsx       # Methodology, ethics, mental health disclaimers
├── components/
│   ├── Layout.tsx          # Header + footer wrapper
│   ├── TraitChart.tsx      # Recharts radar and bar visualisations
│   ├── PDFReport.tsx       # jsPDF + html2canvas multi-page PDF export
│   ├── FacetBreakdown.tsx  # Accordion for per-facet score detail
│   ├── ZenIllustrations.tsx# Custom inline SVG illustrations
│   └── ScrollToTop.tsx     # Auto-scroll on route change
├── App.tsx                 # React Router routes: /, /test, /results, /insights, /about
├── index.css               # Tailwind directives + custom animations and utilities
└── main.tsx                # React 18 entry point (StrictMode)
```

## Architecture

### State Management

`src/context/TestContext.tsx` holds all runtime state via `useReducer`. It is the single source of truth for:

- Active `TestSession` (id, start time, `currentQuestionIndex`, raw responses)
- Computed `TestResults` (trait scores + facet scores)
- Loading state and navigation helpers

The reducer handles four actions: `START_TEST`, `ANSWER_QUESTION`, `COMPLETE_TEST`, `RESET_TEST`. State is written to `localStorage` on every dispatch so sessions survive page refreshes.

### Scoring Pipeline

`src/lib/scoring.ts` implements the IPIP-NEO-120 algorithm:

1. Apply reverse scoring where `question.reverseScored === true`: `score = 6 - response`
2. Compute facet raw score as the mean of its 4 items (scale 1–5)
3. Compute trait raw score as the mean of its 6 facets (scale 1–5)
4. Convert to a 0–100 percentage: `((raw - 1) / 4) × 100`

Score range thresholds used throughout interpretations and insights:
- **Low**: 0–35%
- **Moderate**: 36–65%
- **High**: 66–100%

### Data Model

Key types (all exported from `src/types/index.ts`):

| Type | Description |
|------|-------------|
| `BigFiveTrait` | Union of `'openness' \| 'conscientiousness' \| 'extraversion' \| 'agreeableness' \| 'neuroticism'` |
| `Facet` | Union of all 30 facet identifiers (snake_case) |
| `Question` | `{ id, text, trait, facet, reverseScored }` |
| `QuestionResponse` | `{ questionId, value: LikertValue, timestamp }` |
| `TestSession` | Active session with responses and progress index |
| `TestResults` | Computed `TraitScore[]`, each containing `FacetScore[]` |
| `ScoreRange` | `'low' \| 'moderate' \| 'high'` |

`TRAIT_LABELS` maps `neuroticism → 'Emotional Stability'` (positively framed for UX). Internally the trait key remains `'neuroticism'`.

### Routing

React Router v6 with `<BrowserRouter>`. All unknown paths fall back to `index.html` via Netlify `_redirects`, Vercel `vercel.json` rewrites, and the Nginx `try_files` directive.

## Code Conventions

- **TypeScript strict mode** is on — no implicit `any`, exhaustive checks expected.
- **Functional components only** — no class components.
- **Path alias**: `@/` resolves to `src/`. Use this for all non-relative imports within `src/`.
- **Naming**: PascalCase for components/types/interfaces, camelCase for functions/variables, SCREAMING_SNAKE_CASE for module-level constants.
- **Styling**: Tailwind CSS utility classes only. Custom design tokens are defined in `tailwind.config.js` — use them instead of arbitrary values:
  - Brand palette: `sage-*`, `warm-*`, `accent-*`
  - Trait colours: `openness-*`, `conscientiousness-*`, `extraversion-*`, `agreeableness-*`, `neuroticism-*`
  - Typography: `font-sans` (Inter) for UI, `font-serif` (Lora) for editorial/display text
- **No backend calls** — the app is entirely client-side. Do not introduce API calls or server dependencies.
- **JSDoc comments** on all exported library functions (`src/lib/`). Inline comments only where logic is non-obvious.
- Keep components focused. Business logic belongs in `src/lib/`, not in page/component files.

## Design System

### Colour Palette

Defined in `tailwind.config.js`:

| Token | Hex | Usage |
|-------|-----|-------|
| `sage-500` | `#627362` | Primary brand colour |
| `openness` | `#9b8ab8` | Soft purple — Openness trait |
| `conscientiousness` | `#7d9f7d` | Muted green — Conscientiousness trait |
| `extraversion` | `#c4a574` | Warm gold — Extraversion trait |
| `agreeableness` | `#7ba4ad` | Soft teal — Agreeableness trait |
| `neuroticism` | `#b89898` | Dusty rose — Emotional Stability trait |

Each trait colour has `-light` and `-dark` variants.

### Animations

Custom keyframes in `tailwind.config.js`:
- `animate-float` — gentle vertical float (6 s, ease-in-out, infinite)
- `animate-breathe` — opacity pulse (4 s, ease-in-out, infinite)

Additional animations (`fadeIn`, `slideIn`, `gentlePulse`) are defined as raw CSS in `src/index.css`.

### Typography

Google Fonts loaded in `index.html`:
- **Inter** — all body and UI text (`font-sans`)
- **Lora** — headings and editorial copy (`font-serif`)

## Key Files Quick Reference

| File | What to edit here |
|------|-------------------|
| `src/data/questions.ts` | Add, remove, or modify questionnaire items |
| `src/lib/scoring.ts` | Change the scoring algorithm |
| `src/lib/interpretations.ts` | Update trait/facet text interpretations |
| `src/lib/insights.ts` | Update career/relationship/growth insight text |
| `src/lib/storage.ts` | Change localStorage schema or persistence logic |
| `src/context/TestContext.tsx` | Add new global state or actions |
| `src/types/index.ts` | Add or change shared types and constants |
| `tailwind.config.js` | Extend the design system (colours, animations, fonts) |
| `src/index.css` | Global CSS, custom utilities, print styles |

## Deployment

The `dist/` folder produced by `npm run build` is a fully static site.

| Platform | Config file | Notes |
|----------|-------------|-------|
| Vercel | `vercel.json` | SPA rewrites + security headers (CSP, X-Frame-Options) |
| Netlify | `public/_redirects`, `public/_headers` | SPA fallback routing |
| Docker | `Dockerfile` + `nginx.conf` | Multi-stage build; Node 18-alpine → Nginx alpine; gzip + long-term caching |

Docker quick start:
```bash
docker build -t big-5-personality-test .
docker run -p 80:3000 big-5-personality-test
```

## Gotchas and Constraints

- **No tests** — there is no `npm test` script. Validate logic changes manually and with `npm run lint`.
- **`neuroticism` key vs. display label** — the internal trait key is always `'neuroticism'`; it is only relabelled to `'Emotional Stability'` at the display layer via `TRAIT_LABELS`.
- **Reverse scoring** — 62 of the 120 items are reverse-scored (`reverseScored: true`). Scoring changes must preserve this transformation.
- **localStorage schema** — changing the structure of stored sessions/results can silently break resume functionality for existing users. Add a migration step or version key if the schema changes.
- **PDF export** — `PDFReport.tsx` uses `html2canvas` to rasterise DOM nodes, which is sensitive to font loading timing and Tailwind purge. Test PDF output after any styling changes to results-related components.
- **Path alias** — `@/` is configured in both `vite.config.ts` and `tsconfig.json`. Keep both in sync if new aliases are added.
