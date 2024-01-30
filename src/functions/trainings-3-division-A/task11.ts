export function productionLine(src: number[][]): boolean[] {
  return src.map(isPossibleToSort);
}

function isPossibleToSort(details: number[]): boolean {
  const sortedDetails = details.slice(0).sort((a, b) => a - b);
  const stack: number[] = [];

  for (let i = 0; i < sortedDetails.length; i++) {
    if (stack[stack.length - 1] === sortedDetails[i]) {
      stack.pop();
      continue;
    }

    while (details[0] !== sortedDetails[i] && details.length) {
      stack.push(details.shift()!);
    }

    if (details.length === 0) {
      return false;
    }
    details.shift();
  }
  return true;
}
