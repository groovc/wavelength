# Issue #1: Episode Search

## Summary

Add a search page at `/search` that lets users find podcasts and episodes by text, with optional category filtering.

## Requirements

- Users can search for podcasts and episodes by entering text
- Users can filter search results by category
- The app shows appropriate feedback when no results are found
- Search results display both podcasts and episodes

## API

The backend supports text-based search with optional category filtering. Check `src/api/client.ts` to understand the available search capabilities.

## Acceptance Criteria

Read `src/__tests__/search.test.tsx` to understand what the tests expect. Your implementation should:

1. Allow users to enter search text
2. Allow users to filter by category
3. Display search results for both podcasts and episodes
4. Show appropriate feedback when searches return no results

## Files

- **Implement**: A search page (add to your app's routing)
- **Tests**: `src/__tests__/search.test.tsx` (5 tests)

## Approach

1. Read the test file to understand what's expected
2. Explore `src/api/client.ts` to understand the search API
3. Update `SPEC.md` with the search feature's requirements and API details
4. Update `PROMPT.md` with guidance for your AI
5. Use your AI assistant to implement
6. Run `npm run test:search` and iterate
