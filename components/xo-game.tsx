'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { checkWinner, type Player, type Board } from '../lib/check-winner'

const XOGame = () => {
  const createEmptyBoard = (): Board =>
    Array.from({ length: 3 }, () => Array<Player>(3).fill(null))

  const [board, setBoard] = useState<Board>(createEmptyBoard())
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
    if (board[row][col] || winner) return

    const newBoard = board.map((r) => r.slice())
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard(createEmptyBoard())
    setCurrentPlayer('X')
    setWinner(null)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className="w-20 h-20 text-4xl font-bold"
              variant={cell ? "default" : "outline"}
              disabled={!!cell || !!winner}
            >
              {cell}
            </Button>
          ))
        )}
      </div>
      <div className="text-2xl font-semibold mb-4">
        {winner
          ? `Winner: ${winner}`
          : board.flat().every((cell) => cell !== null)
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

