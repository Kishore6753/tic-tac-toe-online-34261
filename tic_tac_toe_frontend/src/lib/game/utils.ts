import { BOARD_SIZE, PLAYER_O, PLAYER_X } from "@/lib/constants";
import type { Board, Line, Player, Winner } from "./types";

export const WIN_LINES: Line[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
export function getWinner(board: Board): { winner: Winner; line: Line | null } {
  /** Check winner and return {winner, line}. Draw when no nulls left. */
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every((c) => c !== null)) return { winner: "Draw", line: null };
  return { winner: null, line: null };
}

// PUBLIC_INTERFACE
export function isMovesLeft(board: Board): boolean {
  /** Returns true if any empty cell exists on the board. */
  return board.some((c) => c === null);
}

// PUBLIC_INTERFACE
export function availableMoves(board: Board): number[] {
  /** Return indices of empty cells. */
  const moves: number[] = [];
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
}

// PUBLIC_INTERFACE
export function nextPlayer(current: Player): Player {
  /** Toggle player X <-> O. */
  return current === PLAYER_X ? PLAYER_O : PLAYER_X;
}

// PUBLIC_INTERFACE
export function cloneBoard(board: Board): Board {
  /** Shallow clone of the board. */
  return [...board];
}

// PUBLIC_INTERFACE
export function makeMove(board: Board, index: number, player: Player): Board {
  /** Place player's mark on a new board copy when legal, otherwise returns original board. */
  if (board[index] !== null) return board;
  const copy = cloneBoard(board);
  copy[index] = player;
  return copy;
}
