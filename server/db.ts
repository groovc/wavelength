import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import { podcasts, episodes } from './data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function createDatabase(dbPath?: string): Database.Database {
  const resolvedPath = dbPath || path.join(__dirname, 'wavelength.db')
  const db = new Database(resolvedPath)

  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS podcasts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      episode_count INTEGER NOT NULL,
      rating REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS episodes (
      id TEXT PRIMARY KEY,
      podcast_id TEXT NOT NULL REFERENCES podcasts(id),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL,
      published_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS listening_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      episode_id TEXT NOT NULL REFERENCES episodes(id),
      podcast_id TEXT NOT NULL REFERENCES podcasts(id),
      progress INTEGER NOT NULL DEFAULT 0,
      completed INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(episode_id)
    );
  `)

  return db
}

export function seedDatabase(db: Database.Database): void {
  const insertPodcast = db.prepare(`
    INSERT OR REPLACE INTO podcasts (id, title, author, description, category, image_url, episode_count, rating)
    VALUES (@id, @title, @author, @description, @category, @imageUrl, @episodeCount, @rating)
  `)

  const insertEpisode = db.prepare(`
    INSERT OR REPLACE INTO episodes (id, podcast_id, title, description, duration, published_at)
    VALUES (@id, @podcastId, @title, @description, @duration, @publishedAt)
  `)

  const seedAll = db.transaction(() => {
    for (const podcast of podcasts) {
      insertPodcast.run(podcast)
    }
    for (const episode of episodes) {
      insertEpisode.run(episode)
    }
  })

  seedAll()
}

export function getDatabase(): Database.Database {
  const db = createDatabase()
  seedDatabase(db)
  return db
}
