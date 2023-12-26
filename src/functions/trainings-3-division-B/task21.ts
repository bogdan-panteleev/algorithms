export function threeOnesInARow(n: number): number {
  const dp: number[] = new Array(n);
  dp[0] = 2;
  if (n >= 2) {
    dp[1] = 4;
  }
  if (n >= 3) {
    dp[2] = 7;
  }

  for (let i = 3; i < dp.length; i++) {
    const ind = i + 1;

    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[dp.length - 1];
}
