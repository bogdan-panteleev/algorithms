// this file is rewritten as low-level as possible and optimized

import { getCachedPowFn, hashesForOption, runOptions } from '../warm-up/helpers';

const cachedPow = getCachedPowFn();

export function calculateHashes(source: { str: string }, options: runOptions[]): hashesForOption[] {
  const hashes: hashesForOption[] = options.map((option) => ({ ...option, hashes: new Array(source.str.length) }));
  let accumulators: number[] = options.map(() => 0);

  for (let i = 0; i < source.str.length; i++) {
    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
      const option = options[optionIndex];
      const hashArr = hashes[optionIndex].hashes;
      const x = option.x;
      const p = option.p;

      accumulators[optionIndex] = (accumulators[optionIndex] * x + source.str.charCodeAt(i)) % p;
      cachedPow(x, i, p);
      hashArr[i] = accumulators[optionIndex];
    }
  }

  return hashes;
}
function byModulo(val: number, p: number): number;
function byModulo(val: any, p: any): any {
  return val % p;
}
export function compareHashes(
  hashes: hashesForOption[],
  len: number,
  firstStart: number,
  secondStart: number
): boolean {
  if (firstStart === secondStart) return true;

  const numberOfChecks = hashes.length;

  for (let i = 0; i < numberOfChecks; i++) {
    const x = hashes[i].x;
    const p = hashes[i].p;

    const firstRowHash =
      (hashes[i].hashes[firstStart + len - 1] + (hashes[i].hashes[secondStart - 1] ?? 0) * cachedPow(x, len, p)) % p;

    const secondRowHash =
      (hashes[i].hashes[secondStart + len - 1] + (hashes[i].hashes[firstStart - 1] ?? 0) * cachedPow(x, len, p)) % p;

    if (firstRowHash !== secondRowHash) {
      return false;
    }
  }

  return true;
}
