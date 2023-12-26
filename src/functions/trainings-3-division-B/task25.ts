export function nails(coords: number[]): number {
  const dp = new Array(coords.length);
  coords.sort((a, b) => a - b);
  dp[0] = Infinity;
  dp[1] = coords[1] - coords[0];

  for (let i = 2; i < dp.length; i++) {
    const deltaOne = coords[i] - coords[i - 1];
    dp[i] = Math.min(deltaOne + (dp[i - 2] ?? Infinity), deltaOne + (dp[i - 1] ?? Infinity));
  }

  return dp[dp.length - 1];
}
