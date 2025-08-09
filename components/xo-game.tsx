'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { type Player, type Board, checkWinner } from '../lib/check-winner'
import { getBotMove } from '../lib/bot'

const XOGame = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameMode, setGameMode] = useState<'1p' | '2p'>('2p')
  const [board, setBoard] = useState<Board>({})
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
    if (gameMode === '1p' && currentPlayer === 'O') return
    const key = `${row},${col}`
    if (board[key] || winner) return

    const newBoard: Board = { ...board, [key]: currentPlayer }
    setBoard(newBoard)

    // Update bounds for rendering
    setMinRow(Math.min(minRow, row))
    setMaxRow(Math.max(maxRow, row))
    setMinCol(Math.min(minCol, col))
    setMaxCol(Math.max(maxCol, col))

    // Check for a winner after the move
    const foundWinner = checkWinner(newBoard)
    if (foundWinner) {
      setWinner(foundWinner)
      return
    }

    const nextPlayer: Player = currentPlayer === 'X' ? 'O' : 'X'
    setCurrentPlayer(nextPlayer)

    if (gameMode === '1p' && nextPlayer === 'O') {
      setTimeout(() => {
        const [botRow, botCol] = getBotMove(newBoard, 'O')
        const botKey = `${botRow},${botCol}`
        const botBoard: Board = { ...newBoard, [botKey]: 'O' }
        setBoard(botBoard)
        setMinRow((prev) => Math.min(prev, botRow))
        setMaxRow((prev) => Math.max(prev, botRow))
        setMinCol((prev) => Math.min(prev, botCol))
        setMaxCol((prev) => Math.max(prev, botCol))

        const botWinner = checkWinner(botBoard)
        if (botWinner) {
          setWinner(botWinner)
        } else {
          setCurrentPlayer('X')
        }
      }, 300)
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
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[hsl(var(--board-bg))]">
        <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
        <div className="flex gap-4 mb-4">
          <Button
            variant={gameMode === '1p' ? 'default' : 'outline'}
            onClick={() => setGameMode('1p')}
          >
            1 Player (bot)
          </Button>
          <Button
            variant={gameMode === '2p' ? 'default' : 'outline'}
            onClick={() => setGameMode('2p')}
          >
            2 Players
          </Button>
        </div>
        <Button
          onClick={() => setGameStarted(true)}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Start
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[hsl(var(--board-bg))]">
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
                className={`w-20 h-20 text-4xl font-bold ${cell === 'X' ? 'text-[hsl(var(--x-color))]' : cell === 'O' ? 'text-[hsl(var(--o-color))]' : ''}`}
                variant={cell ? 'default' : 'outline'}
                disabled={!!cell || !!winner}
              >
                {cell}
              </Button>
            )
          }
        }
        return (
          <div
            className="grid gap-2 mb-4 bg-[hsl(var(--board-bg))]"
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
      <Button
        onClick={resetGame}
        className="px-4 py-2 mb-4 bg-accent text-accent-foreground hover:bg-accent/90"
      >
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

