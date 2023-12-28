export function coupons(days: number[]): {
  minSum: number;
  couponsLeft: number;
  couponsUsed: number;
  daysWhenCouponsUsed: number[];
} {
  if (days.length === 0) {
    return {
      minSum: 0,
      couponsLeft: 0,
      couponsUsed: 0,
      daysWhenCouponsUsed: [],
    };
  }

  const dp = Array.from({ length: days.length }, (_, ind) => [Infinity].concat(new Array(days.length).fill(0)));
  dp.unshift(new Array(dp[0].length).fill(0));
  dp.unshift(new Array(dp[0].length).fill(Infinity));
  for (let i = 1; i < dp.length; i++) {
    dp[i][1] = i <= 2 ? days[0] : Infinity;
  }

  const prevs = dp.map((arr) => arr.slice());

  for (let j = 1; j < dp[0].length; j++) {
    for (let i = 1; i < dp.length; i++) {
      if (i - 1 > j) {
        dp[i][j] = Infinity;
        continue;
      }
      if (days[j - 1] > 100) {
        const val = Math.min(dp[i - 1][j - 1] + days[j - 1], dp[i + 1]?.[j - 1] ?? Infinity);
        dp[i][j] = val;
        if (isFinite(val)) {
          const prev = val === dp[i - 1][j - 1] + days[j - 1] ? [i - 1, j - 1] : [i + 1, j - 1];
          // @ts-ignore
          prevs[i][j] = prev;
        }
      } else {
        const val = Math.min(dp[i][j - 1] + days[j - 1], dp[i + 1]?.[j - 1] ?? Infinity);
        dp[i][j] = val;
        const prev = val === dp[i][j - 1] + days[j - 1] ? [i, j - 1] : [i + 1, j - 1];
        // @ts-ignore
        if (isFinite(val)) {
          // @ts-ignore
          prevs[i][j] = prev;
        }
      }
    }
  }
  const minSum = dp.reduce(
    (min, arr) => (arr[arr.length - 1] < min ? arr[arr.length - 1] : min),
    dp[0][dp[0].length - 1]
  );

  const couponsLeft = dp.findLastIndex((arr) => arr[arr.length - 1] === minSum) - 1;

  const daysWhenCouponsUsed: number[] = [];

  let currentIJ = [couponsLeft + 1, dp[0].length - 1];
  let prevIJ = prevs[couponsLeft + 1][dp[0].length - 1];
  while (Array.isArray(prevIJ)) {
    // @ts-ignore
    if (prevIJ[0] === currentIJ[0] + 1 && prevIJ[1] === currentIJ[1] - 1) {
      daysWhenCouponsUsed.push(currentIJ[1]);
    }
    // @ts-ignore
    currentIJ = prevIJ;
    // @ts-ignore
    prevIJ = prevs[prevIJ[0]][prevIJ[1]];
  }

  daysWhenCouponsUsed.reverse().sort((a, b) => a - b);

  return {
    minSum,
    couponsLeft,
    couponsUsed: 0,
    daysWhenCouponsUsed,
  };
}
