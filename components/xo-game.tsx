'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"

type Player = 'X' | 'O' | null

const XOGame = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Player>(null)

  const checkWinner = useCallback((board: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    return null
  }, [])

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <Button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 text-4xl font-bold"
            variant={cell ? "default" : "outline"}
            disabled={!!cell || !!winner}
          >
            {cell}
          </Button>
        ))}
      </div>
      <div className="text-2xl font-semibold mb-4">
        {winner
          ? `Winner: ${winner}`
          : board.every((cell) => cell !== null)
          ? "It's a draw!"
          : `Current player: ${currentPlayer}`}
      </div>
      <Button onClick={resetGame} className="px-4 py-2">
        Reset Game
      </Button>
    </div>
  )
}

export default XOGame

