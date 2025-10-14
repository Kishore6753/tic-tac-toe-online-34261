"use client";
import React from "react";
import type { Difficulty, GameMode } from "@/lib/game/types";

type Props = {
  mode: GameMode;
  difficulty: Difficulty;
  onModeChange: (m: GameMode) => void;
  onDifficultyChange: (d: Difficulty) => void;
};

// PUBLIC_INTERFACE
export default function ModeSwitcher({
  mode,
  difficulty,
  onModeChange,
  onDifficultyChange,
}: Props) {
  /** Toggle between PvP and AI, and choose difficulty. */
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`btn t-smooth ${mode === "pvp" ? "btn-primary" : "btn-outline"} focus-visible-ring`}
          aria-pressed={mode === "pvp"}
          onClick={() => onModeChange("pvp")}
        >
          PvP
        </button>
        <button
          type="button"
          className={`btn t-smooth ${mode === "ai" ? "btn-primary" : "btn-outline"} focus-visible-ring`}
          aria-pressed={mode === "ai"}
          onClick={() => onModeChange("ai")}
        >
          Vs AI
        </button>
      </div>

      {mode === "ai" && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Difficulty:</span>
          <button
            type="button"
            className={`btn t-smooth ${difficulty === "optimal" ? "btn-primary" : "btn-outline"} focus-visible-ring`}
            aria-pressed={difficulty === "optimal"}
            onClick={() => onDifficultyChange("optimal")}
          >
            Optimal
          </button>
          <button
            type="button"
            className={`btn t-smooth ${difficulty === "heuristic" ? "btn-primary" : "btn-outline"} focus-visible-ring`}
            aria-pressed={difficulty === "heuristic"}
            onClick={() => onDifficultyChange("heuristic")}
          >
            Heuristic
          </button>
        </div>
      )}
    </div>
  );
}
