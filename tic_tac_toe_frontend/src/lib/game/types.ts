import { BOARD_SIZE } from "@/lib/constants";

export type Cell = "X" | "O" | null;
export type Board = Cell[];
export type Player = "X" | "O";
export type Winner = Player | "Draw" | null;

export type GameMode = "pvp" | "ai";
export type Difficulty = "optimal" | "heuristic";

export type Move = {
  index: number;
  player: Player;
};

export type Line = [number, number, number];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Winner;
  winningLine: Line | null;
  lastMove: number | null;
  mode: GameMode;
  difficulty: Difficulty;
  humanPlaysAs: Player; // In AI mode, who is human
  isAITurn: boolean;
  movesCount: number;
}

export const emptyBoard = (): Board => Array(BOARD_SIZE * BOARD_SIZE).fill(null);
