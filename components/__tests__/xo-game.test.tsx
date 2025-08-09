import { describe, it, expect } from 'vitest'
import { checkWinner, type Board } from '../../lib/check-winner'

describe('checkWinner', () => {
  it('detects a horizontal win away from the origin', () => {
    const board: Board = {
      '5,5': 'X',
      '5,6': 'X',
      '5,7': 'X',
    }
    expect(checkWinner(board)).toBe('X')
  })

  it('detects a vertical win away from the origin', () => {
    const board: Board = {
      '5,5': 'O',
      '6,5': 'O',
      '7,5': 'O',
    }
    expect(checkWinner(board)).toBe('O')
  })

  it('detects a diagonal win away from the origin', () => {
    const board: Board = {
      '5,5': 'X',
      '6,6': 'X',
      '7,7': 'X',
    }
    expect(checkWinner(board)).toBe('X')
  })

  it('detects an anti-diagonal win away from the origin', () => {
    const board: Board = {
      '7,5': 'O',
      '6,6': 'O',
      '5,7': 'O',
    }
    expect(checkWinner(board)).toBe('O')
  })

  it('handles negative coordinates in a win', () => {
    const board: Board = {
      '-1,-1': 'X',
      '0,0': 'X',
      '1,1': 'X',
    }
    expect(checkWinner(board)).toBe('X')
  })

  it('returns null for a draw', () => {
    const board: Board = {
      '0,0': 'X', '0,1': 'O', '0,2': 'X',
      '1,0': 'X', '1,1': 'O', '1,2': 'O',
      '2,0': 'O', '2,1': 'X', '2,2': 'X',
    }
    expect(checkWinner(board)).toBeNull()
  })

  it('returns null when tokens are scattered without forming a line', () => {
    const board: Board = {
      '0,0': 'X',
      '2,5': 'O',
      '5,1': 'X',
      '8,8': 'O',
      '9,3': 'X',
    }
    expect(checkWinner(board)).toBeNull()
  })
})
