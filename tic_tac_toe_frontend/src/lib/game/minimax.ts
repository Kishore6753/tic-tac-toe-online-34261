import type { Board, Player } from "./types";
import { availableMoves, getWinner, makeMove } from "./utils";
import { PLAYER_O, PLAYER_X } from "@/lib/constants";

/**
 * Heuristic scoring:
 * +10 win for maximizing player, -10 loss, 0 draw/unknown at terminal.
 * For heuristic quick move: center > corner > side; try winning move; block opponent.
 */

// Evaluate the board for a specific player.
// PUBLIC_INTERFACE
export function evaluateBoard(board: Board, player: Player): number {
  /** Returns a numeric score from the perspective of player. */
  const { winner } = getWinner(board);
  if (winner === player) return 10;
  if (winner && winner !== "Draw") return -10;
  return 0;
}

// Optimal minimax with alpha-beta pruning.
// PUBLIC_INTERFACE
export function minimaxOptimal(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  player: Player,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  /**
   * Compute best score from this position for 'player' using alpha-beta pruning.
   * 'isMaximizing' indicates if it's the turn of 'player'.
   */
  const score = evaluateBoard(board, player);
  const { winner } = getWinner(board);
  if (winner !== null) {
    // Adjust score by depth to prefer faster wins and slower losses.
    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    return 0;
  }

  const opp = player === PLAYER_X ? PLAYER_O : PLAYER_X;
  const moves = availableMoves(board);

  if (isMaximizing) {
    let best = -Infinity;
    for (const idx of moves) {
      const next = makeMove(board, idx, player);
      const val = minimaxOptimal(next, depth + 1, false, player, alpha, beta);
      best = Math.max(best, val);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const idx of moves) {
      const next = makeMove(board, idx, opp);
      const val = minimaxOptimal(next, depth + 1, true, player, alpha, beta);
      best = Math.min(best, val);
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

// PUBLIC_INTERFACE
export function findBestMoveOptimal(board: Board, player: Player): number | null {
  /** Uses minimaxOptimal to select the best move for 'player'. */
  let bestVal = -Infinity;
  let bestMove: number | null = null;
  for (const idx of availableMoves(board)) {
    const next = makeMove(board, idx, player);
    const moveVal = minimaxOptimal(next, 0, false, player, -Infinity, Infinity);
    if (moveVal > bestVal) {
      bestVal = moveVal;
      bestMove = idx;
    }
  }
  return bestMove;
}

// PUBLIC_INTERFACE
export function findBestMoveHeuristic(board: Board, player: Player): number | null {
  /** Quick heuristic: immediate win > block > center > corners > sides */
  const opp = player === PLAYER_X ? PLAYER_O : PLAYER_X;
  const empties = availableMoves(board);

  // 1) Immediate winning move
  for (const idx of empties) {
    if (getWinner(makeMove(board, idx, player)).winner === player) return idx;
  }
  // 2) Block opponent's winning move
  for (const idx of empties) {
    if (getWinner(makeMove(board, idx, opp)).winner === opp) return idx;
  }
  // 3) Center
  if (empties.includes(4)) return 4;

  const corners = [0, 2, 6, 8].filter((i) => empties.includes(i));
  if (corners.length) return corners[0];

  const sides = [1, 3, 5, 7].filter((i) => empties.includes(i));
  if (sides.length) return sides[0];

  return empties.length ? empties[0] : null;
}
