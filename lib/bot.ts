import { checkWinner, type Board, type Player } from './check-winner'

/**
 * Returns a move for the bot player using a very small minimax search.
 * If no strategic move is found, a random available spot is returned.
 */
export function getBotMove(board: Board, botPlayer: Player): [number, number] {
  const opponent: Player = botPlayer === 'X' ? 'O' : 'X'

  const candidates = getCandidateMoves(board)
  if (candidates.length === 0) return [0, 0]

  let bestScore = -Infinity
  let bestMove: [number, number] | null = null

  for (const [r, c] of candidates) {
    const key = `${r},${c}`
    const newBoard: Board = { ...board, [key]: botPlayer }
    const score = minimax(newBoard, 2, false, botPlayer, opponent)
    if (score > bestScore) {
      bestScore = score
      bestMove = [r, c]
    }
  }

  if (bestMove) return bestMove

  // Fallback to a random move if for some reason no best move was determined
  return candidates[Math.floor(Math.random() * candidates.length)]
}

// Gather all empty cells within the bounding box of current tokens (+1 padding)
function getCandidateMoves(board: Board): Array<[number, number]> {
  const keys = Object.keys(board)
  if (keys.length === 0) return [[0, 0]]

  const rows = keys.map((k) => Number(k.split(',')[0]))
  const cols = keys.map((k) => Number(k.split(',')[1]))
  const minRow = Math.min(...rows) - 1
  const maxRow = Math.max(...rows) + 1
  const minCol = Math.min(...cols) - 1
  const maxCol = Math.max(...cols) + 1

  const moves: Array<[number, number]> = []
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      const key = `${r},${c}`
      if (!board[key]) moves.push([r, c])
    }
  }
  return moves
}

function minimax(
  board: Board,
  depth: number,
  isMax: boolean,
  bot: Player,
  opponent: Player,
): number {
  const winner = checkWinner(board)
  if (winner === bot) return 10 + depth
  if (winner === opponent) return -10 - depth
  if (depth === 0) return 0

  const moves = getCandidateMoves(board)
  if (moves.length === 0) return 0

  if (isMax) {
    let best = -Infinity
    for (const [r, c] of moves) {
      const key = `${r},${c}`
      const score = minimax(
        { ...board, [key]: bot },
        depth - 1,
        false,
        bot,
        opponent,
      )
      best = Math.max(best, score)
    }
    return best
  } else {
    let best = Infinity
    for (const [r, c] of moves) {
      const key = `${r},${c}`
      const score = minimax(
        { ...board, [key]: opponent },
        depth - 1,
        true,
        bot,
        opponent,
      )
      best = Math.min(best, score)
    }
    return best
  }
}

