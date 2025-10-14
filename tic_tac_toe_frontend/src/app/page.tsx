"use client";

import Header from "@/components/Header";
import ModeSwitcher from "@/components/ModeSwitcher";
import Board from "@/components/Board";
import Controls from "@/components/Controls";
import StatusBar from "@/components/StatusBar";
import { useTicTacToe } from "@/lib/hooks/useTicTacToe";

export default function Home() {
  const { state, canInteract, statusText, isBoardDisabled, liveRegionRef, actions } = useTicTacToe();

  return (
    <main>
      <Header />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10">
        <section className="card p-5 sm:p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <ModeSwitcher
                mode={state.mode}
                difficulty={state.difficulty}
                onModeChange={actions.setMode}
                onDifficultyChange={actions.setDifficulty}
              />
              <Controls
                mode={state.mode}
                humanPlaysAs={state.humanPlaysAs}
                onReset={actions.reset}
                onToggleHuman={actions.toggleHumanPlayer}
              />
            </div>

            <StatusBar text={statusText} liveRef={liveRegionRef} />

            <div className="grid place-items-center">
              <Board
                board={state.board}
                disabled={isBoardDisabled || !canInteract}
                winningLine={state.winningLine}
                lastMove={state.lastMove}
                onPlay={actions.playAt}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
