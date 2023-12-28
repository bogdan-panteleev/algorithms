export function horseMoves(n: number, m: number): number {
  if (n === 1 && m === 1) {
    return 1;
  }
  const dp = Array.from({ length: n + 2 }, () => new Array(m + 2).fill(0));
  dp[2][2] = 0;
  if (dp[4]?.[3] !== undefined) {
    dp[4][3] = 1;
  }
  if (dp[3]?.[4] !== undefined) {
    dp[3][4] = 1;
  }

  for (let i = 2; i < dp.length; i++) {
    for (let j = 2; j < dp[0].length; j++) {
      let result = dp[i][j];
      if (dp[i - 1][j - 2] !== 0) {
        result += dp[i - 1][j - 2];
      }
      if (dp[i - 2][j - 1] !== 0) {
        result += dp[i - 2][j - 1];
      }
      dp[i][j] = result;
    }
  }

  return dp[dp.length - 1][dp[0].length - 1];
}
