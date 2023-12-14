import { FileLogger, Logger } from '../warm-up/helpers';

export function getPermutationsAssignInstantOutput(length: number, logger: FileLogger) {
  const result: number[][] = Array.from({ length: factorial(length) });
  assignPermutationsInstantOutput(result, 0, length, logger);
  logger.flushBuffer();
}

function assignPermutationsInstantOutput(
  target: number[][],
  level: number,
  maxVal: number,
  logger: Logger,
  excludeBitMap: number = 0,
  start = 0,
  end = target.length - 1
) {
  const numberOfItems = maxVal - level;
  const recordsPerItem = (end - start + 1) / numberOfItems;

  for (let itemVal = 1, k = 0; itemVal <= maxVal; itemVal++) {
    const currentBitMap = 2 ** itemVal;
    if ((excludeBitMap & currentBitMap) === currentBitMap) continue;

    const newLevel = level + 1;

    for (let i = 0; i < recordsPerItem; i++) {
      const targetInd = start + i + recordsPerItem * k;
      if (!target[targetInd]) {
        target[targetInd] = [];
      }
      target[targetInd].push(itemVal);
    }
    if (newLevel <= maxVal - 1) {
      assignPermutationsInstantOutput(
        target,
        newLevel,
        maxVal,
        logger,
        excludeBitMap | currentBitMap,
        start + recordsPerItem * k,
        start + recordsPerItem * (k + 1) - 1
      );
    } else {
      for (let i = 0; i < recordsPerItem; i++) {
        logger.write(target[start + i + recordsPerItem * k].join(''));
        // @ts-ignore
        target[start + i + recordsPerItem * k] = undefined;
      }
    }

    k++;
  }
}

function getPermutationsAssign(length: number) {
  const result: number[][] = Array.from({ length: factorial(length) }, () => new Array(length));
  assignPermutations(result, 0, length);
  return result;
}

function assignPermutations(
  target: number[][],
  level: number,
  maxVal: number,
  excludeBitMap: number = 0,
  start = 0,
  end = target.length - 1
) {
  const numberOfItems = maxVal - level;
  const recordsPerItem = (end - start + 1) / numberOfItems;

  for (let itemVal = 1, k = 0; itemVal <= maxVal; itemVal++) {
    const currentBitMap = 2 ** itemVal;
    if ((excludeBitMap & currentBitMap) === currentBitMap) continue;

    for (let i = 0; i < recordsPerItem; i++) {
      target[start + i + recordsPerItem * k][level] = itemVal;
    }
    const newLevel = level + 1;
    if (newLevel <= maxVal - 1) {
      assignPermutations(
        target,
        newLevel,
        maxVal,
        excludeBitMap | currentBitMap,
        start + recordsPerItem * k,
        start + recordsPerItem * (k + 1) - 1
      );
    }

    k++;
  }
}

export function getPermutationsInstantOutput(length: number, logger: Logger): string[] {
  const arr = Array.from({ length }, (_, i) => i + 1);
  return calculatePermutationsInstantOutput(arr, logger);
}

function calculatePermutationsInstantOutput(
  arr: number[],
  logger: Logger,
  excludeBitMap?: number,
  excludedCount = 0
): string[] {
  const allPermutations: string[] = [];

  if (arr.length === excludedCount + 1) {
    if (arr.length === 1) {
      return [arr[0].toString()];
    }

    const notExcludedBitMap = (2 ** arr.length - 1) ^ excludeBitMap!;
    const index = Math.log2(notExcludedBitMap);
    return [arr[index].toString()];
  }

  for (let i = 0; i < arr.length; i++) {
    const currentBitMap = 2 ** i;
    if (excludeBitMap !== undefined && (excludeBitMap & currentBitMap) === currentBitMap) continue;

    const base = arr[i];

    let exclude = excludeBitMap === undefined ? 0 : excludeBitMap;
    exclude = exclude | currentBitMap;

    const permutations = calculatePermutationsInstantOutput(arr, logger, exclude, excludedCount + 1);
    permutations.forEach((permutation) => allPermutations.push(base.toString() + permutation));
  }

  return allPermutations;
}

export function getPermutations(length: number): string[] {
  const arr = Array.from({ length }, (_, i) => i + 1);
  return calculatePermutations(arr);
}

function calculatePermutations(arr: number[], excludeBitMap?: number, excludedCount = 0): string[] {
  const allPermutations: string[] = [];

  if (arr.length === excludedCount + 1) {
    if (arr.length === 1) {
      return [arr[0].toString()];
    }

    const notExcludedBitMap = (2 ** arr.length - 1) ^ excludeBitMap!;
    const index = Math.log2(notExcludedBitMap);
    return [arr[index].toString()];
  }

  for (let i = 0; i < arr.length; i++) {
    const currentBitMap = 2 ** i;
    if (excludeBitMap !== undefined && (excludeBitMap & currentBitMap) === currentBitMap) continue;

    const base = arr[i];

    let exclude = excludeBitMap === undefined ? 0 : excludeBitMap;
    exclude = exclude | currentBitMap;

    const permutations = calculatePermutations(arr, exclude, excludedCount + 1);
    permutations.forEach((permutation) => allPermutations.push(base.toString() + permutation));
  }

  return allPermutations;
}

function factorial(n: number) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
