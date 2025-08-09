export type Player = 'X' | 'O' | null

export type Board = Player[][]

export const checkWinner = (board: Board): Player => {
  const rows = board.length
  const cols = board[0]?.length ?? 0
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [1, 1], // down-right
    [1, -1], // down-left
  ] as const

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const player = board[r][c]
      if (!player) continue

      for (const [dr, dc] of directions) {
        const r1 = r + dr
        const c1 = c + dc
        const r2 = r + 2 * dr
        const c2 = c + 2 * dc

        if (
          r2 >= 0 && r2 < rows &&
          c2 >= 0 && c2 < cols &&
          board[r1][c1] === player &&
          board[r2][c2] === player
        ) {
          return player
        }
      }
    }
  }

  return null
}

