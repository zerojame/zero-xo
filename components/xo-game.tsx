'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { type Player } from '../lib/check-winner'

const XOGame = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameMode, setGameMode] = useState<'1p' | '2p'>('2p')
  const [board, setBoard] = useState<Record<string, Player>>({})
  const [minRow, setMinRow] = useState(0)
  const [maxRow, setMaxRow] = useState(0)
  const [minCol, setMinCol] = useState(0)
  const [maxCol, setMaxCol] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Player>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
        setIsInstallable(false)
      })
    }
  }

  const handleClick = (row: number, col: number) => {
    const key = `${row},${col}`
    if (board[key] || winner) return

    const newBoard = { ...board, [key]: currentPlayer }
    setBoard(newBoard)

    // Update bounds for rendering
    setMinRow(Math.min(minRow, row))
    setMaxRow(Math.max(maxRow, row))
    setMinCol(Math.min(minCol, col))
    setMaxCol(Math.max(maxCol, col))

    // Check for a winner from the last move
    const directions = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ]
    let foundWinner: Player = null
    for (const [dr, dc] of directions) {
      let count = 1
      for (const dir of [1, -1]) {
        let r = row + dr * dir
        let c = col + dc * dir
        while (newBoard[`${r},${c}`] === currentPlayer) {
          count++
          r += dr * dir
          c += dc * dir
        }
      }
      if (count >= 3) {
        foundWinner = currentPlayer
        break
      }
    }
    if (foundWinner) {
      setWinner(foundWinner)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard({})
    setMinRow(0)
    setMaxRow(0)
    setMinCol(0)
    setMaxCol(0)
    setCurrentPlayer('X')
    setWinner(null)
    setGameStarted(false)
    setGameMode('2p')
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
        <div className="flex gap-4 mb-4">
          <Button disabled>1 Player (bot)</Button>
          <Button
            variant={gameMode === '2p' ? 'default' : 'outline'}
            onClick={() => setGameMode('2p')}
          >
            2 Players
          </Button>
        </div>
        <Button onClick={() => setGameStarted(true)}>Start</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
      {(() => {
        const renderMinRow = minRow - 1
        const renderMaxRow = maxRow + 1
        const renderMinCol = minCol - 1
        const renderMaxCol = maxCol + 1
        const cols = renderMaxCol - renderMinCol + 1
        const cells = []
        for (let r = renderMinRow; r <= renderMaxRow; r++) {
          for (let c = renderMinCol; c <= renderMaxCol; c++) {
            const key = `${r},${c}`
            const cell = board[key]
            cells.push(
              <Button
                key={key}
                onClick={() => handleClick(r, c)}
                className="w-20 h-20 text-4xl font-bold"
                variant={cell ? "default" : "outline"}
                disabled={!!cell || !!winner}
              >
                {cell}
              </Button>
            )
          }
        }
        return (
          <div
            className="grid gap-2 mb-4"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {cells}
          </div>
        )
      })()}
      <div className="text-2xl font-semibold mb-4">
        {winner
          ? `Winner: ${winner}`
          : Object.keys(board).length === 9 && !winner
          ? "It's a draw!"
          : `Current player: ${currentPlayer}`}
      </div>
      <Button onClick={resetGame} className="px-4 py-2 mb-4">
        Reset Game
      </Button>
      {isInstallable && (
        <Button onClick={handleInstall} className="px-4 py-2">
          Install App
        </Button>
      )}
    </div>
  )
}

export default XOGame

