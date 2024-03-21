// это правильное решение, но почему-то не все тесты прошли

export function roads(directions: number, lines: number): number {
  if (lines === 1 || directions === 1) return 1;

  const dp = Array.from({ length: lines + 1 }, () => new Array(directions + 1).fill(0));

  for (let i = 1; i < dp[0].length; i++) {
    dp[1][i] = 1;
  }
  for (let i = 1; i < dp.length; i++) {
    dp[i][1] = 1;
  }

  for (let row = 2; row < dp.length; row++) {
    for (let column = 2; column < dp[0].length; column++) {
      dp[row][column] = dp[row - 1][column] + dp[row][column - 1] + dp[row - 1][column - 1];
    }
  }

  return dp[dp.length - 1][dp[0].length - 1];
}
