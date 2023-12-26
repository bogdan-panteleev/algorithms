export function getGrasshoperWays(n: number, k: number): number {
  if (n === 1) {
    return 1;
  }
  const dp = new Array(n + k - 1);

  for (let i = 0; i < k; i++) {
    dp[i] = 0;
  }

  for (let i = k; i < dp.length; i++) {
    let sum = 0;
    for (let j = 1; j <= k; j++) {
      sum += dp[i - j];
    }

    if (i < 2 * k) {
      sum++;
    }
    dp[i] = sum;
  }

  return dp[dp.length - 1];
}
