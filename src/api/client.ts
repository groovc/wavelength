const API_BASE = '/api'

export async function fetchPodcasts(category?: string) {
  const params = category ? `?category=${encodeURIComponent(category)}` : ''
  const res = await fetch(`${API_BASE}/podcasts${params}`)
  if (!res.ok) throw new Error(`Failed to fetch podcasts: ${res.status}`)
  return res.json()
}

export async function fetchTrendingPodcasts() {
  const res = await fetch(`${API_BASE}/podcasts/trending`)
  if (!res.ok) throw new Error(`Failed to fetch trending: ${res.status}`)
  return res.json()
}

export async function fetchPodcast(id: string) {
  const res = await fetch(`${API_BASE}/podcasts/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch podcast: ${res.status}`)
  return res.json()
}

export async function fetchEpisode(id: string) {
  const res = await fetch(`${API_BASE}/episodes/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch episode: ${res.status}`)
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`)
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)
  return res.json()
}

export async function searchContent(query: string, category?: string) {
  const params = new URLSearchParams({ q: query })
  if (category) params.set('category', category)
  const res = await fetch(`${API_BASE}/search?${params}`)
  if (!res.ok) throw new Error(`Failed to search: ${res.status}`)
  return res.json()
}
