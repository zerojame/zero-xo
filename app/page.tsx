'use client'

import { useEffect } from 'react'
import XOGame from '@/components/xo-game'
import InstallPrompt from '@/components/install-prompt'

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          },
          function(err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  }, [])

  return (
    <main>
      <InstallPrompt />
      <XOGame />
    </main>
  )
}

