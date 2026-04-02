import type { Podcast, Episode, EpisodeWithPodcast } from '../types'

export const mockPodcasts: Podcast[] = [
  { id: 'pod-1', title: 'Byte Talk', author: 'Sam Chen & Mia Torres', description: 'Weekly deep-dives into software engineering, web development, and tech culture', category: 'Technology', imageUrl: 'https://placehold.co/300x300/6366f1/white?text=BT', episodeCount: 142, rating: 4.8 },
  { id: 'pod-2', title: 'Cold Trail', author: 'Elena Vasquez', description: 'Revisiting unsolved cases with new evidence and fresh perspectives', category: 'True Crime', imageUrl: 'https://placehold.co/300x300/dc2626/white?text=CT', episodeCount: 68, rating: 4.7 },
  { id: 'pod-3', title: 'The Funny Hour', author: 'Marcus Webb', description: 'Stand-up comedians join Marcus for unfiltered conversations and improv games', category: 'Comedy', imageUrl: 'https://placehold.co/300x300/f59e0b/white?text=TFH', episodeCount: 203, rating: 4.9 },
  { id: 'pod-4', title: 'Particle Wave', author: 'Dr. Kenji Nakamura', description: 'Making quantum physics, cosmology, and neuroscience accessible to everyone', category: 'Science', imageUrl: 'https://placehold.co/300x300/10b981/white?text=PW', episodeCount: 95, rating: 4.6 },
  { id: 'pod-5', title: 'Founder Fuel', author: 'Priya Sharma', description: 'Startup founders share the real stories behind their companies — the failures, pivots, and breakthroughs', category: 'Business', imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=FF', episodeCount: 178, rating: 4.7 },
  { id: 'pod-6', title: 'Zero Day', author: 'Alex Kowalski', description: 'True stories of hacks, breaches, and the people who fight cybercrime', category: 'Technology', imageUrl: 'https://placehold.co/300x300/ec4899/white?text=ZD', episodeCount: 52, rating: 4.9 },
]

export const mockEpisodes: Episode[] = [
  { id: 'ep-101', podcastId: 'pod-1', title: 'React Server Components Deep Dive', description: 'We break down how RSCs change the React mental model.', duration: 3420, publishedAt: '2026-03-28T08:00:00Z' },
  { id: 'ep-102', podcastId: 'pod-1', title: 'Is TypeScript Worth the Overhead?', description: 'A candid debate on TypeScript costs vs. benefits.', duration: 2940, publishedAt: '2026-03-21T08:00:00Z' },
  { id: 'ep-103', podcastId: 'pod-1', title: 'Building for the Edge', description: 'Edge computing and why your next app might not need a traditional server.', duration: 3180, publishedAt: '2026-03-14T08:00:00Z' },
  { id: 'ep-201', podcastId: 'pod-2', title: 'The Vanishing at Cedar Lake', description: 'A family of four disappeared from their lakeside cabin.', duration: 3900, publishedAt: '2026-03-26T06:00:00Z' },
  { id: 'ep-202', podcastId: 'pod-2', title: 'The Cipher Letters', description: 'Encrypted letters reveal details about a decade-old robbery.', duration: 4200, publishedAt: '2026-03-19T06:00:00Z' },
  { id: 'ep-203', podcastId: 'pod-2', title: 'Witness 47', description: 'One witness. Two contradictory statements.', duration: 3600, publishedAt: '2026-03-12T06:00:00Z' },
  { id: 'ep-301', podcastId: 'pod-3', title: 'Comedy in the Age of AI', description: 'Can machines be funny? Three comedians try to out-joke ChatGPT.', duration: 3300, publishedAt: '2026-03-27T10:00:00Z' },
  { id: 'ep-302', podcastId: 'pod-3', title: 'The Worst Gig Ever', description: 'Comedians share their most disastrous live performances.', duration: 2700, publishedAt: '2026-03-20T10:00:00Z' },
  { id: 'ep-303', podcastId: 'pod-3', title: 'Improv Roulette', description: 'Audience suggestions, random props, and zero preparation.', duration: 3000, publishedAt: '2026-03-13T10:00:00Z' },
  { id: 'ep-401', podcastId: 'pod-4', title: 'What Happened Before the Big Bang?', description: 'Competing theories about what preceded our universe.', duration: 4500, publishedAt: '2026-03-25T12:00:00Z' },
  { id: 'ep-402', podcastId: 'pod-4', title: 'Your Brain on Music', description: 'Why certain songs give you chills.', duration: 3060, publishedAt: '2026-03-18T12:00:00Z' },
  { id: 'ep-403', podcastId: 'pod-4', title: 'The Quantum Internet', description: 'Quantum entanglement and unhackable communication.', duration: 3720, publishedAt: '2026-03-11T12:00:00Z' },
  { id: 'ep-501', podcastId: 'pod-5', title: 'From Garage to IPO: The Notion Story', description: 'How a small team built a popular productivity tool.', duration: 4080, publishedAt: '2026-03-24T14:00:00Z' },
  { id: 'ep-502', podcastId: 'pod-5', title: 'When to Pivot (And When to Quit)', description: 'Three founders share how they knew it was time to change.', duration: 3540, publishedAt: '2026-03-17T14:00:00Z' },
  { id: 'ep-503', podcastId: 'pod-5', title: 'Bootstrapped to $10M ARR', description: 'No VC money. Just customers and grit.', duration: 3360, publishedAt: '2026-03-10T14:00:00Z' },
  { id: 'ep-601', podcastId: 'pod-6', title: 'The Hospital Ransomware Attack', description: 'When hackers locked down a hospital, lives were on the line.', duration: 4800, publishedAt: '2026-03-29T09:00:00Z' },
  { id: 'ep-602', podcastId: 'pod-6', title: 'Inside a Bug Bounty', description: 'Finding and reporting a critical vulnerability.', duration: 2880, publishedAt: '2026-03-22T09:00:00Z' },
  { id: 'ep-603', podcastId: 'pod-6', title: 'Social Engineering 101', description: 'The most dangerous hacking tool is conversation.', duration: 3240, publishedAt: '2026-03-15T09:00:00Z' },
]

export const mockCategories = ['Technology', 'True Crime', 'Comedy', 'Science', 'Business']

export function getEpisodesForPodcast(podcastId: string): Episode[] {
  return mockEpisodes
    .filter((e) => e.podcastId === podcastId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function searchFixtures(query: string, category?: string) {
  const q = query.toLowerCase()
  let filteredPodcasts = mockPodcasts
  if (category) {
    filteredPodcasts = filteredPodcasts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    )
  }
  const matchingPodcasts = filteredPodcasts.filter(
    (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.author.toLowerCase().includes(q),
  )
  const podcastIds = new Set(filteredPodcasts.map((p) => p.id))
  const matchingEpisodes: EpisodeWithPodcast[] = mockEpisodes
    .filter((e) => podcastIds.has(e.podcastId))
    .filter((e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
    .map((e) => ({ ...e, podcast: mockPodcasts.find((p) => p.id === e.podcastId)! }))
  return { podcasts: matchingPodcasts, episodes: matchingEpisodes }
}
