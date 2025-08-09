import { describe, it, expect, test } from 'vitest'
import { checkWinner, type Player, type Board } from '../../lib/check-winner'

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

  const createBoard = (): Board =>
    Array.from({ length: 3 }, () => Array<Player>(3).fill(null))

  const toBoard = (flat: Player[]): Board => [
    flat.slice(0, 3),
    flat.slice(3, 6),
    flat.slice(6, 9),
  ]

  test.each(lines)('detects X win for positions %o', (a, b, c) => {
    const board = createBoard()
    ;[a, b, c].forEach((index) => {
      const row = Math.floor(index / 3)
      const col = index % 3
      board[row][col] = 'X'
    })
    expect(checkWinner(board)).toBe('X')
  })

  test.each(lines)('detects O win for positions %o', (a, b, c) => {
    const board = createBoard()
    ;[a, b, c].forEach((index) => {
      const row = Math.floor(index / 3)
      const col = index % 3
      board[row][col] = 'O'
    })
    expect(checkWinner(board)).toBe('O')
  })

  it('returns null for a draw', () => {
    const board = toBoard(['X','O','X','X','O','O','O','X','X'])
    expect(checkWinner(board)).toBeNull()
  })

  it('returns null for a non-terminal state', () => {
    const board = toBoard(['X','O','X',null,'O',null,null,'X',null])
    expect(checkWinner(board)).toBeNull()
  })
})
