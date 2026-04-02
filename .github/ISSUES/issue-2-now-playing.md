# Issue #2: Now Playing Bar

## Summary

Add a persistent "Now Playing" bar that appears when a user plays an episode. The bar shows episode info and a play/pause control, and persists across page navigation.

## Requirements

- Each episode in the podcast detail page should have a play button
- Clicking play shows a persistent bar at the bottom of the viewport
- The bar displays the episode title and podcast name
- The bar includes a play/pause toggle
- The bar remains visible when navigating between pages (it lives outside the route content)

## State Management

This feature is entirely client-side — no API calls needed. The "Now Playing" state (which episode is playing, play/pause status) should be managed in React state that lives above the router so it persists across navigation.

## Acceptance Criteria

Your implementation must include:

1. A play button on each episode with `data-testid="play-{episodeId}"` (e.g., `data-testid="play-ep-101"`)
2. A Now Playing bar with `data-testid="now-playing"` that appears after clicking a play button
3. The Now Playing bar must contain the episode title and podcast name as visible text
4. A play/pause button inside the Now Playing bar (either `data-testid="play-pause"` or any `<button>` element inside the bar)
5. The Now Playing bar must include a link to `/` (home) so the persistence test can navigate away and verify the bar remains
6. The Now Playing bar persists when the user navigates to a different page

## Files

- **Modify**: Your podcast detail page (to add play buttons per episode)
- **Modify**: `src/App.tsx` (to add the Now Playing bar above/below the router)
- **Tests**: `src/__tests__/player.test.tsx` (6 tests)

## Approach

1. Read the test file to understand what's expected
2. Update `SPEC.md` with the Now Playing feature requirements
3. Update `PROMPT.md` with state management guidance and the test ID conventions above
4. Use your AI assistant to implement
5. Run `npm run test:player` and iterate
