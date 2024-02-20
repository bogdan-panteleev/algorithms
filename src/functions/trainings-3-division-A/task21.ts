export function findCubeSum(n: number): number {
  const dp: number[] = new Array(n + 1);
  dp[0] = 0;

  for (let i = 1; i < dp.length; i++) {
    const min = getLessOrEqualCubes(i)
      .map((c) => dp[i - c])
      .reduce((min, next) => (next < min ? next : min));

    dp[i] = min + 1;
  }

  return dp[n];
}

function getLessOrEqualCubes(n: number): number[] {
  let current = 1;
  while (cube(current) <= n) {
    current++;
  }
  return cubes.slice(1, current);
}

const cubes: number[] = [0, 1];
function cube(base: number): number {
  if (!cubes[base]) {
    cubes[base] = base * base * base;
  }
  return cubes[base];
}
