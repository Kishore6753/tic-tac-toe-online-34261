"use client";
import React from "react";
import Square from "./Square";
import type { Board, Line } from "@/lib/game/types";

type Props = {
  board: Board;
  disabled?: boolean;
  winningLine: Line | null;
  lastMove: number | null;
  onPlay: (index: number) => void;
};

// PUBLIC_INTERFACE
export default function Board({
  board,
  disabled = false,
  winningLine,
  lastMove,
  onPlay,
}: Props) {
  /** 3x3 board of squares with winning and last move highlights. */
  return (
    <section aria-label="Tic-Tac-Toe board" className="board-grid">
      {board.map((cell, idx) => {
        const isWinning = winningLine ? (winningLine[0] === idx || winningLine[1] === idx || winningLine[2] === idx) : false;
        const isLast = lastMove === idx;
        return (
          <Square
            key={idx}
            value={cell}
            index={idx}
            disabled={disabled || cell !== null}
            isWinning={isWinning}
            isLast={isLast}
            onClick={onPlay}
          />
        );
      })}
    </section>
  );
}
