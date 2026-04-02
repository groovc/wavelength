import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './test-utils'

describe('Part 2 — Issue 1: Search', () => {
  it('renders a search input on /search', async () => {
    renderApp({ route: '/search' })

    await waitFor(() => {
      const input =
        screen.queryByRole('searchbox') ??
        screen.queryByPlaceholderText(/search/i)
      expect(input).toBeInTheDocument()
    })
  })

  it('shows matching podcasts when searching by title', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/search' })

    await waitFor(() => {
      expect(
        screen.queryByRole('searchbox') ?? screen.queryByPlaceholderText(/search/i),
      ).toBeInTheDocument()
    })

    const input = (screen.queryByRole('searchbox') ??
      screen.getByPlaceholderText(/search/i)) as HTMLInputElement

    await user.type(input, 'byte')

    await waitFor(() => {
      expect(screen.getByText(/Byte Talk/i)).toBeInTheDocument()
    })
  })

  it('shows matching episodes when searching by episode title', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/search' })

    await waitFor(() => {
      expect(
        screen.queryByRole('searchbox') ?? screen.queryByPlaceholderText(/search/i),
      ).toBeInTheDocument()
    })

    const input = (screen.queryByRole('searchbox') ??
      screen.getByPlaceholderText(/search/i)) as HTMLInputElement

    await user.type(input, 'react')

    await waitFor(() => {
      expect(
        screen.getByText(/React Server Components Deep Dive/i),
      ).toBeInTheDocument()
    })
  })

  it('filters by category when a category is selected', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/search' })

    await waitFor(() => {
      expect(
        screen.queryByRole('searchbox') ?? screen.queryByPlaceholderText(/search/i),
      ).toBeInTheDocument()
    })

    const input = (screen.queryByRole('searchbox') ??
      screen.getByPlaceholderText(/search/i)) as HTMLInputElement

    // Type a broad query first
    await user.type(input, 'the')

    // Wait for results to include cross-category matches
    await waitFor(() => {
      const matches = screen.getAllByText(/The Funny Hour/i)
      expect(matches.length).toBeGreaterThan(0)
    })

    // Now select a category filter — should narrow results
    const categoryFilter = screen.getByTestId('category-filter')
    await user.selectOptions(categoryFilter, 'Comedy')

    // After filtering, "The Funny Hour" (Comedy) should remain
    await waitFor(() => {
      const matches = screen.getAllByText(/The Funny Hour/i)
      expect(matches.length).toBeGreaterThan(0)
    })

    // Non-comedy results should be gone
    await waitFor(() => {
      expect(screen.queryByText(/Zero Day/i)).not.toBeInTheDocument()
    })
  })

  it('shows an empty state when no results match', async () => {
    const user = userEvent.setup()
    renderApp({ route: '/search' })

    await waitFor(() => {
      expect(
        screen.queryByRole('searchbox') ?? screen.queryByPlaceholderText(/search/i),
      ).toBeInTheDocument()
    })

    const input = (screen.queryByRole('searchbox') ??
      screen.getByPlaceholderText(/search/i)) as HTMLInputElement

    await user.type(input, 'xyznonexistent')

    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument()
    })
  })
})
