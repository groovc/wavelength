import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './test-utils'

describe('Part 2 — Issue 2: Now Playing Bar', () => {
  it('shows a play button on episodes in the podcast detail page', async () => {
    renderApp({ route: '/podcasts/pod-1' })

    await waitFor(
      () => {
        expect(screen.getByTestId('play-ep-101')).toBeInTheDocument()
      },
      { timeout: 5000 },
    )
  })

  it('shows the Now Playing bar when a play button is clicked', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/podcasts/pod-1' })

    await waitFor(() => {
      expect(screen.getByTestId('play-ep-101')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('play-ep-101'))

    await waitFor(() => {
      expect(screen.getByTestId('now-playing')).toBeInTheDocument()
    })
  })

  it('displays the episode title in the Now Playing bar', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/podcasts/pod-1' })

    await waitFor(() => {
      expect(screen.getByTestId('play-ep-101')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('play-ep-101'))

    await waitFor(() => {
      const nowPlaying = screen.getByTestId('now-playing')
      expect(nowPlaying).toHaveTextContent(/React Server Components Deep Dive/i)
    })
  })

  it('displays the podcast name in the Now Playing bar', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/podcasts/pod-1' })

    await waitFor(() => {
      expect(screen.getByTestId('play-ep-101')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('play-ep-101'))

    await waitFor(() => {
      const nowPlaying = screen.getByTestId('now-playing')
      expect(nowPlaying).toHaveTextContent(/Byte Talk/i)
    })
  })

  it('has a play/pause toggle in the Now Playing bar', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/podcasts/pod-1' })

    await waitFor(() => {
      expect(screen.getByTestId('play-ep-101')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('play-ep-101'))

    await waitFor(() => {
      expect(screen.getByTestId('now-playing')).toBeInTheDocument()
    })

    // Should have a play/pause button inside the Now Playing bar
    const nowPlaying = screen.getByTestId('now-playing')
    const playPauseBtn =
      nowPlaying.querySelector('[data-testid="play-pause"]') ??
      nowPlaying.querySelector('button')
    expect(playPauseBtn).toBeInTheDocument()
  })

  it('persists the Now Playing bar when navigating to another page', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/podcasts/pod-1' })

    await waitFor(() => {
      expect(screen.getByTestId('play-ep-101')).toBeInTheDocument()
    })

    // Start playing
    await user.click(screen.getByTestId('play-ep-101'))
    await waitFor(() => {
      expect(screen.getByTestId('now-playing')).toBeInTheDocument()
    })

    // Navigate to home — find a link to home/root
    const homeLinks = screen.getAllByRole('link').filter(
      (link) => {
        const href = link.getAttribute('href')
        return href === '/' || href === ''
      },
    )

    if (homeLinks.length > 0) {
      await user.click(homeLinks[0])
    }

    // Now Playing bar should still be visible
    await waitFor(() => {
      expect(screen.getByTestId('now-playing')).toBeInTheDocument()
      expect(screen.getByTestId('now-playing')).toHaveTextContent(
        /React Server Components Deep Dive/i,
      )
    })
  })
})
