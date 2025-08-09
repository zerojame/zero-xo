import { describe, it, expect, test } from 'vitest'
import { checkWinner, type Player, type Board } from '@/lib/check-winner'

describe('checkWinner', () => {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const indexToCoord = (index: number): [number, number] => [Math.floor(index / 3), index % 3]

  test.each(lines)('detects X win for positions %o', (a, b, c) => {
    const board: Board = Array.from({ length: 3 }, () => Array<Player>(3).fill(null))
    for (const index of [a, b, c]) {
      const [r, col] = indexToCoord(index)
      board[r][col] = 'X'
    }
    expect(checkWinner(board)).toBe('X')
  })

  test.each(lines)('detects O win for positions %o', (a, b, c) => {
    const board: Board = Array.from({ length: 3 }, () => Array<Player>(3).fill(null))
    for (const index of [a, b, c]) {
      const [r, col] = indexToCoord(index)
      board[r][col] = 'O'
    }
    expect(checkWinner(board)).toBe('O')
  })

  it('returns null for a draw', () => {
    const board: Board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ]
    expect(checkWinner(board)).toBeNull()
  })

  it('returns null for a non-terminal state', () => {
    const board: Board = [
      ['X', 'O', 'X'],
      [null, 'O', null],
      [null, 'X', null],
    ]
    expect(checkWinner(board)).toBeNull()
  })
})
