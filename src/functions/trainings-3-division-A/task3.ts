export function Diego(diego: number[], others: number[]): number[] {
  const set = new Set(diego);
  diego = Array.from(set.values()).sort((a, b) => a - b);

  const diegoLength = diego.length;
  return Array.from({ length: others.length }, (_, i) => firstGreaterOrEqualInd(others[i]));

  function firstGreaterOrEqualInd(val: number): number {
    let left = 0;
    let right = diegoLength - 1;

    while (left !== right) {
      const mid = Math.floor((left + right) / 2);

      if (diego[mid] < val) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return diego[left] >= val ? left : diegoLength;
  }
}
