export function sawing(length: number, splits: number[]): number {
  const wood = [0, ...splits, length];
  const dp = Array.from({ length: wood.length }, () => new Array(wood.length).fill(-1));

  for (let diagonal = 1; diagonal < dp.length; diagonal++) {
    for (let i = 0, j = diagonal; j < dp.length; i++, j++) {
      if (diagonal === 1) {
        dp[i][j] = 0;
        continue;
      }

      const partLength = wood[j] - wood[i];
      const splitsInRange = getSplitsInRange(wood[i], wood[j], splits);
      const minimumCost = getMinimumCostSplit(i, j, splitsInRange);

      dp[i][j] = partLength + minimumCost;
    }
  }

  function getMinimumCostSplit(from: number, to: number, splits: number[]): number {
    if (splits.length === 0) {
      return 0;
    }

    let minimumCost = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < splits.length; i++) {
      const selectedSplitIndex = splits[i];
      const cost = dp[from][selectedSplitIndex] + dp[selectedSplitIndex][to];

      if (cost < minimumCost) {
        minimumCost = cost;
      }
    }

    return minimumCost;
  }

  return dp[0][wood.length - 1];
}

function getSplitsInRange(from: number, to: number, splits: number[]) {
  return splits
    .map((_, index) => index)
    .filter((i) => isInRange(from, to, splits[i]))
    .map((i) => i + 1);
}
function isInRange(from: number, to: number, split: number): boolean {
  return split > from && split < to;
}
