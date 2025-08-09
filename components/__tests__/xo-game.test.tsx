import { describe, it, expect } from 'vitest'
import { checkWinner, type Board } from '../../lib/check-winner'

describe('checkWinner', () => {
  it('detects a horizontal win', () => {
    const board: Board = {
      '0,0': 'X',
      '0,1': 'X',
      '0,2': 'X',
    }
    expect(checkWinner(board)).toBe('X')
  })

  it('detects a vertical win', () => {
    const board: Board = {
      '5,5': 'O',
      '6,5': 'O',
      '7,5': 'O',
    }
    expect(checkWinner(board)).toBe('O')
  })

  it('detects a diagonal win', () => {
    const board: Board = {
      '1,1': 'X',
      '2,2': 'X',
      '3,3': 'X',
    }
    expect(checkWinner(board)).toBe('X')
  })

  it('detects an anti-diagonal win', () => {
    const board: Board = {
      '3,1': 'O',
      '2,2': 'O',
      '1,3': 'O',
    }
    expect(checkWinner(board)).toBe('O')
  })

  it('returns null for a draw', () => {
    const board: Board = {
      '0,0': 'X', '0,1': 'O', '0,2': 'X',
      '1,0': 'X', '1,1': 'O', '1,2': 'O',
      '2,0': 'O', '2,1': 'X', '2,2': 'X',
    }
    expect(checkWinner(board)).toBeNull()
  })

  it('returns null for a non-terminal state', () => {
    const board: Board = {
      '0,0': 'X', '0,1': 'O', '0,2': 'X',
      '1,1': 'O',
      '3,3': 'X',
    }
    expect(checkWinner(board)).toBeNull()
  })
})
