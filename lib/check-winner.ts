export type Player = 'X' | 'O' | null

export type Board = Record<string, Player>

// Scans a dynamic board for any horizontal, vertical or diagonal sequence of
// three identical symbols. The board is represented as a record keyed by
// "row,col". Only occupied cells need to be present.
export const checkWinner = (board: Board): Player => {
  // Directions: horizontal, vertical, diagonal, anti-diagonal
  const directions: Array<[number, number]> = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ]

  for (const key of Object.keys(board)) {
    const player = board[key]
    if (!player) continue

    const [row, col] = key.split(',').map(Number)

    for (const [dr, dc] of directions) {
      let count = 1
      let r = row + dr
      let c = col + dc

      while (board[`${r},${c}`] === player) {
        count++
        if (count >= 3) return player
        r += dr
        c += dc
      }
    }
  }

  return null
}

