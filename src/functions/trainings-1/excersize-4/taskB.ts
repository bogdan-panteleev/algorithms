interface Queen {
  position: number;
  line: number;
  column: number;
  mainDiagonal: number;
  sideDiagonal: number;
}

export function findQueenPermutations(n: number): number {
  let validPermutationsNumber = 0;
  const boardLength = n ** 2;

  const currentPermutation: Queen[] = [];

  const takenLines = Array.from({ length: n + 1 }, () => false);
  const takenColumns = Array.from({ length: n + 1 }, () => false);
  const takenMainDiagonals: Record<number, boolean> = {};
  const takenSideDiagonals: Record<number, boolean> = {};

  const registerQueen = (queen: Queen): void => {
    takenLines[queen.line] = true;
    takenColumns[queen.column] = true;
    takenMainDiagonals[queen.mainDiagonal] = true;
    takenSideDiagonals[queen.sideDiagonal] = true;
  };
  const unregisterQueen = (queen: Queen): void => {
    takenLines[queen.line] = false;
    takenColumns[queen.column] = false;
    takenMainDiagonals[queen.mainDiagonal] = false;
    takenSideDiagonals[queen.sideDiagonal] = false;
  };

  const isPlaceFreeForQueen = (queen: Queen) => {
    return (
      !takenLines[queen.line] &&
      !takenColumns[queen.column] &&
      !takenMainDiagonals[queen.mainDiagonal] &&
      !takenSideDiagonals[queen.sideDiagonal]
    );
  };
  function findPermutations(): boolean | undefined {
    if (currentPermutation.length === n) {
      validPermutationsNumber++;
      return;
    }

    const lastQueen: Queen | undefined = currentPermutation[currentPermutation.length - 1];
    const start = lastQueen ? lastQueen.line * n + 1 : 1;

    const queensLeft = n - currentPermutation.length;
    const linesLeft = n - lastQueen?.line ?? 0;
    if (linesLeft < queensLeft) {
      return;
    }

    for (let i = start; i <= boardLength; i++) {
      const queen = createQueen(i, n);

      if (isPlaceFreeForQueen(queen)) {
        currentPermutation.push(queen);
        registerQueen(queen);

        findPermutations();

        unregisterQueen(queen);
        currentPermutation.pop();
      }
    }
  }
  findPermutations();
  return validPermutationsNumber;
}

const queenMap: Record<number, Queen> = {};
function createQueen(position: number, n: number): Queen {
  if (!queenMap[position]) {
    const line = Math.ceil(position / n);
    const column = position % n || n;
    queenMap[position] = {
      position,
      line,
      column,
      mainDiagonal: line - column,
      sideDiagonal: line + column,
    };
  }

  return queenMap[position];
}
