# Wavelength — Product Specification

## Overview

Wavelength is a mobile-first podcast discovery app. Users browse podcasts by category, explore trending shows, view episode lists, and listen to episodes. The app is designed for mobile browsers (375px–430px viewport).

## API

The backend API runs at `http://localhost:3001` and is proxied through Vite at `/api`.

### Endpoints

#### `GET /api/podcasts`

Returns a list of podcasts. Supports optional category filtering.

#### `GET /api/podcasts/trending`

Returns the top trending podcasts.

#### `GET /api/podcasts/:id`

Returns a single podcast with its episodes.

#### `GET /api/episodes/:id`

Returns a single episode with its parent podcast.

#### `GET /api/categories`

Returns the list of categories.

#### `GET /api/search`

Searches podcasts and episodes by text. Supports category filtering.

## Routes

- `/` — Home (browse and discover podcasts)
- `/podcasts/:id` — Podcast detail (show info and episode list)
- `/search` — Search (Part 2)

## Design

The app should feel like a native mobile app. It is designed for mobile-sized viewports.

## Features

### Home Page (`/`)

The landing screen where users discover podcasts. Show trending and all available podcasts.

### Podcast Detail (`/podcasts/:id`)

Detailed view of a single podcast with its full episode list.
