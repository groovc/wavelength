# Stretch Goal: Listening History ("Continue Listening")

## Summary

Track which episodes the user has listened to and display a "Continue Listening" section on the home page. This is a **full-stack** feature: you'll add database queries (SQLite), API endpoints, and a frontend component.

## Context

The server already initializes a SQLite database (`better-sqlite3`) with `podcasts`, `episodes`, and `listening_history` tables. See `server/db.ts` for the schema. The `listening_history` table is ready — you just need to implement the endpoints that read and write to it.

## Requirements

### Backend

1. **Track listening progress** — Allow the app to save which episodes users have listened to, how far they progressed, and whether they completed the episode

2. **Retrieve listening history** — Provide listening history with full episode and podcast details (not just IDs)

   The database schema already includes `podcasts`, `episodes`, and `listening_history` tables. See `server/db.ts` for the schema. You'll need to join across tables to get complete data.

### Frontend

3. **"Continue Listening" section** on the home page

   - Display recently listened episodes
   - Show episode title, podcast name, and progress information
   - This section should only appear when there is listening history

## Database Schema (already created)

```sql
CREATE TABLE listening_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  episode_id TEXT NOT NULL REFERENCES episodes(id),
  podcast_id TEXT NOT NULL REFERENCES podcasts(id),
  progress INTEGER NOT NULL DEFAULT 0,
  completed INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(episode_id)
);
```

The `podcasts` and `episodes` tables are already populated with data from `server/data.ts`.

## Files

- **Modify**: `server/index.ts` — Add POST and GET `/api/history` endpoints
- **Modify**: Your home page component — Add "Continue Listening" section
- **Optionally add**: `src/api/client.ts` — Add `fetchHistory()` and `postHistory()` functions
- **Tests**: `src/__tests__/history.test.tsx` (6 tests — 3 backend, 3 frontend)

## Acceptance Criteria

Read `src/__tests__/history.test.tsx` to understand what the tests expect. Your implementation should:

1. Allow saving listening progress for episodes
2. Retrieve listening history with complete episode and podcast information
3. Display a "Continue Listening" section on the home page when there is history
4. Show episode titles and podcast names for in-progress episodes

## Approach

1. Read the test file to understand what's expected
2. Read `server/db.ts` to understand the database schema
3. Update `SPEC.md` with the new API endpoints and functionality
4. Update `PROMPT.md` with implementation guidance for your AI
5. Use your AI assistant to implement both the backend endpoints and frontend component
6. Run `npm run test:history` and iterate
