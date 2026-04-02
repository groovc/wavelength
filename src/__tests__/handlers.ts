import { http, HttpResponse } from 'msw'
import { mockPodcasts, mockEpisodes, mockCategories, getEpisodesForPodcast, searchFixtures } from './fixtures'

export const handlers = [
  http.get('/api/podcasts/trending', () => {
    const trending = [...mockPodcasts].sort((a, b) => b.rating - a.rating).slice(0, 4)
    return HttpResponse.json({ podcasts: trending })
  }),

  http.get('/api/podcasts/:id', ({ params }) => {
    const podcast = mockPodcasts.find((p) => p.id === params.id)
    if (!podcast) return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    const episodes = getEpisodesForPodcast(podcast.id)
    return HttpResponse.json({ ...podcast, episodes })
  }),

  http.get('/api/podcasts', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    let result = [...mockPodcasts]
    if (category) {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }
    return HttpResponse.json({ podcasts: result })
  }),

  http.get('/api/episodes/:id', ({ params }) => {
    const episode = mockEpisodes.find((e) => e.id === params.id)
    if (!episode) return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    const podcast = mockPodcasts.find((p) => p.id === episode.podcastId)
    return HttpResponse.json({ ...episode, podcast })
  }),

  http.get('/api/categories', () => {
    return HttpResponse.json({ categories: mockCategories })
  }),

  http.get('/api/search', ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') || ''
    const category = url.searchParams.get('category') || undefined
    if (!q.trim()) {
      return HttpResponse.json({ podcasts: [], episodes: [] })
    }
    return HttpResponse.json(searchFixtures(q, category))
  }),
]
