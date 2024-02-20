export function maxSubsequence(seq: number[]): number[] {
  const dp: number[] = [];
  const prev: number[] = new Array(seq.length);

  for (let i = 0; i < seq.length; i++) {
    const lessElementsIndexes: number[] = [];

    for (let k = i - 1; k >= 0; k--) {
      if (seq[k] < seq[i]) {
        lessElementsIndexes.push(k);
      }
    }

    if (lessElementsIndexes.length) {
      const indexOfMaxDp = lessElementsIndexes.reduce((maxDpInd, nextIndex) =>
        dp[maxDpInd] > dp[nextIndex] ? maxDpInd : nextIndex
      );

      prev[i] = indexOfMaxDp;
      dp[i] = dp[indexOfMaxDp] + 1;
    } else {
      dp[i] = 1;
      prev[i] = -1;
    }
  }

  const result = [];
  const maxIndex = dp.reduce((maxInd, _, nextInd) => (dp[maxInd] > dp[nextInd] ? maxInd : nextInd), 0);

  let current = maxIndex;
  while (current !== -1) {
    result.push(seq[current]);
    current = prev[current];
  }

  return result.reverse();
}
