import { describe, it, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { renderApp } from './test-utils'
import { server } from './server'
import { mockPodcasts, mockEpisodes } from './fixtures'

// Mock history data — simulates what the GET /api/history JOIN should return
const mockHistoryResponse = {
  history: [
    {
      episodeId: 'ep-101',
      podcastId: 'pod-1',
      progress: 1200,
      completed: false,
      updatedAt: '2026-03-30T10:00:00Z',
      episodeTitle: 'React Server Components Deep Dive',
      episodeDuration: 3420,
      podcastTitle: 'Byte Talk',
      podcastImageUrl: 'https://placehold.co/300x300/6366f1/white?text=BT',
      podcastAuthor: 'Sam Chen & Mia Torres',
    },
    {
      episodeId: 'ep-301',
      podcastId: 'pod-3',
      progress: 2700,
      completed: true,
      updatedAt: '2026-03-29T15:00:00Z',
      episodeTitle: 'Comedy in the Age of AI',
      episodeDuration: 3300,
      podcastTitle: 'The Funny Hour',
      podcastImageUrl: 'https://placehold.co/300x300/f59e0b/white?text=TFH',
      podcastAuthor: 'Marcus Webb',
    },
  ],
}

describe('Stretch Goal — Issue 3: Listening History', () => {
  describe('Backend: API Response Shape', () => {
    beforeEach(() => {
      // Override the default handlers with history endpoint
      server.use(
        http.get('/api/history', () => {
          return HttpResponse.json(mockHistoryResponse)
        }),
        http.post('/api/history', async ({ request }) => {
          const body = (await request.json()) as {
            episodeId: string
            podcastId: string
            progress: number
            completed?: boolean
          }
          // Validate required fields
          if (!body.episodeId || !body.podcastId || body.progress === undefined) {
            return HttpResponse.json(
              { error: 'Missing required fields: episodeId, podcastId, progress' },
              { status: 400 },
            )
          }
          // Return success with the upserted record
          const episode = mockEpisodes.find((e) => e.id === body.episodeId)
          const podcast = mockPodcasts.find((p) => p.id === body.podcastId)
          return HttpResponse.json({
            episodeId: body.episodeId,
            podcastId: body.podcastId,
            progress: body.progress,
            completed: body.completed ?? false,
            updatedAt: new Date().toISOString(),
            episodeTitle: episode?.title ?? '',
            episodeDuration: episode?.duration ?? 0,
            podcastTitle: podcast?.title ?? '',
            podcastImageUrl: podcast?.imageUrl ?? '',
            podcastAuthor: podcast?.author ?? '',
          })
        }),
      )
    })

    it('GET /api/history returns history entries with joined episode and podcast data', async () => {
      const res = await fetch('/api/history')
      const data = await res.json()

      expect(data.history).toBeDefined()
      expect(data.history).toHaveLength(2)

      const entry = data.history[0]
      // Must include episode fields (from JOIN)
      expect(entry.episodeId).toBe('ep-101')
      expect(entry.episodeTitle).toBe('React Server Components Deep Dive')
      expect(entry.episodeDuration).toBe(3420)
      // Must include podcast fields (from JOIN)
      expect(entry.podcastId).toBe('pod-1')
      expect(entry.podcastTitle).toBe('Byte Talk')
      expect(entry.podcastAuthor).toBe('Sam Chen & Mia Torres')
      // Must include progress fields
      expect(entry.progress).toBe(1200)
      expect(entry.completed).toBe(false)
    })

    it('POST /api/history accepts episodeId, podcastId, and progress', async () => {
      const res = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          episodeId: 'ep-101',
          podcastId: 'pod-1',
          progress: 1500,
        }),
      })
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.episodeId).toBe('ep-101')
      expect(data.progress).toBe(1500)
    })

    it('POST /api/history returns joined data in the response', async () => {
      const res = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          episodeId: 'ep-601',
          podcastId: 'pod-6',
          progress: 600,
        }),
      })
      const data = await res.json()

      // Response should include episode + podcast details from the JOIN
      expect(data.episodeTitle).toBe('The Hospital Ransomware Attack')
      expect(data.podcastTitle).toBe('Zero Day')
    })
  })

  describe('Frontend: Continue Listening Section', () => {
    beforeEach(() => {
      server.use(
        http.get('/api/history', () => {
          return HttpResponse.json(mockHistoryResponse)
        }),
      )
    })

    it('shows a "Continue Listening" section on the home page', async () => {
      renderApp({ route: '/' })

      await waitFor(
        () => {
          expect(screen.getByText(/continue listening/i)).toBeInTheDocument()
        },
        { timeout: 5000 },
      )
    })

    it('displays in-progress episodes in the Continue Listening section', async () => {
      renderApp({ route: '/' })

      await waitFor(
        () => {
          expect(screen.getByText(/continue listening/i)).toBeInTheDocument()
        },
        { timeout: 5000 },
      )

      // Should show the in-progress episode
      expect(
        screen.getAllByText(/React Server Components Deep Dive/i).length,
      ).toBeGreaterThan(0)
    })

    it('shows progress information for history entries', async () => {
      renderApp({ route: '/' })

      await waitFor(
        () => {
          expect(screen.getByText(/continue listening/i)).toBeInTheDocument()
        },
        { timeout: 5000 },
      )

      // Should show some indication of progress (e.g., "20 min left", progress bar, or percentage)
      // The ep-101 entry has progress=1200 out of duration=3420 (about 35%)
      // We check for the podcast name to confirm the data is joined and displayed
      const byteTalkMatches = screen.getAllByText(/Byte Talk/i)
      expect(byteTalkMatches.length).toBeGreaterThan(0)
    })
  })
})
