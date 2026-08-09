# KAGE Anime

Standalone anime discovery app powered by the free Jikan v4 API.

## Features
- Live Jikan posters and metadata
- Trending, top, airing and upcoming anime
- Search and browse filters
- Anime details and recommendations
- Local My List persistence
- Responsive Crunchyroll-inspired dark UI
- AI Video Studio powered by the Luma Dream Machine API

## AI Video Studio

The app keeps the Luma API key server-side and exposes two Next.js routes:

- `POST /api/video/generate` — starts a text-to-video or keyframe generation
- `GET /api/video/:id` — checks generation status and returns the completed video asset

Add `LUMA_API_KEY` to the Vercel project environment variables (Production and Preview as needed). Never put the key in client-side code or commit the real key to Git.

Luma's API supports text-to-video and image-to-video generation, with models including Ray 2 and Ray 2 Flash. See the current API documentation for account access and billing.

## Preview
GitHub Pages can serve the static portions of this app directly from the repository. The AI Video Studio requires a Next.js/Vercel runtime because its API routes must keep the Luma credential private.
