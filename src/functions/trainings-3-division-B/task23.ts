export function calculator(n: number): number[] {
  const dp: number[] = new Array(n);
  dp[0] = 0;
  const prev = new Array(n);
  prev[0] = -1;

  for (let i = 1; i < dp.length; i++) {
    const num = i + 1;

    const dividedByTwo = num / 2;
    const dividedByThree = num / 3;
    const minusOne = i;

    const options: { position: number; val: number }[] = [
      { position: dividedByTwo - 1, val: isInteger(dividedByTwo) ? dp[dividedByTwo - 1] : Infinity },
      { position: dividedByThree - 1, val: isInteger(dividedByThree) ? dp[dividedByThree - 1] : Infinity },
      { position: minusOne - 1, val: dp[minusOne - 1] },
    ];

    options.sort((a, b) => a.val - b.val);

    dp[i] = options[0].val + 1;
    prev[i] = options[0].position + 1;
  }

  const result = [n];
  let currentNum = n - 1;
  while (prev[currentNum] !== -1) {
    result.unshift(prev[currentNum]);
    currentNum = prev[currentNum] - 1;
  }

  return result;
}

function isInteger(n: number): boolean {
  return n % Math.floor(n) === 0;
}
