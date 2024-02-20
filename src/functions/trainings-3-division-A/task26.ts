export function horse(rows: number, columns: number): number {
  const dp: number[][] = Array.from({ length: rows + 1 }, () => Array.from({ length: columns + 1 }, () => -1));
  dp[1][1] = 1;

  function good(i: number, j: number) {
    return i >= 1 && j >= 1 && i <= rows && j <= columns;
  }

  function solve(i: number, j: number): number {
    if (good(i, j)) {
      if (dp[i][j] === -1) {
        dp[i][j] = solve(i - 2, j - 1) + solve(i - 2, j + 1) + solve(i - 1, j - 2) + solve(i + 1, j - 2);
      }
    } else {
      return 0;
    }
    return dp[i][j];
  }

  return solve(rows, columns);
}
