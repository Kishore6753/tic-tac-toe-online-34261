"use client";

import { useMemo, useState, useEffect } from "react";

type Player = "X" | "O";
type Cell = Player | null;
type Mode = "PvP" | "PvC";

const initialBoard: Cell[] = Array(9).fill(null);

function calcWinner(b: Cell[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diag
  ];
  for (const [a, c, d] of lines) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
}

function isBoardFull(b: Cell[]) {
  return b.every(c => c !== null);
}

// Simple AI: choose first available cell; can be improved later
function chooseAIMove(b: Cell[]): number | null {
  for (let i = 0; i < b.length; i++) {
    if (b[i] === null) return i;
  }
  return null;
}

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Main Tic-Tac-Toe UI with Ocean Professional theme and internal state-only logic. */
  const [mode, setMode] = useState<Mode>("PvP");
  const [board, setBoard] = useState<Cell[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winner = useMemo(() => calcWinner(board), [board]);
  const isDraw = useMemo(() => !winner && isBoardFull(board), [board, winner]);
  const currentPlayer: Player = xIsNext ? "X" : "O";

  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a draw!"
    : `Current turn: ${currentPlayer}`;

  function handleCellClick(idx: number) {
    if (board[idx] || winner) return; // ignore filled or finished
    setBoard(prev => {
      const next = [...prev];
      next[idx] = currentPlayer;
      return next;
    });
    setXIsNext(prev => !prev);
  }

  function restart() {
    setBoard(initialBoard);
    setXIsNext(true);
  }

  // Basic AI turn for PvC mode when it's O's turn
  useEffect(() => {
    if (mode !== "PvC") return;
    if (winner || isDraw) return;
    if (!xIsNext) {
      const timer = setTimeout(() => {
        const aiMove = chooseAIMove(board);
        if (aiMove !== null && board[aiMove] === null) {
          setBoard(prev => {
            const next = [...prev];
            next[aiMove] = "O";
            return next;
          });
          setXIsNext(true);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [mode, xIsNext, winner, isDraw, board]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Tic-Tac-Toe
            </h1>
            <p className="text-sm text-slate-300">
              Ocean Professional • Dark Theme
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="btn btn-secondary"
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
            >
              Next.js
            </a>
          </div>
        </header>

        {/* Mode Selector */}
        <section className="card p-4">
          <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setMode("PvP"); restart(); }}
                className={`btn ${mode === "PvP" ? "btn-primary" : "bg-slate-700 hover:bg-slate-600 text-white"}`}
              >
                Player vs Player
              </button>
              <button
                onClick={() => { setMode("PvC"); restart(); }}
                className={`btn ${mode === "PvC" ? "btn-primary" : "bg-slate-700 hover:bg-slate-600 text-white"}`}
              >
                Player vs Computer
              </button>
            </div>
            <button onClick={restart} className="btn bg-slate-700 hover:bg-slate-600 text-white">
              Restart
            </button>
          </div>
        </section>

        {/* Game Area */}
        <section className="card p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 flex items-center justify-center">
              <div
                className="board"
                role="grid"
                aria-label="Tic-Tac-Toe board"
              >
                {board.map((cell, idx) => (
                  <button
                    key={idx}
                    role="gridcell"
                    aria-label={`Cell ${idx + 1}`}
                    className="cell"
                    onClick={() => {
                      // In PvC, prevent user from playing O when it's AI's turn
                      if (mode === "PvC" && !xIsNext) return;
                      handleCellClick(idx);
                    }}
                    disabled={!!cell || !!winner}
                  >
                    <span
                      className={
                        cell === "X"
                          ? "text-[color:var(--color-primary)]"
                          : cell === "O"
                          ? "text-[color:var(--color-secondary)]"
                          : "text-slate-400"
                      }
                    >
                      {cell ?? ""}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-64 space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                <p className="text-sm uppercase tracking-wide text-slate-300">
                  Status
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {statusText}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                <p className="text-sm text-slate-300">
                  Mode: <span className="font-medium">{mode}</span>
                </p>
                <p className="text-sm text-slate-300">
                  Next:{" "}
                  <span
                    className={
                      xIsNext
                        ? "text-[color:var(--color-primary)] font-semibold"
                        : "text-[color:var(--color-secondary)] font-semibold"
                    }
                  >
                    {xIsNext ? "X" : "O"}
                  </span>
                </p>
              </div>
              <button onClick={restart} className="btn btn-secondary w-full">
                New Game
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400">
          Built with Next.js • No backend required for this demo UI
        </footer>
      </div>
    </main>
  );
}
