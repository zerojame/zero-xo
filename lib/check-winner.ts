export type Player = 'X' | 'O' | null
export type Board = Player[][]

export const checkWinner = (board: Board): Player => {
  const size = board.length
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [1, 1], // down-right
    [1, -1], // down-left
  ] as const

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const player = board[row][col]
      if (!player) continue

      for (const [dr, dc] of directions) {
        const row1 = row + dr
        const col1 = col + dc
        const row2 = row + 2 * dr
        const col2 = col + 2 * dc

        if (
          row2 >= 0 &&
          row2 < size &&
          col2 >= 0 &&
          col2 < size &&
          board[row1][col1] === player &&
          board[row2][col2] === player
        ) {
          return player
        }
      }
    }
  }

  return null
}

