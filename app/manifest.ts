import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tic-Tac-Toe PWA',
    short_name: 'XO Game',
    description: 'A simple Tic-Tac-Toe game as a Progressive Web App',
    start_url: '/',
    display: 'standalone',
    background_color: 'white',
    theme_color: 'black',
    icons: [
      {
        src: '/icon-192x192.jpg',
        sizes: '192x192',
        type: 'image/jpg',
      },
      {
        src: '/icon-512x512.jpg',
        sizes: '512x512',
        type: 'image/jpg',
      },
    ],
  }
}

