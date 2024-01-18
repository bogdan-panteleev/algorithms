import { getCachedPowFn, hashesForOption, runOptions } from '../warm-up/helpers';

const cachedPow = getCachedPowFn();
function calculateHashesPatched(source: { str: number[] }, options: runOptions[]): hashesForOption[] {
  const hashes: hashesForOption[] = options.map((option) => ({ ...option, hashes: new Array(source.str.length) }));
  let accumulators: number[] = options.map(() => 0);

  for (let i = 0; i < source.str.length; i++) {
    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
      const option = options[optionIndex];
      const hashArr = hashes[optionIndex].hashes;
      const x = option.x;
      const p = option.p;

      accumulators[optionIndex] = (accumulators[optionIndex] * x + source.str[i]) % p;
      cachedPow(x, i, p);
      hashArr[i] = accumulators[optionIndex];
    }
  }

  return hashes;
}

function compareHashesPatched(
  hashesFirst: hashesForOption[],
  hashesSecond: hashesForOption[],
  len: number,
  firstStart: number,
  secondStart: number
): boolean {
  const numberOfChecks = hashesFirst.length;

  for (let i = 0; i < numberOfChecks; i++) {
    const x = hashesFirst[i].x;
    const p = hashesFirst[i].p;

    const firstRowHash =
      (hashesFirst[i].hashes[firstStart + len - 1] +
        (hashesSecond[i].hashes[secondStart - 1] ?? 0) * cachedPow(x, len, p)) %
      p;

    const secondRowHash =
      (hashesSecond[i].hashes[secondStart + len - 1] +
        (hashesFirst[i].hashes[firstStart - 1] ?? 0) * cachedPow(x, len, p)) %
      p;

    if (firstRowHash !== secondRowHash) {
      return false;
    }
  }

  return true;
}
export function getPossibleNumberOfCubes(sequence: number[]): number[] {
  const hashes = calculateHashesPatched({ str: sequence }, [{ x: 10, p: 90001393 }]);
  const reversedHashes = calculateHashesPatched({ str: [...sequence].reverse() }, [{ x: 10, p: 90001393 }]);

  const possibleNumberOfCubes = [];

  let currentPointer = Math.floor((sequence.length - 1) / 2);
  while (currentPointer >= 0) {
    const length = currentPointer + 1;
    const areStringsEqual = compareHashesPatched(hashes, reversedHashes, length, 0, sequence.length - length * 2);
    if (areStringsEqual) possibleNumberOfCubes.push(sequence.length - length);
    currentPointer--;
  }

  possibleNumberOfCubes.push(sequence.length);

  return possibleNumberOfCubes;
}
