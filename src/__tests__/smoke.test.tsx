import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderApp } from './test-utils'

describe('Part 1: Smoke Tests', () => {
  it('renders the app without crashing', () => {
    renderApp()
    // App should render something
    expect(document.getElementById('root') || document.body).toBeTruthy()
  })

  it('displays podcast content from the API on the home page', async () => {
    renderApp({ route: '/' })

    // At least one podcast title should appear after loading
    await waitFor(
      () => {
        expect(screen.getByText(/Byte Talk/i)).toBeInTheDocument()
      },
      { timeout: 5000 },
    )
  })

  it('displays multiple podcasts on the home page', async () => {
    renderApp({ route: '/' })

    await waitFor(
      () => {
        expect(screen.getByText(/Byte Talk/i)).toBeInTheDocument()
      },
      { timeout: 5000 },
    )

    // Should show more than one podcast
    expect(screen.getByText(/Zero Day/i)).toBeInTheDocument()
  })

  it('shows podcast detail with episodes when navigating to /podcasts/pod-1', async () => {
    renderApp({ route: '/podcasts/pod-1' })

    // Should show podcast info
    await waitFor(
      () => {
        expect(screen.getByText(/Byte Talk/i)).toBeInTheDocument()
      },
      { timeout: 5000 },
    )

    // Should show at least one episode
    await waitFor(() => {
      expect(
        screen.getByText(/React Server Components Deep Dive/i),
      ).toBeInTheDocument()
    })
  })

  it('shows episode details on the podcast detail page', async () => {
    renderApp({ route: '/podcasts/pod-1' })

    await waitFor(
      () => {
        expect(
          screen.getByText(/React Server Components Deep Dive/i),
        ).toBeInTheDocument()
      },
      { timeout: 5000 },
    )

    // Should also show another episode from the same podcast
    expect(
      screen.getByText(/Is TypeScript Worth the Overhead/i),
    ).toBeInTheDocument()
  })
})
