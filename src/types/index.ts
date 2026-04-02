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
  duration: number
  publishedAt: string
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
