import { arrayIndexes } from '../warm-up/helpers';

export function merge(source: bigint[], first: arrayIndexes, second: arrayIndexes, result: bigint[]): bigint[] {
  let resultPointer = first.start;
  let firstPointer = first.start;
  let secondPointer = second.start;

  while (firstPointer <= first.end && secondPointer <= second.end) {
    const check = compare(Number(source[firstPointer]), Number(source[secondPointer]));
    if (check === 1) {
      result[resultPointer] = source[secondPointer];
      resultPointer++;
      secondPointer++;
    } else if (check === 0) {
      result[resultPointer] = source[firstPointer];
      resultPointer++;
      firstPointer++;

      result[resultPointer] = source[secondPointer];
      resultPointer++;
      secondPointer++;
    } else if (check === -1) {
      result[resultPointer] = source[firstPointer];
      firstPointer++;
      resultPointer++;
    }
  }

  if (firstPointer > first.end && secondPointer <= second.end) {
    while (secondPointer <= second.end) {
      result[resultPointer] = source[secondPointer];
      resultPointer++;
      secondPointer++;
    }
  } else if (secondPointer > second.end && firstPointer <= first.end) {
    while (firstPointer <= first.end) {
      result[resultPointer] = source[firstPointer];
      resultPointer++;
      firstPointer++;
    }
  }
  return result;
}

function compare(a: number, b: number) {
  const diff = a - b;
  if (diff > 0) return 1;
  if (diff < 0) return -1;
  return 0;
}
