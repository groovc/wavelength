# Issue #2: Now Playing Bar

## Summary

Add a persistent "Now Playing" bar that appears when a user plays an episode. The bar shows episode info and a play/pause control, and persists across page navigation.

## Requirements

- Users can start playing an episode from the podcast detail page
- The app shows what's currently playing
- Users can pause and resume playback
- The playing state persists when navigating between pages

## State Management

This feature is entirely client-side — no API calls needed. The current playback state should persist across navigation.

## Acceptance Criteria

Read `src/__tests__/player.test.tsx` to understand what the tests expect. Your implementation should:

1. Allow users to play episodes from the podcast detail page
2. Show which episode is currently playing
3. Allow users to toggle between play and pause states
4. Maintain playback state when navigating to different pages

## Files

- **Modify**: Your podcast detail page (to add play buttons per episode)
- **Modify**: `src/App.tsx` (to add the Now Playing bar above/below the router)
- **Tests**: `src/__tests__/player.test.tsx` (6 tests)

## Approach

1. Read the test file to understand what's expected
2. Update `SPEC.md` with the Now Playing feature requirements
3. Update `PROMPT.md` with state management guidance for your AI
4. Use your AI assistant to implement
5. Run `npm run test:player` and iterate
