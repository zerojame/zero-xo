export type Player = 'X' | 'O' | null

export type Board = Record<string, Player>

// Scans a dynamic board for any horizontal, vertical or diagonal sequence of
// three identical symbols. The board is represented as a record keyed by
// "row,col". Only occupied cells need to be present.
// Directions to search: horizontal, vertical, diagonal and anti-diagonal.
const directions: Array<[number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
]

export const checkWinner = (board: Board): Player => {
  for (const [key, player] of Object.entries(board)) {
    if (!player) continue
    const [row, col] = key.split(',').map(Number)

    for (const [dRow, dCol] of directions) {
      let count = 1
      let r = row + dRow
      let c = col + dCol

      while (board[`${r},${c}`] === player) {
        count++
        if (count >= 3) return player
        r += dRow
        c += dCol
      }
    }
  }

  return null
}

