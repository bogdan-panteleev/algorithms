export type Cell = {
  row: number;
  col: number;
};

export function chessboard(cells: Cell[], matrix: number[][]): number {
  return cells.reduce((sum, cell) => sum + getCellOuterBordersCount(cell, matrix), 0);
}

function getCellOuterBordersCount(cell: Cell, matrix: number[][]): number {
  const shifts: Cell[] = [
    { col: -1, row: 0 },
    { col: 1, row: 0 },
    { col: 0, row: -1 },
    { col: 0, row: 1 },
  ];

  let counter = 0;
  shifts.forEach((shift) => {
    if (matrix[cell.row + shift.row][cell.col + shift.col] === 0) counter++;
  });

  return counter;
}

export function doMatrix(cells: Cell[]): number[][] {
  const n = 10;
  const matrix: number[][] = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

  cells.forEach((cell) => {
    matrix[cell.row][cell.col] = 1;
  });

  return matrix;
}
