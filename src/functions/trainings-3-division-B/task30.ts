export function biggestCommonSubsequence(first: number[], second: number[]): number[] {
  const dp = Array.from({ length: first.length + 1 }, () => new Array(second.length + 1).fill(0));
  const prevs: ([number, number] | undefined)[][] = Array.from(
    { length: first.length + 1 },
    () => new Array(second.length + 1)
  );

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (first[i - 1] === second[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  const sequence: number[] = [];

  for (let i = dp.length - 1, j = dp[0].length - 1; i > 0 && j > 0; ) {
    const coords = [
      [i - 1, j],
      [i, j - 1],
      [i - 1, j - 1],
    ];
    const pair = coords.find((pair) => dp[i][j] === dp[pair[0]][pair[1]]);
    if (pair === undefined) {
      sequence.push(first[i - 1]);
      i--;
      j--;
    } else {
      [i, j] = pair;
    }
  }

  return sequence.reverse();
}
