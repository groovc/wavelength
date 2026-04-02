# Issue #1: Episode Search

## Summary

Add a search page at `/search` that lets users find podcasts and episodes by text, with optional category filtering.

## Requirements

- Search input where users can type a query
- Results update as the user types (or on submit — your choice)
- Results show matching podcasts and episodes
- Category filter to narrow results to a specific category
- Empty/no-results state when nothing matches

## API

`GET /api/search?q=<query>&category=<optional>`

Returns `{ podcasts: [...], episodes: [...] }`. Each episode includes its parent `podcast` object.

## Acceptance Criteria

Your implementation must include:

1. A search input — use either `<input type="search">` (which has ARIA role `searchbox`) or an `<input>` with `placeholder` containing the word "search" (case-insensitive)
2. A category filter `<select>` element with `data-testid="category-filter"` — options should include category names as values
3. A "No results" message when the search returns empty results (must contain the text "no results", case-insensitive)
4. Search results should display podcast titles and episode titles as visible text

## Files

- **Implement**: A search page (add to your app's routing)
- **Tests**: `src/__tests__/search.test.tsx` (5 tests)

## Approach

1. Read the test file to understand what's expected
2. Update `SPEC.md` with the search feature's requirements and API details
3. Update `PROMPT.md` with guidance for your AI (including the acceptance criteria above)
4. Use your AI assistant to implement
5. Run `npm run test:search` and iterate
