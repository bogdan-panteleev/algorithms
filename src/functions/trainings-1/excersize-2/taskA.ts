import { getCachedPowFn, runOptions } from '../warm-up/helpers';

type hash = runOptions & {
  hash: number;
};

const cachedPow = getCachedPowFn();

export function calculateHashes(source: { str: string }, options: runOptions[]): hash[][] {
  const hashes: hash[][] = new Array(source.str.length);
  let accumulators: number[] = options.map(() => 0);

  for (let i = 0; i < source.str.length; i++) {
    const newArr = new Array(options.length);
    hashes[i] = newArr;

    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
      const option = options[optionIndex];
      const x = option.x;
      const p = option.p;

      accumulators[optionIndex] = (accumulators[optionIndex] * x + source.str.charCodeAt(i)) % p;
      cachedPow(x, i, p);

      const hashObj: hash = Object.create(option);
      hashObj.hash = accumulators[optionIndex];
      newArr[optionIndex] = hashObj;
    }
  }

  return hashes;
}

function byModulo(val: number, p: number): number;
function byModulo(val: any, p: any): any {
  return val % p;
}
export function compareHashes(hashes: hash[][], len: number, firstStart: number, secondStart: number): boolean {
  if (firstStart === secondStart) return true;

  const numberOfChecks = hashes[0].length;

  for (let i = 0; i < numberOfChecks; i++) {
    const x = hashes[secondStart + len - 1][i].x;
    const p = hashes[secondStart + len - 1][i].p;

    const firstRowHash =
      (hashes[firstStart + len - 1][i].hash + (hashes[secondStart - 1]?.[i].hash ?? 0) * cachedPow(x, len, p)) % p;

    const secondRowHash =
      (hashes[secondStart + len - 1][i].hash + (hashes[firstStart - 1]?.[i].hash ?? 0) * cachedPow(x, len, p)) % p;

    if (firstRowHash !== secondRowHash) {
      return false;
    }
  }

  return true;
}

export function areSubstringsEqual(str: string, length: number, firstStart: number, secondStart: number): boolean {
  const hashes = calculateHashes({ str }, [
    { x: 257, p: 69996151 },
    { x: 199, p: 69996151 },
  ]);

  return compareHashes(hashes, length, firstStart, secondStart);
}

export function areSubstringsEqualNaive(str: string, length: number, firstStart: number, secondStart: number): boolean {
  for (let i = 0; i < length; i++) {
    if (str[i + firstStart] !== str[i + secondStart]) return false;
  }

  return true;
}
