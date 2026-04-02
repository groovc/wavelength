import express from 'express'
import cors from 'cors'
import {
  podcasts,
  episodes,
  categories,
  getPodcastWithEpisodes,
  getEpisodeWithPodcast,
  searchContent,
} from './data.js'

const app = express()
app.use(cors())
app.use(express.json())

// GET /api/podcasts — list all, optional category filter
app.get('/api/podcasts', (req, res) => {
  const category = req.query.category as string | undefined
  let result = [...podcasts]
  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    )
  }
  res.json({ podcasts: result })
})

// GET /api/podcasts/trending — top 4 by rating
app.get('/api/podcasts/trending', (_req, res) => {
  const trending = [...podcasts].sort((a, b) => b.rating - a.rating).slice(0, 4)
  res.json({ podcasts: trending })
})

// GET /api/podcasts/:id — single podcast with episodes
app.get('/api/podcasts/:id', (req, res) => {
  const result = getPodcastWithEpisodes(req.params.id)
  if (!result) {
    return res.status(404).json({ error: 'Podcast not found' })
  }
  res.json(result)
})

// GET /api/episodes/:id — single episode with parent podcast
app.get('/api/episodes/:id', (req, res) => {
  const result = getEpisodeWithPodcast(req.params.id)
  if (!result) {
    return res.status(404).json({ error: 'Episode not found' })
  }
  res.json(result)
})

// GET /api/categories
app.get('/api/categories', (_req, res) => {
  res.json({ categories })
})

// GET /api/search?q=&category=
app.get('/api/search', (req, res) => {
  const q = (req.query.q as string) || ''
  const category = req.query.category as string | undefined
  if (!q.trim()) {
    return res.json({ podcasts: [], episodes: [] })
  }
  res.json(searchContent(q, category))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Wavelength API running at http://localhost:${PORT}`)
})
