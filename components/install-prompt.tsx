'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
   
    useEffect(() => {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
      )
   
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])
   
    if (isStandalone) {
      return null // Don't show install button if already installed
    }
   
    return (
      <div>
        <h3>Install App</h3>
        <Button>Add to Home Screen</Button>
        {isIOS && (
          <p>
            To install this app on your iOS device, tap the share button
            <span role="img" aria-label="share icon">
              {' '}
              ⎋{' '}
            </span>
            and then "Add to Home Screen"
            <span role="img" aria-label="plus icon">
              {' '}
              ➕{' '}
            </span>.
          </p>
        )}
      </div>
    )
  }