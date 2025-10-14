import { emptyBoard } from "./types";
import { getWinner, makeMove, availableMoves } from "./utils";

describe("utils placeholder tests", () => {
  it("should start with empty board and all moves available", () => {
    const b = emptyBoard();
    expect(availableMoves(b).length).toBe(9);
    expect(getWinner(b).winner).toBe(null);
  });

  it("makeMove should mark a cell", () => {
    const b = emptyBoard();
    const next = makeMove(b, 0, "X");
    expect(next[0]).toBe("X");
  });
});
