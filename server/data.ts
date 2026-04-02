export interface Podcast {
  id: string
  title: string
  author: string
  description: string
  category: string
  imageUrl: string
  episodeCount: number
  rating: number
}

export interface Episode {
  id: string
  podcastId: string
  title: string
  description: string
  duration: number // seconds
  publishedAt: string // ISO 8601
}

export interface PodcastWithEpisodes extends Podcast {
  episodes: Episode[]
}

export interface EpisodeWithPodcast extends Episode {
  podcast: Podcast
}

export interface SearchResults {
  podcasts: Podcast[]
  episodes: EpisodeWithPodcast[]
}

export const categories = ['Technology', 'True Crime', 'Comedy', 'Science', 'Business']

export const podcasts: Podcast[] = [
  {
    id: 'pod-1',
    title: 'Byte Talk',
    author: 'Sam Chen & Mia Torres',
    description: 'Weekly deep-dives into software engineering, web development, and tech culture',
    category: 'Technology',
    imageUrl: 'https://placehold.co/300x300/6366f1/white?text=BT',
    episodeCount: 142,
    rating: 4.8,
  },
  {
    id: 'pod-2',
    title: 'Cold Trail',
    author: 'Elena Vasquez',
    description: 'Revisiting unsolved cases with new evidence and fresh perspectives',
    category: 'True Crime',
    imageUrl: 'https://placehold.co/300x300/dc2626/white?text=CT',
    episodeCount: 68,
    rating: 4.7,
  },
  {
    id: 'pod-3',
    title: 'The Funny Hour',
    author: 'Marcus Webb',
    description: 'Stand-up comedians join Marcus for unfiltered conversations and improv games',
    category: 'Comedy',
    imageUrl: 'https://placehold.co/300x300/f59e0b/white?text=TFH',
    episodeCount: 203,
    rating: 4.9,
  },
  {
    id: 'pod-4',
    title: 'Particle Wave',
    author: 'Dr. Kenji Nakamura',
    description: 'Making quantum physics, cosmology, and neuroscience accessible to everyone',
    category: 'Science',
    imageUrl: 'https://placehold.co/300x300/10b981/white?text=PW',
    episodeCount: 95,
    rating: 4.6,
  },
  {
    id: 'pod-5',
    title: 'Founder Fuel',
    author: 'Priya Sharma',
    description: 'Startup founders share the real stories behind their companies — the failures, pivots, and breakthroughs',
    category: 'Business',
    imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=FF',
    episodeCount: 178,
    rating: 4.7,
  },
  {
    id: 'pod-6',
    title: 'Zero Day',
    author: 'Alex Kowalski',
    description: 'True stories of hacks, breaches, and the people who fight cybercrime',
    category: 'Technology',
    imageUrl: 'https://placehold.co/300x300/ec4899/white?text=ZD',
    episodeCount: 52,
    rating: 4.9,
  },
]

export const episodes: Episode[] = [
  // Byte Talk (pod-1)
  { id: 'ep-101', podcastId: 'pod-1', title: 'React Server Components Deep Dive', description: 'We break down how RSCs change the React mental model and when you should actually use them.', duration: 3420, publishedAt: '2026-03-28T08:00:00Z' },
  { id: 'ep-102', podcastId: 'pod-1', title: 'Is TypeScript Worth the Overhead?', description: 'A candid debate on TypeScript\'s costs vs. benefits for teams of different sizes.', duration: 2940, publishedAt: '2026-03-21T08:00:00Z' },
  { id: 'ep-103', podcastId: 'pod-1', title: 'Building for the Edge', description: 'Edge computing, edge functions, and why your next app might not need a traditional server.', duration: 3180, publishedAt: '2026-03-14T08:00:00Z' },

  // Cold Trail (pod-2)
  { id: 'ep-201', podcastId: 'pod-2', title: 'The Vanishing at Cedar Lake', description: 'In 1998, a family of four disappeared from their lakeside cabin. No signs of struggle. No note.', duration: 3900, publishedAt: '2026-03-26T06:00:00Z' },
  { id: 'ep-202', podcastId: 'pod-2', title: 'The Cipher Letters', description: 'A series of encrypted letters arrive at a police station, each one revealing a detail about a decade-old robbery.', duration: 4200, publishedAt: '2026-03-19T06:00:00Z' },
  { id: 'ep-203', podcastId: 'pod-2', title: 'Witness 47', description: 'One witness. Two contradictory statements. And a conviction that might be wrong.', duration: 3600, publishedAt: '2026-03-12T06:00:00Z' },

  // The Funny Hour (pod-3)
  { id: 'ep-301', podcastId: 'pod-3', title: 'Comedy in the Age of AI', description: 'Can machines be funny? Three comedians try to out-joke ChatGPT. Results are... mixed.', duration: 3300, publishedAt: '2026-03-27T10:00:00Z' },
  { id: 'ep-302', podcastId: 'pod-3', title: 'The Worst Gig Ever', description: 'Comedians share their most disastrous live performances. Tears (of laughter) guaranteed.', duration: 2700, publishedAt: '2026-03-20T10:00:00Z' },
  { id: 'ep-303', podcastId: 'pod-3', title: 'Improv Roulette', description: 'Audience suggestions, random props, and zero preparation. Pure chaos.', duration: 3000, publishedAt: '2026-03-13T10:00:00Z' },

  // Particle Wave (pod-4)
  { id: 'ep-401', podcastId: 'pod-4', title: 'What Happened Before the Big Bang?', description: 'Cosmologists share competing theories about what preceded our universe.', duration: 4500, publishedAt: '2026-03-25T12:00:00Z' },
  { id: 'ep-402', podcastId: 'pod-4', title: 'Your Brain on Music', description: 'A neuroscientist explains why certain songs give you chills.', duration: 3060, publishedAt: '2026-03-18T12:00:00Z' },
  { id: 'ep-403', podcastId: 'pod-4', title: 'The Quantum Internet', description: 'How quantum entanglement could create unhackable communication networks.', duration: 3720, publishedAt: '2026-03-11T12:00:00Z' },

  // Founder Fuel (pod-5)
  { id: 'ep-501', podcastId: 'pod-5', title: 'From Garage to IPO: The Notion Story', description: 'How a small team built one of the most popular productivity tools in the world.', duration: 4080, publishedAt: '2026-03-24T14:00:00Z' },
  { id: 'ep-502', podcastId: 'pod-5', title: 'When to Pivot (And When to Quit)', description: 'Three founders who pivoted share how they knew it was time to change direction.', duration: 3540, publishedAt: '2026-03-17T14:00:00Z' },
  { id: 'ep-503', podcastId: 'pod-5', title: 'Bootstrapped to $10M ARR', description: 'No VC money, no investors. Just customers and grit. How they did it.', duration: 3360, publishedAt: '2026-03-10T14:00:00Z' },

  // Zero Day (pod-6)
  { id: 'ep-601', podcastId: 'pod-6', title: 'The Hospital Ransomware Attack', description: 'When hackers locked down a hospital\'s systems, lives were on the line. Inside the 72-hour response.', duration: 4800, publishedAt: '2026-03-29T09:00:00Z' },
  { id: 'ep-602', podcastId: 'pod-6', title: 'Inside a Bug Bounty', description: 'A white-hat hacker walks us through finding and reporting a critical vulnerability.', duration: 2880, publishedAt: '2026-03-22T09:00:00Z' },
  { id: 'ep-603', podcastId: 'pod-6', title: 'Social Engineering 101', description: 'The most dangerous hacking tool isn\'t code — it\'s conversation.', duration: 3240, publishedAt: '2026-03-15T09:00:00Z' },
]

export function getPodcastWithEpisodes(id: string): PodcastWithEpisodes | null {
  const podcast = podcasts.find((p) => p.id === id)
  if (!podcast) return null
  const podcastEpisodes = episodes
    .filter((e) => e.podcastId === id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return { ...podcast, episodes: podcastEpisodes }
}

export function getEpisodeWithPodcast(id: string): EpisodeWithPodcast | null {
  const episode = episodes.find((e) => e.id === id)
  if (!episode) return null
  const podcast = podcasts.find((p) => p.id === episode.podcastId)
  if (!podcast) return null
  return { ...episode, podcast }
}

export function searchContent(query: string, category?: string): SearchResults {
  const q = query.toLowerCase()

  let filteredPodcasts = podcasts
  if (category) {
    filteredPodcasts = filteredPodcasts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    )
  }

  const matchingPodcasts = filteredPodcasts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q),
  )

  const podcastIds = new Set(filteredPodcasts.map((p) => p.id))
  const matchingEpisodes = episodes
    .filter((e) => podcastIds.has(e.podcastId))
    .filter(
      (e) =>
        e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
    )
    .map((e) => {
      const podcast = podcasts.find((p) => p.id === e.podcastId)!
      return { ...e, podcast }
    })

  return { podcasts: matchingPodcasts, episodes: matchingEpisodes }
}
