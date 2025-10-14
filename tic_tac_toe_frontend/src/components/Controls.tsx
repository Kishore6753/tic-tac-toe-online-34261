"use client";
import React from "react";
import type { GameMode, Player } from "@/lib/game/types";

type Props = {
  mode: GameMode;
  humanPlaysAs: Player;
  onReset: () => void;
  onToggleHuman: () => void;
};

// PUBLIC_INTERFACE
export default function Controls({
  mode,
  humanPlaysAs,
  onReset,
  onToggleHuman,
}: Props) {
  /** Reset and (AI mode) human first-player toggle. */
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" className="btn t-smooth btn-primary focus-visible-ring" onClick={onReset}>
        Reset
      </button>
      {mode === "ai" && (
        <button
          type="button"
          className="btn t-smooth btn-outline focus-visible-ring"
          onClick={onToggleHuman}
          aria-pressed={humanPlaysAs === "X"}
          aria-label={`Human plays as ${humanPlaysAs}. Toggle to switch first player.`}
        >
          Human as: {humanPlaysAs}
        </button>
      )}
    </div>
  );
}
