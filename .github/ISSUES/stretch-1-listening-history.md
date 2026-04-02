# Stretch Goal: Listening History ("Continue Listening")

## Summary

Track which episodes the user has listened to and display a "Continue Listening" section on the home page. This is a **full-stack** feature: you'll add database queries (SQLite), API endpoints, and a frontend component.

## Context

The server already initializes a SQLite database (`better-sqlite3`) with `podcasts`, `episodes`, and `listening_history` tables. See `server/db.ts` for the schema. The `listening_history` table is ready — you just need to implement the endpoints that read and write to it.

## Requirements

### Backend

1. **`POST /api/history`** — Upsert listening progress

   Request body:
   ```json
   { "episodeId": "ep-101", "podcastId": "pod-1", "progress": 1200, "completed": false }
   ```

   - If an entry for this `episodeId` already exists, update it (upsert)
   - Return the full entry with joined episode + podcast data (see GET response shape)

2. **`GET /api/history`** — Get listening history with episode + podcast details

   Response:
   ```json
   {
     "history": [
       {
         "episodeId": "ep-101",
         "podcastId": "pod-1",
         "progress": 1200,
         "completed": false,
         "updatedAt": "2026-03-30T10:00:00Z",
         "episodeTitle": "React Server Components Deep Dive",
         "episodeDuration": 3420,
         "podcastTitle": "Byte Talk",
         "podcastImageUrl": "https://placehold.co/...",
         "podcastAuthor": "Sam Chen & Mia Torres"
       }
     ]
   }
   ```

   **This requires a SQL JOIN** across all three tables:
   ```sql
   SELECT h.episode_id, h.podcast_id, h.progress, h.completed, h.updated_at,
          e.title AS episode_title, e.duration AS episode_duration,
          p.title AS podcast_title, p.image_url AS podcast_image_url, p.author AS podcast_author
   FROM listening_history h
   JOIN episodes e ON h.episode_id = e.id
   JOIN podcasts p ON h.podcast_id = p.id
   ORDER BY h.updated_at DESC
   LIMIT 10
   ```

   Note: The database uses `snake_case` column names. The API response should use `camelCase` field names (map them in your endpoint code).

### Frontend

3. **"Continue Listening" section** on the home page

   - Fetch from `GET /api/history` on page load
   - Display a "Continue Listening" heading/section above the main podcast listings (only if there's history)
   - Show episode title, podcast name, and some progress indication
   - This section is only visible when the user has listening history

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

1. `GET /api/history` returns an array of history entries with **joined** episode and podcast data (not just IDs)
2. `POST /api/history` accepts `episodeId`, `podcastId`, `progress`, and optional `completed` — performs an upsert
3. The home page shows a "Continue Listening" heading (text must contain "continue listening", case-insensitive) when there is history
4. In-progress episodes display their episode title and podcast name

## Approach

1. Read the test file to understand what's expected
2. Read `server/db.ts` to understand the database schema
3. Update `SPEC.md` with the new API endpoints and response schemas
4. Update `PROMPT.md` with backend implementation guidance (SQLite, JOIN query, snake_case → camelCase mapping)
5. Use your AI assistant to implement both the backend endpoints and frontend component
6. Run `npm run test:history` and iterate
