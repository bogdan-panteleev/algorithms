export function fractalTriangle(layers: number): number {
  const dp = new Array(layers + 1);
  dp[0] = 0;

  for (let i = 1; i < dp.length; i++) {
    const newAtomicTriangles = i * 2 - 1;
    const newRegularVertical = regularVerticalTrianglesOfAllSizes(i);
    const newUpsideDown = trianglesWithHeadUpsideDown(i);

    dp[i] = dp[i - 1] + newAtomicTriangles + newRegularVertical + newUpsideDown;
  }

  return dp[dp.length - 1];
}

const verticalsCache: Record<number, number> = { 1: 0 };
function regularVerticalTrianglesOfAllSizes(n: number): number {
  if (verticalsCache[n] === undefined) {
    verticalsCache[n] = verticalsCache[n - 1] + n - 1;
  }
  return verticalsCache[n];
}

const upsideDownCache: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
function trianglesWithHeadUpsideDown(n: number): number {
  if (upsideDownCache[n] === undefined) {
    const isNOdd = n % 2 === 1;
    let closestOdd = isNOdd ? n - 2 : n - 1;
    const numberOfOddsWhichAreLessThanN = Math.ceil(closestOdd / 2);

    upsideDownCache[n] = upsideDownCache[n - 1] + (numberOfOddsWhichAreLessThanN - 1);
  }

  return upsideDownCache[n];

  // Снизу то же самое, но более понятно

  // if (n < 4) {
  //   return 0;
  // }
  //
  // const isNOdd = n % 2 === 1;
  //
  // let odd = isNOdd ? n - 2 : n - 1;
  // let sum = 0;
  // while (odd >= 3) {
  //   sum += n - odd;
  //   odd -= 2;
  // }
  //
  // return sum;
}
