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
    it('shows a favorite toggle button on the podcast detail page', async () => {
      renderApp({ route: '/podcasts/pod-1' })

      await waitFor(
        () => {
          expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument()
        },
        { timeout: 5000 },
      )
    })

    it('adds the podcast to localStorage when the favorite button is clicked', async () => {
      const user = userEvent.setup()
      renderApp({ route: '/podcasts/pod-1' })

      await waitFor(() => {
        expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument()
      })

      await user.click(screen.getByTestId('favorite-toggle'))

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      expect(stored).toHaveLength(1)
      expect(stored[0].id).toBe('pod-1')
      expect(stored[0].title).toBe('Byte Talk')
    })

    it('removes the podcast from localStorage when clicked again (toggle)', async () => {
      const user = userEvent.setup()
      renderApp({ route: '/podcasts/pod-1' })

      await waitFor(() => {
        expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument()
      })

      // Click to favorite
      await user.click(screen.getByTestId('favorite-toggle'))
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')).toHaveLength(1)

      // Click again to unfavorite
      await user.click(screen.getByTestId('favorite-toggle'))
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')).toHaveLength(0)
    })
  })

  describe('My Library Section', () => {
    it('shows a "My Library" section on the home page when there are favorites', async () => {
      // Pre-populate localStorage with a favorite
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

    it('displays favorited podcast titles in the My Library section', async () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([
          {
            id: 'pod-3',
            title: 'The Funny Hour',
            author: 'Marcus Webb',
            description: 'Stand-up comedians join Marcus',
            category: 'Comedy',
            imageUrl: 'https://placehold.co/300x300/f59e0b/white?text=TFH',
            episodeCount: 203,
            rating: 4.9,
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

      // The favorited podcast title should appear in the library section
      const funnyHourMatches = screen.getAllByText(/The Funny Hour/i)
      expect(funnyHourMatches.length).toBeGreaterThan(0)
    })

    it('does not show "My Library" when there are no favorites', async () => {
      renderApp({ route: '/' })

      // Wait for the page to load
      await waitFor(
        () => {
          const matches = screen.getAllByText(/Byte Talk/i)
          expect(matches.length).toBeGreaterThan(0)
        },
        { timeout: 5000 },
      )

      // My Library should not be present
      expect(screen.queryByText(/my library/i)).not.toBeInTheDocument()
    })
  })
})
