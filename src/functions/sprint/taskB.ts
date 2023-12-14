import { getCachedPowFn, hashesForOption, runOptions } from '../warm-up/helpers';
import { compareHashes } from '../excersize-2/taskArewritten';

const cachedPow = getCachedPowFn();

export function mirrorZ(str: number[]): number[] {
  const hashes = calculateHashes({ str }, [{ x: 257, p: 69996151 }]);
  const reversedHashes = calculateHashes({ str: str }, [{ x: 257, p: 69996151 }], true);

  const result: number[] = new Array(str.length);
  result[0] = 1;
  const startCharCode = str[0];
  for (let i = 1; i < str.length; i++) {
    result[i] = str[i] === startCharCode ? calculateSingleMirrorZ(hashes, reversedHashes, i) : 0;
  }

  return result;
}

function calculateSingleMirrorZ(hashes: hashesForOption[], reversedHashes: hashesForOption[], i: number): number {
  const totalLength = hashes[0].hashes.length;
  const maxK = i + 1;

  let start = 0;
  let end = maxK;

  while (start !== end) {
    const centerK = start + Math.ceil((end - start) / 2);
    const isOk = compareHashesPatched(hashes, reversedHashes, centerK, 0, totalLength - i - 1);

    if (isOk) {
      start = centerK;
    } else {
      end = centerK - 1;
    }
  }

  return compareHashesPatched(hashes, reversedHashes, end, 0, totalLength - i - 1) ? end : 1;
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
    const x = hashesFirst[0].x;
    const p = hashesFirst[0].p;

    const hashes1 = hashesFirst[0].hashes;
    const hashes2 = hashesSecond[0].hashes;
    const xPowLen = cachedPow(x, len, p);

    const firstRowHash = (hashes1[firstStart + len - 1] + (hashes2[secondStart - 1] ?? 0) * xPowLen) % p;
    const secondRowHash = (hashes2[secondStart + len - 1] + (hashes1[firstStart - 1] ?? 0) * xPowLen) % p;

    if (firstRowHash !== secondRowHash) {
      return false;
    }
  }

  return true;
}

function calculateHashes(
  source: { str: number[] },
  options: runOptions[],
  reverseDirection = false
): hashesForOption[] {
  const hashes: hashesForOption[] = options.map((option) => ({ ...option, hashes: new Array(source.str.length) }));
  let accumulators: number[] = options.map(() => 0);

  if (!reverseDirection) {
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
  } else {
    for (let targetPointer = 0, sourceIndex = source.str.length - 1; sourceIndex >= 0; targetPointer++, sourceIndex--) {
      for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        const option = options[optionIndex];
        const hashArr = hashes[optionIndex].hashes;
        const x = option.x;
        const p = option.p;

        accumulators[optionIndex] = (accumulators[optionIndex] * x + source.str[sourceIndex]) % p;
        cachedPow(x, sourceIndex, p);
        hashArr[targetPointer] = accumulators[optionIndex];
      }
    }
  }

  return hashes;
}
