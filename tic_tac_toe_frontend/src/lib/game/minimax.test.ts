import { emptyBoard } from "./types";
import { findBestMoveOptimal, findBestMoveHeuristic } from "./minimax";

describe("minimax placeholder tests", () => {
  it("optimal should pick center on empty board", () => {
    const b = emptyBoard();
    expect(findBestMoveOptimal(b, "X")).toBe(4);
  });

  it("heuristic should pick a legal move", () => {
    const b = emptyBoard();
    const move = findBestMoveHeuristic(b, "X");
    expect(move).not.toBeNull();
    if (move !== null) {
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThan(9);
    }
  });
});
