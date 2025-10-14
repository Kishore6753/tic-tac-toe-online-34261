"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BOARD_SIZE, DEFAULT_AI_DELAY_MS, PLAYER_O, PLAYER_X } from "@/lib/constants";
import type { Difficulty, GameMode, GameState } from "@/lib/game/types";
import { nextPlayer, getWinner, makeMove } from "@/lib/game/utils";
import { emptyBoard } from "@/lib/game/types";
import { findBestMoveHeuristic, findBestMoveOptimal } from "@/lib/game/minimax";

// PUBLIC_INTERFACE
export function useTicTacToe() {
  /** Hook provides full game state and actions for PvP and AI modes. */
  const [state, setState] = useState<GameState>(() => ({
    board: emptyBoard(),
    currentPlayer: PLAYER_X,
    winner: null,
    winningLine: null,
    lastMove: null,
    mode: "pvp",
    difficulty: "optimal",
    humanPlaysAs: PLAYER_X,
    isAITurn: false,
    movesCount: 0,
  }));

  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  const pendingAIMove = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback((msg: string) => {
    // Accessible live updates for screen readers
    if (!liveRegionRef.current) return;
    liveRegionRef.current.textContent = msg;
  }, []);

  // Reset game
  const reset = useCallback(() => {
    if (pendingAIMove.current) {
      clearTimeout(pendingAIMove.current);
      pendingAIMove.current = null;
    }
    setState((s) => {
      const first = s.mode === "ai" ? s.humanPlaysAs : PLAYER_X;
      return {
        ...s,
        board: emptyBoard(),
        currentPlayer: first,
        winner: null,
        winningLine: null,
        lastMove: null,
        isAITurn: s.mode === "ai" ? s.humanPlaysAs !== PLAYER_X : false,
        movesCount: 0,
      };
    });
    announce("Game reset.");
  }, [announce]);

  // Switch mode (pvp/ai)
  const setMode = useCallback((mode: GameMode) => {
    setState((s) => {
      const first = mode === "ai" ? s.humanPlaysAs : PLAYER_X;
      return {
        ...s,
        mode,
        board: emptyBoard(),
        currentPlayer: first,
        winner: null,
        winningLine: null,
        lastMove: null,
        isAITurn: mode === "ai" ? s.humanPlaysAs !== PLAYER_X : false,
        movesCount: 0,
      };
    });
  }, []);

  // Switch difficulty
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState((s) => ({ ...s, difficulty }));
  }, []);

  // Toggle who human plays as (only ai mode)
  const toggleHumanPlayer = useCallback(() => {
    setState((s) => {
      const nextHuman = s.humanPlaysAs === PLAYER_X ? PLAYER_O : PLAYER_X;
      const first = s.mode === "ai" ? nextHuman : PLAYER_X;
      return {
        ...s,
        humanPlaysAs: nextHuman,
        board: emptyBoard(),
        currentPlayer: first,
        winner: null,
        winningLine: null,
        lastMove: null,
        isAITurn: s.mode === "ai" ? nextHuman !== PLAYER_X : false,
        movesCount: 0,
      };
    });
  }, []);

  const canInteract = useMemo(() => state.winner === null && (!state.isAITurn || state.mode === "pvp"), [state.winner, state.isAITurn, state.mode]);

  // Player or human move
  const playAt = useCallback(
    (index: number) => {
      setState((s) => {
        if (s.winner !== null) return s;
        if (s.board[index] !== null) return s;
        if (s.mode === "ai" && s.isAITurn) return s;

        const next = makeMove(s.board, index, s.currentPlayer);
        const { winner, line } = getWinner(next);
        const nextPlayerTurn = nextPlayer(s.currentPlayer);

        announce(
          `Placed ${s.currentPlayer} at row ${Math.floor(index / BOARD_SIZE) + 1} column ${(index % BOARD_SIZE) + 1}.`
        );

        return {
          ...s,
          board: next,
          currentPlayer: winner ? s.currentPlayer : nextPlayerTurn,
          winner: winner,
          winningLine: line,
          lastMove: index,
          isAITurn: s.mode === "ai" ? !winner && nextPlayerTurn !== s.humanPlaysAs : false,
          movesCount: s.movesCount + 1,
        };
      });
    },
    [announce]
  );

  // AI turn effect
  useEffect(() => {
    if (state.mode !== "ai") return;
    if (state.winner !== null) return;
    if (!state.isAITurn) return;

    const aiPlayer = state.currentPlayer;
    const choose = () => {
      let choice: number | null = null;
      if (state.difficulty === "optimal") {
        choice = findBestMoveOptimal(state.board, aiPlayer);
      } else {
        choice = findBestMoveHeuristic(state.board, aiPlayer);
      }
      if (choice === null) {
        // No move available
        return;
      }
      setState((s) => {
        const next = makeMove(s.board, choice!, s.currentPlayer);
        const { winner, line } = getWinner(next);
        const nextPlayerTurn = nextPlayer(s.currentPlayer);
        return {
          ...s,
          board: next,
          currentPlayer: winner ? s.currentPlayer : nextPlayerTurn,
          winner,
          winningLine: line,
          lastMove: choice!,
          isAITurn: !winner && nextPlayerTurn !== s.humanPlaysAs,
          movesCount: s.movesCount + 1,
        };
      });
      announce(`Computer placed ${aiPlayer} at row ${Math.floor(choice / BOARD_SIZE) + 1} column ${(choice % BOARD_SIZE) + 1}.`);
    };

    // Slight delay for UX realism
    pendingAIMove.current = setTimeout(choose, DEFAULT_AI_DELAY_MS);
    return () => {
      if (pendingAIMove.current) clearTimeout(pendingAIMove.current);
      pendingAIMove.current = null;
    };
  }, [state.mode, state.winner, state.isAITurn, state.currentPlayer, state.board, state.difficulty, state.humanPlaysAs, announce]);

  const statusText = useMemo(() => {
    if (state.winner === "Draw") return "It's a draw.";
    if (state.winner === "X" || state.winner === "O") return `Winner: ${state.winner}`;
    return `Current player: ${state.currentPlayer}${state.mode === "ai" && state.isAITurn ? " (Computer)" : ""}`;
  }, [state.winner, state.currentPlayer, state.mode, state.isAITurn]);

  const isBoardDisabled = useMemo(() => state.winner !== null, [state.winner]);

  return {
    state,
    canInteract,
    statusText,
    isBoardDisabled,
    liveRegionRef,
    actions: {
      playAt,
      reset,
      setMode,
      setDifficulty,
      toggleHumanPlayer,
    },
  };
}
