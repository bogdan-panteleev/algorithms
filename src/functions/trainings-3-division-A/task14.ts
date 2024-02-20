export function histogram(cols: number[]): number {
  const toRight = getLess('toRight', cols);
  const toLeft = getLess('toLeft', cols);

  let max = 0;
  for (let i = 0; i < cols.length; i++) {
    const leftBorder = toLeft[i];
    const rightBorder = toRight[i] === -1 ? cols.length : toRight[i];

    const currentSquare = (rightBorder - 1 - leftBorder) * cols[i];
    max = currentSquare > max ? currentSquare : max;
  }

  return max;
}

function getLess(direction: 'toLeft' | 'toRight', cols: number[]): number[] {
  const result = new Array(cols.length).fill(-1);
  const stack: { index: number; value: number }[] = [];
  let i = direction === 'toRight' ? 0 : cols.length - 1;
  const finish = direction === 'toRight' ? cols.length : -1;
  const doStep: () => void = direction === 'toRight' ? () => i++ : () => i--;

  for (i; i !== finish; doStep()) {
    while (stack.length && stack[stack.length - 1].value > cols[i]) {
      const val = stack.pop()!;
      result[val.index] = i;
    }
    stack.push({ index: i, value: cols[i] });
  }

  return result;
}
