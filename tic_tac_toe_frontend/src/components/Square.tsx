"use client";
import React from "react";
import type { Player } from "@/lib/game/types";

type Props = {
  value: Player | null;
  index: number;
  disabled?: boolean;
  isWinning?: boolean;
  isLast?: boolean;
  onClick: (index: number) => void;
};

// PUBLIC_INTERFACE
export default function Square({
  value,
  index,
  disabled,
  isWinning,
  isLast,
  onClick,
}: Props) {
  /** A single grid square with accessible semantics and highlight states. */
  const handleClick = () => {
    if (!disabled) onClick(index);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(index);
    }
  };

  const classes = [
    "square-base focus-visible-ring t-smooth",
    disabled ? "square-disabled" : "",
    isWinning ? "square-winning" : "",
    isLast ? "square-last" : "",
  ].join(" ");

  const ariaLabel = `Cell ${index + 1}, ${value ? `occupied by ${value}` : "empty"}`;

  return (
    <button
      type="button"
      className={classes}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span aria-hidden="true">{value ?? ""}</span>
    </button>
  );
}
