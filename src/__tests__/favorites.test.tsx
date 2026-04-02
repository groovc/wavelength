import { describe, it, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './test-utils'

const STORAGE_KEY = 'wavelength-favorites'

describe('Stretch Goal — Issue 4: Favorites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Favorite Toggle', () => {
    // This test is complete — it verifies a toggle button exists on the detail page.
    it('shows a favorite toggle button on the podcast detail page', async () => {
      renderApp({ route: '/podcasts/pod-1' })

      await waitFor(
        () => {
          expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument()
        },
        { timeout: 5000 },
      )
    })

    // TODO: Candidate must write assertions.
    // Verify that clicking the favorite button persists the podcast to localStorage.
    // Think about: What key should it be stored under? What data needs to be stored
    // so the home page can render a card without an extra API call?
    it('adds the podcast to localStorage when the favorite button is clicked', async () => {
      const user = userEvent.setup()
      renderApp({ route: '/podcasts/pod-1' })

      await waitFor(() => {
        expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument()
      })

      await user.click(screen.getByTestId('favorite-toggle'))

      // ✅ TODO: Assert that localStorage now contains the favorited podcast.
      //    - Parse the stored value from localStorage using STORAGE_KEY
      //    - Verify it contains exactly one entry
      //    - Verify the entry has the correct podcast id and title

    })

    // TODO: Candidate must write assertions.
    // Verify that clicking the favorite button a second time removes the podcast.
    // The toggle mechanic is fundamental — make sure localStorage reflects the state
    // after each click.
    it('removes the podcast from localStorage when clicked again (toggle)', async () => {
      const user = userEvent.setup()
      renderApp({ route: '/podcasts/pod-1' })

      await waitFor(() => {
        expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument()
      })

      // ✅ TODO: Click the favorite button twice and verify the toggle behavior.
      //    - After the first click, localStorage should have 1 entry
      //    - After the second click, localStorage should have 0 entries

    })
  })

  describe('My Library Section', () => {
    // This test is complete — it verifies the section appears when favorites exist.
    it('shows a "My Library" section on the home page when there are favorites', async () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([
          {
            id: 'pod-1',
            title: 'Byte Talk',
            author: 'Sam Chen & Mia Torres',
            description: 'Weekly deep-dives into software engineering',
            category: 'Technology',
            imageUrl: 'https://placehold.co/300x300/6366f1/white?text=BT',
            episodeCount: 142,
            rating: 4.8,
          },
        ]),
      )

      renderApp({ route: '/' })

      await waitFor(
        () => {
          expect(screen.getByText(/my library/i)).toBeInTheDocument()
        },
        { timeout: 5000 },
      )
    })

    // TODO: Candidate must write setup AND assertions.
    // Pre-populate localStorage with a different favorited podcast, then verify
    // its title appears on the home page. This tests that the My Library section
    // actually renders data from localStorage, not just a hardcoded heading.
    it('displays favorited podcast titles in the My Library section', async () => {
      // ✅ TODO: Set up localStorage with a favorited podcast (pick any from the fixture data)
      //    then render the home page and verify the podcast title appears.
      //    Hint: The My Library heading should be present, and the podcast title
      //    should appear at least once on the page.

    })

    // TODO: Candidate must write assertions.
    // Verify that the My Library section does NOT appear when localStorage is empty.
    // This is the inverse of the test above — it ensures conditional rendering works.
    it('does not show "My Library" when there are no favorites', async () => {
      renderApp({ route: '/' })

      // ✅ TODO: Wait for the home page to finish loading (check for any podcast title),
      //    then assert that "my library" text is NOT present on the page.
      //    Hint: Use queryByText (not getByText) since it returns null instead of throwing.

    })
  })
})
