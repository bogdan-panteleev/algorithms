export function sumOfRectangle(matrix: number[][], requests: number[][]): number[] {
  // zeros are added to lines in task-runner

  matrix.unshift(Array.from({ length: matrix[0].length }, () => 0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const prevInLine = matrix[i][j - 1] || 0;
      const prevInColumn = matrix[i - 1]?.[j] || 0;
      const prevInDiagonal = matrix[i - 1]?.[j - 1] || 0;

      matrix[i][j] = matrix[i][j] + prevInColumn + prevInLine - prevInDiagonal;
    }
  }

  function findSumForRequest(coords: number[]): number {
    const rightBottom = matrix[coords[2]][coords[3]];
    const allToTheLeft = matrix[coords[2]][coords[1] - 1];
    const allToTheTop = matrix[coords[0] - 1][coords[3]];
    const previousDiagonal = matrix[coords[0] - 1][coords[1] - 1];
    return rightBottom - allToTheLeft - allToTheTop + previousDiagonal;
  }

  return requests.map(findSumForRequest);
}
