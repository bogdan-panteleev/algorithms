export function turtlesPath(matrix: number[][]): { sum: number; path: string[] } {
  const dp = Array.from({ length: matrix.length + 1 }, (_, ind) => {
    if (ind === 0) return Array.from({ length: matrix[0].length + 1 }, () => 0);
    return [0].concat(new Array(matrix[0].length).fill(0));
  });

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === 0 && j === 0) {
        dp[i + 1][j + 1] = matrix[i][j];
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]) + matrix[i][j];
      }
    }
  }

  const sum = dp[dp.length - 1][dp[0].length - 1];
  const path: string[] = [];
  for (let i = dp.length - 1, j = dp[0].length - 1; !(i === 1 && j === 1); ) {
    if (dp[i - 1][j] >= dp[i][j - 1]) {
      path.push('D');
      i--;
    } else {
      path.push('R');
      j--;
    }
  }
  path.reverse();

  return { sum, path };
}
