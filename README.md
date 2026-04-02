# Wavelength — Exercise

## What is this?

Wavelength is a mobile-first podcast discovery app. The project has a working mock API server, a React frontend shell with routing, and a test suite — but no page implementations.

Your job is to **build the app and get the tests passing** by using your preferred AI coding assistant to generate the implementations.

## Rules

- You **should** use any AI coding assistant
- You **must** edit both `SPEC.md` and `PROMPT.md` (we review your changes to both)
- You **should not** hand-write the page implementations — use your AI tool
- You **may** make minor manual fixes, but the bulk should be AI-generated
- You **should not** modify test files
- Time limit: **1 hour**

## What We're Evaluating

### Part 1
- **Product thinking**: Did you make reasonable design decisions for a mobile podcast app?
- **Specification skill**: Is your updated SPEC.md clear and complete enough for an AI to build from?
- **AI guidance**: Does your PROMPT.md give effective instructions?
- **Result quality**: Does the generated app look and feel like a real mobile app?

### Part 2
- **Feature specification**: Can you translate a feature request into spec updates?
- **Incremental guidance**: Can you extend your AI instructions to add new capabilities?
- **Technical judgment**: State management (player), API integration (search) — do the solutions feel right?

## Tips

- **Part 1 is open-ended.** There's no single right answer for the UI. Make decisions, document them in the spec, and guide your AI.
- **Read the test files for Part 2.** They tell you exactly what the acceptance criteria are. The issue files also list specific test IDs needed.
- **The tests use flexible selectors** — they look for ARIA roles, text content, and placeholder text rather than hardcoded test IDs (with a few exceptions noted in each issue).
- **Think about what belongs in SPEC.md vs. PROMPT.md.** The spec defines *what* the product does. The prompt tells the AI *how* to build it.

## Setup

```bash
npm install
npm run dev:server   # Start the mock API on port 3001
npm run dev:client   # Start the Vite dev server (optional, for visual review)
npm test             # Run all tests
npm run test:smoke   # Run Part 1 tests only
npm run test:search  # Run Part 2, Issue 1 tests only
npm run test:player  # Run Part 2, Issue 2 tests only
npm run test:history    # Run Stretch Goal S1 tests only
npm run test:favorites  # Run Stretch Goal S2 tests only
```

## The Two-Part Structure

### Part 1: Build the App (~30 min)

The `SPEC.md` and `PROMPT.md` files describe the product — but they're intentionally incomplete. The API exists, the types exist, the routes exist. You need to:

1. **Decide how the app should look and feel** — navigation pattern, color scheme, card design, typography. This is your call.
2. **Update `SPEC.md`** with your design decisions and any missing API details you discover
3. **Update `PROMPT.md`** with build instructions your AI needs to generate good code
4. **Use your AI assistant** to generate the page components
5. Run `npm run test:smoke` to verify the basics work

The smoke tests are intentionally lightweight — they check that the app renders, loads data from the API, and basic navigation works. The evaluator will also visually review your app for quality.

### Part 2: Add Features (~30 min)

Two feature issues need to be implemented:

| # | Issue | Test File | Tests |
|---|-------|-----------|-------|
| 1 | [Search](/.github/ISSUES/issue-1-search.md) | `src/__tests__/search.test.tsx` | 5 |
| 2 | [Now Playing](/.github/ISSUES/issue-2-now-playing.md) | `src/__tests__/player.test.tsx` | 6 |

### Stretch Goal (if time permits)

| # | Issue | Test File | Tests |
|---|-------|-----------|-------|
| S1 | [Listening History](/.github/ISSUES/stretch-1-listening-history.md) | `src/__tests__/history.test.tsx` | 6 |
| S2 | [Favorites](https://github.com/groovc/wavelength/issues/4) | `src/__tests__/favorites.test.tsx` | 6 |

- **S1** is a **full-stack** stretch goal: add SQLite database queries (with JOINs), API endpoints, and a "Continue Listening" frontend component. Demonstrates backend spec-writing skills in addition to frontend.
- **S2** is a **frontend-only** stretch goal: use `localStorage` to save favorite podcasts and display a "My Library" section on the home page.

For each issue:
1. Read the issue and its test file
2. Update `SPEC.md` with the feature's product requirements
3. Update `PROMPT.md` with build guidance for your AI
4. Use your AI to implement the feature
5. Run the feature's tests to verify

## File Overview

| File | Purpose | Edit? |
|------|---------|-------|
| `SPEC.md` | Product requirements | **Yes** |
| `PROMPT.md` | AI build instructions | **Yes** |
| `src/App.tsx` | Route definitions | Extend if needed |
| `src/pages/` | Page components | AI generates these |
| `src/components/` | Shared components | AI generates these |
| `src/__tests__/*.test.tsx` | Test suite | Do not modify |
| `src/api/client.ts` | API client | Already complete |
| `src/types/index.ts` | TypeScript types | Already complete |
| `server/` | Mock API | Do not modify |
